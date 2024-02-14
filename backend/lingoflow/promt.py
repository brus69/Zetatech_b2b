"""
Модуль для анализа статьи на кол-во повроряющихся слов,
для промта на генерацию изображения
"""
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist
from pymystem3 import Mystem


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


    def _process_text(self, text, language='russian'):
        """
        Обработка текста.
        Выполняет токенизацию текста и возвращает список слов.
        """
        tokens = word_tokenize(text, language=language)
        return tokens

    def _filter_stop_words(self, words):
        """
        Фильтрация стоп-слов из списка слов.
        """
        stop_words = set(stopwords.words('russian') + self._custom_stop_words)
        filtered_words = [word.lower() for word in words if word.isalpha() and word.lower() not in stop_words]
        return filtered_words

    def _generate_common_words(self, word_list, limit=3):
        """
        Генерация списка общих слов на основе частотного анализа слов.
        """
        frequency_dist = FreqDist(word_list)
        most_common_words = frequency_dist.most_common()
        common_words = [word for word, count in most_common_words if count > limit]
        return common_words

    def _process_prompt(self, example_text):
        """
        Обработка текста и создание промпта.
        """
        processed_words = self._process_text(example_text)
        filtered_words = self._filter_stop_words(processed_words)
        common_words = self._generate_common_words(filtered_words)
        return common_words

    def process_and_insert_prompts(self):
        """
        Обработка текстов и вставка промптов в базу данных.
        """
        example_texts = get_tables_translit('translated_articles', 'id, translated_content')
        mystem = Mystem()
        for text in example_texts:
            words = self._process_prompt(text[1])[:5]
            lemmas = set(mystem.lemmatize(word)[0] for word in words)
            promt = ', '.join( list(lemmas))
            result = (promt, text[0])
            insert_table_promt(result)





if __name__ == "__main__":
    ...