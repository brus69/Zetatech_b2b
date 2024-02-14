"""
Модуль для взаимодействия с DeepL API отвечает за перевод текста.
1) открыть базу sqllite
2) отправить запрос
3) получить ответ
"""
import requests
import json
import time

from typing import TypedDict

from exceptions import (CantGetTranslated,
                        ExceededGetLimit,
                        CantGetLimit)

from constants import DEEPL_TOKEN

from database import (get_tables_translit, insert_table_translated_articles)

class TextLanguage(TypedDict):
    detected_source_language: str
    text: str


class TranslateText(TypedDict):
    translations: list[TextLanguage]


class LimitTranslate(TypedDict):
    character_count: int
    character_limit: int

class DeeplTranslator:
    def __init__(self):
        self.headers = {"Authorization": f"DeepL-Auth-Key {DEEPL_TOKEN}"}
        self.DEEPL_API_URL_LIMIT = 'https://api-free.deepl.com/v2/usage'
        self.DEEPL_API_URL_TRANSLATE = 'https://api-free.deepl.com/v2/translate'

    def _quantity_symbol(self, text: list[tuple]) -> int:
        """подсчет кол-ва символов для перевода"""
        count_symbol = 0
        for i in text:
            text_clear = i[2:6]
            for n in text_clear:
                if not isinstance(n, int):
                    count_symbol += len(n)
        return count_symbol

    def _deepl_limit(self) -> LimitTranslate:
        """Запрос лимита на стороне Deepl"""
        try:
            r = requests.get(self.DEEPL_API_URL_LIMIT, headers=self.headers)
            if r.status_code != 200:
                raise Exception("Ошибка доступа")
            return r.json()
        except Exception as e:
            raise CantGetLimit(f"Ошибка {e}")

    def _checklimittranslit(self, quantity_symbol: int, deepl_limit: LimitTranslate) -> bool:
        """Расчет лмитов на перевод"""
        limit = deepl_limit['character_limit'] - deepl_limit['character_count']
        if quantity_symbol > limit:
            raise ExceededGetLimit(f'Привышение лимитов на: {limit - quantity_symbol}')
        return True

    def _translittext(self, text: str) -> str:
        """Перевод текста"""
        payload = {"text": text, "target_lang": "RU"}
        r = requests.post(self.DEEPL_API_URL_TRANSLATE, headers=self.headers, data=payload)
        if r.status_code == 403:
            raise CantGetTranslated
        else:
            data = r.json()['translations'][0]['text']
            return data

    def _log_translit_json(self, data: dict) -> None:
        """ Дублирует перевод в файл json"""
        filename = 'log_translete_db'
        with open(f'log_translit_json/{filename}.json', 'a') as file:
            json.dump(data, file, ensure_ascii=False)
            file.write("\n")

    def get_result_transfer(self) -> list[dict]:
        """ Проверка лимитов и вывод результата"""
        base: list[tuple] = get_tables_translit('articles')
        quantity_symbol: int = self._quantity_symbol(base)
        deepl_limit: LimitTranslate = self._deepl_limit()
        check: bool = self._checklimittranslit(quantity_symbol, deepl_limit)
        result_data = []
        if check:
            for i in base:
                text_clear = i[1:6]
                url, title, description, h1, content = text_clear
                named_tuple = time.localtime()
                date = time.strftime('%Y-%m-%d %H:%M:%S', named_tuple)
                data = {
                    "url": url,
                    "title": self._translittext(title),
                    "description": self._translittext(description),
                    "h1": self._translittext(h1),
                    "content": self._translittext(content),
                    "translated_date": date
                }
                self._log_translit_json(data)
                data_conversion = tuple(data.values())
                insert_table_translated_articles(data_conversion)
                result_data.append(data)

        return result_data



if __name__ == "__main__":
    deepl = DeeplTranslator
    deepl.get_result_transfer()
