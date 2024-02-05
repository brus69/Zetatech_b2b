"""
Модуль для взаимодействия с базой данных, 
для хранения переведенныех статей
"""
import sqlite3
from datetime import datetime

from constants import DATA_BASE, DATA_BASE_TRANSLIT

def base_connect() -> list[tuple]:
    """Соеденение с БД от фреймвока scrapy"""
    conn = sqlite3.connect(DATA_BASE)
    cursor = conn.cursor()
    cursor.execute("SELECT url, title, description, h1, content FROM lingflow_scrapy LIMIT 3")
    data_list = cursor.fetchall()
    cursor.close()
    return data_list

def base_connect_translition() -> sqlite3.Cursor:
    """Соеденение с БД переводом текстов"""
    conn = sqlite3.connect(DATA_BASE_TRANSLIT)
    cursor = conn.cursor()
    return cursor

def _insert_table_articles(cursor, rows: list[dict], table_name = 'articles'):
    """Наполнение таблицы данными"""
    try:
        for row in rows:
            cursor.execute(f'''
            INSERT INTO {table_name} (url, title, description, h1, content)
            VALUES(?,?,?,?,?)
            ''', row)
    except sqlite3.Error as e:
        print("Ошибка при работе с базами данных:", e)
    finally:
        cursor.close()

def _create_articles_tables(cursor, table_name = 'articles'):
    """Таблица для непереведенных статей"""
    try:
        cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS {table_name} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT,
        title TEXT,
        description TEXT,
        h1 TEXT,
        content TEXT,
        articles_id NUMERIC
        )
        ''')
    except sqlite3.Error as e:
        print(f"Ошибка при создании таблицы {table_name}: {e}")

def _create_translated_table(cursor, table_name = 'translated_articles'):
    """Перевод статьи"""

    cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS {table_name} (
            id INTEGER PRIMARY KEY,
            url TEXT,
            title TEXT,
            description TEXT,
            h1 TEXT,
            content TEXT,
            translated_title TEXT,
            translated_description TEXT,
            translated_h1 TEXT,
            translated_content TEXT,
            translated_articles_id NUMERIC NOT NULL,
            image_id NUMERIC NOT NULL,
            turgenev_id NUMERIC NOT NULL,
            uniqueness_id NUMERIC NOT NULL,
            FOREIGN KEY (image_id) REFERENCES
            image_post(translation_articles_id),
            FOREIGN KEY (turgenev_id) REFERENCES
            turgenev_ashmanov(translation_articles_id),
            FOREIGN KEY (uniqueness_id) REFERENCES
            uniqueness_text(translation_articles_id),
            FOREIGN KEY (translated_articles_id) REFERENCES
            articles(articles_id)
            
        )
    ''')

def _create_image_post_table(cursor, table_name = 'image_post'):
    """Изображение к посту"""

    cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS {table_name} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url_post_image TEXT,
        translation_articles_id NUMERIC NOT NULL
        )
    ''')

def _create_turgenev_ashmanov_table(cursor, table_name = 'turgenev_ashmanov'):
    """Проверка текста на читаемость"""

    cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS {table_name} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        risk_point NUMERIC,
        name_risk TEXT,
        translation_articles_id NUMERIC NOT NULL
        )
    ''')

def _create_uniqueness_text_table(cursor, table_name = 'uniqueness_text'):
    """Проверка уникальности текста"""

    cursor.execute(f'''
    CREATE TABLE IF NOT EXISTS {table_name} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unique NUMERIC,
    translation_articles_id NUMERIC NOT NULL
    )
    ''')

def create_tables():
    """Создание таблиц для перевода"""
    try:
        cursor = base_connect_translition()
        _create_articles_tables(cursor)
        _create_translated_table(cursor)
        _create_image_post_table(cursor)
        _create_turgenev_ashmanov_table(cursor)
        _create_uniqueness_text_table(cursor)
        print("Таблицы созданы или уже существуют")
    except:
        print('Ошибка создании таблиц')

if __name__ == "__main__":
    """ /// """
    # url = 'https://docs.pyt-hon.org/3/library/datetime.html'
    # print(_create_name_bd(url))
    print(type(base_connect_translition()))
