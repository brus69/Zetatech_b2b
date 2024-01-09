"""
Модуль для взаимодействия с базой данных, 
где вы будете хранить переведенные статьи
"""
import sqlite3
from datetime import datetime

DATA_BASE = 'crawler/sqlite.db'


def base_connect() -> list[tuple]:
    """Соеденение с БД для перевода"""
    conn = sqlite3.connect(DATA_BASE)
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, description, h1, content FROM lingflow_scrapy LIMIT 2")
    data_list = cursor.fetchall()
    cursor.close()
    return data_list


def create_translated_table(cursor, table_name = 'translated_articles'):
    """Создает таблицу для переведенных статей"""

    cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS {table_name} (
            id INTEGER PRIMARY KEY,
            title TEXT,
            description TEXT,
            h1 TEXT,
            content TEXT,
            translated_title TEXT,
            translated_description TEXT,
            translated_h1 TEXT,
            translated_content TEXT
        )
    ''')


def _create_name_bd(url: str) -> str:
    """Создает название таблицы для перевода
       на основе url адреса и текущей даты
    """
    name_domain = url.split("/")[2]
    name_domain_clear = name_domain.replace(".", "_")
    if name_domain.find("-") != -1:
        name_domain_clear = name_domain_clear.replace("-", "_")
    now = datetime.now()
    date = now.strftime("%d_%m_%Y")
    table_name = f'translated_{name_domain_clear}_{date}'
    return table_name


if __name__ == "__main__":

    url = 'https://docs.pyt-hon.org/3/library/datetime.html'
    print(_create_name_bd(url))