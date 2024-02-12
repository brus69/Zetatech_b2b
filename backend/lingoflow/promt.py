"""
Модуль для анализа статьи на кол-во повроряющихся слов,
для промта на генерацию изображения
"""
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist

from database import get_tables_translit, insert_table_promt

class TextProcessor:
    def __init__(self):
        """
        Конструктор класса TextProcessor.
        Инициализирует объект TextProcessor и загружает пользовательские стоп-слова
        из базы данных.
        """
        nltk.download('punkt')
        nltk.download('stopwords')
        self._load_custom_stop_words()

    def _load_custom_stop_words(self):
        """
        Загрузка пользовательских стоп-слов из базы данных.
        """
        result = get_tables_translit('stop_words', 'text_stop_words')
        self._custom_stop_words = result[0][0].replace(' ', '').split(',')

    def _process_russian_text(self, text):
        """
        Обработка русскоязычного текста.
        Выполняет токенизацию текста, исключает стоп-слова и возвращает список слов.
        """
        tokens = word_tokenize(text, language='russian')
        stop_words = set(stopwords.words('russian') + self._custom_stop_words)
        filtered_words = [word.lower() for word in tokens if word.isalpha() and word.lower() not in stop_words]
        return filtered_words

    def _process_new_list_text(self, word_list, limit=3):
        """
        Обработка списка слов и формирование списка фраз.
        Использует частотный анализ для определения наиболее
        часто встречающихся слов и формирует список фраз.
        """
        frequency_dist = FreqDist(word_list)
        most_common_words = frequency_dist.most_common()
        common_words = [word for word, count in most_common_words if count > limit]
        common_phrases_list = [word * frequency_dist[word] for word in common_words]
        return list(set(common_phrases_list))

    def _process_prompt(self, example_text):
        """
        Обработка текста и создание промпта.
        Преобразует текст в список слов, формирует список фраз
        и возвращает первые 10 фраз в виде строки.
        Если список фраз пуст, возвращает первое слово текста.
        """
        processed_words = self._process_russian_text(example_text)
        result_text = ', '.join(self._process_new_list_text(processed_words)[:10])
        if not result_text:
            result_text = processed_words[0]
        return result_text

    def process_and_insert_prompts(self):
        """
        Обработка текстов и вставка промптов в базу данных.
        Получает тексты из базы данных, обрабатывает каждый текст
        и вставляет полученный промпт обратно в базу данных.
        """
        example_texts = get_tables_translit('translated_articles', 'id, translated_content')
        for text in example_texts:
            prompt = self._process_prompt(text[1])
            result = (prompt, text[0])
            insert_table_promt(result)


if __name__ == "__main__":
    processor = TextProcessor()
    processor.process_and_insert_prompts()