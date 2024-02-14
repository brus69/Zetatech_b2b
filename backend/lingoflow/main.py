"""
Алгоритм работы:
0.Созать структуру таблиц если они не созданы +
1.Взять текст который нужно перевести +
2.Перевести текст API и записать в БД +
3.Проверить уникальность API и записать в БД
4.Проверить читаемость API и записать в БД
5.Сгенерировать промт на основе превода
6.Сгенерировать изображение и записать путь картинки в БД
7.Новый модуль, партровать результат перевода в рабочую бд сайта
"""
from create_sql_script import create_tables
from database import insert_table_articles, base_connect_scrapy
from translator import DeeplTranslator
from uniqueness_cheker import TextUniquenessChecker
from grammar_checker import TurgenevAPI
from promt import TextProcessor
from image_creator import TextToImageProcessor

def deepl_api():
    try:
        deepl = DeeplTranslator()
        deepl.get_result_transfer()
    except Exception as e:
        print("Ошибка в deepl_api:", e)

def text_api():
    try:
        text = TextUniquenessChecker()
        text.process_text_results()
    except Exception as e:
        print("Ошибка в text_api:", e)

def insert_table_articles():
    """Наполнить таблицу articles"""
    try:
        list_data_scrapy = base_connect_scrapy()
        insert_table_articles(list_data_scrapy)
    except Exception as e:
        print("Ошибка в insert_table_articles:", e)

def turgenev_api():
    """Проверить на риск бана в тургеневе"""
    try:
        turgenev_api = TurgenevAPI()
        turgenev_api.process_results()
    except Exception as e:
        print("Ошибка в turgenev_api:", e)


def promt_text():
    """Проверить на риск бана в тургеневе"""
    try:
        processor = TextProcessor()
        processor.process_and_insert_prompts()
    except Exception as e:
        print("Ошибка в promt_text:", e)

def image_api():
    """Генерация изображений для сайта"""
    try:
        image_api = TextToImageProcessor()
        image_api.process_image_generation()
    except Exception as e:
        print("Ошибка в image_api:", e)


def main():
    funcs = [create_tables,
             insert_table_articles,
             deepl_api,
             text_api,
             turgenev_api,
             promt_text,
             image_api,
             ]
    for func in funcs:
        func()

if __name__ == "__main__":
    main()
