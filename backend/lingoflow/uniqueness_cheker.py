"""
Модуль для проверки уникальности текста 
с использованием API от text.ru
"""

import requests
import time

from constants import TEXT_TOKEN, TEXT_URL_POST, TEXT_URL_ACCOUN
from database import get_tables_translit, insert_table_unigueness_text
from exceptions import ExceededGetLimit, LengthTextError, TextAPIError

class TextUniquenessChecker:
    def __init__(self):
        self.token = TEXT_TOKEN
        self.text_url_post = TEXT_URL_POST
        self.text_url_account = TEXT_URL_ACCOUN
        self.min_limit_text = 100

    def _get_text_limit_balance(self):
        """Остаток количества символов баланса"""
        payload = {'userkey': self.token, 'method': 'get_packages_info'}
        r = requests.post(self.text_url_account, data=payload)
        data = r.json()
        return int(data['size'])

    def _check_text_uniqueness(self, text:str, limit_balance: int) -> str:
        """Проверка на уникальность текста"""

        payload = {'userkey': self.token, 'text': text}
        count_text = len(text)

        if count_text < self.min_limit_text:
            raise LengthTextError('Минимальная длина текста — 100 символов')
        elif count_text > limit_balance:
            raise ExceededGetLimit('Баланс на проверку уникальности исчерпан')

        response = requests.post(self.text_url_post, data=payload)
        data = response.json()
        if 'error_code' in data:
            raise TextAPIError(data['error_desc'])
        return data['text_uid']

    def _text_result_uniqueness_uid(self, text_uid: str):
        """Результат проверки текста"""
        payload = {'userkey': self.token, 'uid': text_uid}
        try:
            while True:
                response = requests.post(self.text_url_post, data=payload)
                data = response.json()
                if 'error_code' in data:
                    if data['error_code'] == 181:
                        time.sleep(10)
                    else:
                        raise TextAPIError(f"Ошибка: {data['error_code']}")
                elif 'unique' in data:
                    return data['unique']
                else:
                    raise TextAPIError("Не удалось распознать ответ сервера")

        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Ошибка запроса: {e}")

    def process_text_results(self):
        try:
            limit_balance = self._get_text_limit_balance()
            texts = get_tables_translit('translated_articles', 'id, translated_content')
            for text_id, text_content in texts:
                text_uid = self._check_text_uniqueness(text_content, limit_balance)
                if text_uid:
                    data = self._text_result_uniqueness_uid(text_uid)
                    result = (int(float(data)), text_id)
                    insert_table_unigueness_text(result)
        except Exception as e:
            return f"Ошибка при обработке результатов: {e}"


if __name__ == "__main__":
    result = TextUniquenessChecker()
    print(result.text_limit_balance())
