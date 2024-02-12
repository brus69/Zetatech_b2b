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

from database import (
    base_connect,
    base_connect_translition,
    insert_table_articles,
    get_tables_translit
)

from translator import get_result_transfer
from uniqueness_cheker import text_result

def main():
    #Созать структуру таблиц если они не созданы
    create_tables()
    db_crapy: list(tuple) = base_connect()
    #Заполнить таблицу articles
    insert_table_articles(db_crapy)
    #Перевод статьи
    #result = get_result_transfer()
    #Проверка уникальности
    #text_result()

if __name__ == "__main__":
    main()
