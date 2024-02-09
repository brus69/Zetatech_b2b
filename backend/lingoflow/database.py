"""
Модуль для взаимодействия с базой данных, 
для хранения переведенныех статей
"""
import sqlite3
from datetime import datetime
import time

from constants import DATA_BASE, DATA_BASE_TRANSLIT

def base_connect() -> list[tuple]:
    """Соеденение с БД от фреймвока scrapy"""
    conn = sqlite3.connect(DATA_BASE)
    cursor = conn.cursor()
    cursor.execute("SELECT url, title, description, h1, content FROM lingflow_scrapy")
    data_list = cursor.fetchall()
    cursor.close()
    return data_list

def base_connect_translition() -> sqlite3.Cursor:
    """Соеденение с БД переводом текстов"""
    conn = sqlite3.connect(DATA_BASE_TRANSLIT)
    cursor = conn.cursor()
    return cursor

def insert_table_articles(rows: list[tuple], table_name = 'articles'):
    """Наполнение таблицы данными"""
    conn = sqlite3.connect(DATA_BASE_TRANSLIT)
    cursor = conn.cursor()
    named_tuple = time.localtime()
    date = time.strftime('%Y-%m-%d %H:%M:%S', named_tuple)

    try:
        for row in rows:
            cursor.execute(f'''
            INSERT INTO {table_name} (url, title, description, h1, content, date)
            VALUES(?,?,?,?,?,?)''', row + (date, )
            )
            conn.commit()
    except sqlite3.OperationalError as e:
        print("Ошибка при работе с базами данных:", e)
    except sqlite3.IntegrityError as e:
        print("Ошибка целостности данных:", e)
    finally:
        conn.close()

def insert_table_translated_articles(row: tuple, table_name='translated_articles'):
    conn = sqlite3.connect(DATA_BASE_TRANSLIT)
    cursor = conn.cursor()
    try:
        cursor.execute(f'''
            INSERT INTO {table_name} (url, 
                                      translated_title,
                                      translated_description,
                                      translated_h1,
                                      translated_content,
                                      date
                                      )
            VALUES(?,?,?,?,?,?)''', row)
        conn.commit()
    except sqlite3.OperationalError as e:
        print("Ошибка при работе с базами данных:", e)
    except sqlite3.IntegrityError as e:
        print("Ошибка целостности данных:", e)
    finally:
        conn.close()

def _create_articles_tables(cursor, table_name = 'articles'):
    """Создание Таблицы для непереведенных статей"""
    try:
        cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS {table_name} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT UNIQUE,
        title TEXT,
        description TEXT,
        h1 TEXT,
        content TEXT,
        date TEXT,
        articles_id NUMERIC
        )
        ''')
    except qlite3.OperationalError as e:
        print(f'Ошибка создание таблицы {table_name}: {e}')

def _create_translated_table(cursor, table_name = 'translated_articles'):
    """Создание Таблицы перевод статьи"""
    try:
        cursor.execute(f'''
            CREATE TABLE IF NOT EXISTS {table_name} (
                id INTEGER PRIMARY KEY,
                url TEXT UNIQUE,
                translated_title TEXT,
                translated_description TEXT,
                translated_h1 TEXT,
                translated_content TEXT,
                date TEXT,
                translated_articles_id NUMERIC,
                image_id NUMERIC,
                turgenev_id NUMERIC,
                uniqueness_id NUMERIC,
                promt_id NUMERIC,
                
                FOREIGN KEY (image_id) REFERENCES
                image_post(translation_articles_id),
                
                FOREIGN KEY (turgenev_id) REFERENCES
                turgenev_ashmanov(translation_articles_id),
                
                FOREIGN KEY (uniqueness_id) REFERENCES
                uniqueness_text(translation_articles_id),
                
                FOREIGN KEY (translated_articles_id) REFERENCES
                articles(articles_id),
                
                FOREIGN KEY (promt_id) REFERENCES 
                promt(translated_articles_id)
            )
        ''')
    except qlite3.OperationalError as e:
        print(f'Ошибка создание таблицы {table_name}: {e}')

def _create_image_post_table(cursor, table_name = 'image_post'):
    """Создание Таблицы изображение к посту"""
    try:
        cursor.execute(f'''
            CREATE TABLE IF NOT EXISTS {table_name} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url_post_image TEXT,
            translation_articles_id NUMERIC NOT NULL,
            UNIQUE(translation_articles_id)
            )
        ''')
    except qlite3.OperationalError as e:
        print(f'Ошибка создание таблицы {table_name}: {e}')

def _create_turgenev_ashmanov_table(cursor):
    """Создание Таблицы проверка текста на читаемость"""
    try:
        cursor.execute(f'''
            CREATE TABLE IF NOT EXISTS turgenev_ashmanov (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            risk_point NUMERIC,
            name_risk TEXT,
            translation_articles_id NUMERIC NOT NULL,
            UNIQUE(translation_articles_id)
            )
        ''')
    except qlite3.OperationalError as e:
        print(f'Ошибка создание таблицы {table_name}: {e}')

def _create_uniqueness_text_table(cursor):
    """Создание Таблицы проверка уникальности текста"""
    try:
        cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS uniqueness_text (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        is_unique NUMERIC,
        translation_articles_id NUMERIC NOT NULL,
        UNIQUE(translation_articles_id)
        )
        ''')
    except sqlite3.OperationalError as e:
        print(f'Ошибка создание таблицы {table_name}: {e}')

def _create_promt_table(cursor):
    """Создание Таблицы промта"""
    try:
        cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS promt(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        promt TEXT,
        translation_articles_id NUMERIC NOT NULL,
        UNIQUE(translation_articles_id)
        ) 
        ''')
    except sqlite3.OperationalError as e:
        print(f'Ошибка создание таблицы {table_name}: {e}')

def get_tables_translit(table_name = 'articles', column='*'):
    conn = sqlite3.connect(DATA_BASE_TRANSLIT)
    cursor = conn.cursor()
    cursor.execute(f''' 
    SELECT {column} FROM {table_name} LIMIT 4
    ''')
    data_list = cursor.fetchall()
    cursor.close()
    return data_list

def insert_table_unigueness_text(row: tuple, table_name = 'uniqueness_text'):
    conn = sqlite3.connect(DATA_BASE_TRANSLIT)
    cursor = conn.cursor()
    try:
        cursor.execute(f'''
        INSERT INTO {table_name} (is_unique, translation_articles_id)
        VALUES(?,?)
        ''', row)
        conn.commit()
    except sqlite3.OperationalError as e:
        print(f'Ошибка создание таблицы {table_name}: {e}')
    finally:
        conn.close()

def insert_table_turgenev_ashmanov(row: tuple, table_name = 'turgenev_ashmanov'):
    conn = sqlite3.connect(DATA_BASE_TRANSLIT)
    cursor = conn.cursor()
    try:
        cursor.execute(f'''
        INSERT INTO {table_name} (risk_point, name_risk, translation_articles_id)
        VALUES(?,?,?)
        ''', row)
        conn.commit()
    except sqlite3.OperationalError as e:
        print(f'Ошибка создание таблицы {table_name}: {e}')
    finally:
        conn.close()

def insert_table_promt(row: tuple, table_name = 'promt'):
    conn = sqlite3.connect(DATA_BASE_TRANSLIT)
    cursor = conn.cursor()
    try:
        cursor.execute(f'''
            INSERT INTO {table_name} (promt, translation_articles_id)
            VALUES(?,?)
            ''', row)
        conn.commit()
    except sqlite3.OperationalError as e:
        print(f'Ошибка создание таблицы {table_name}: {e}')
    finally:
        conn.close()

def insert_image_post(row: tuple, table_name = 'image_post'):
    conn = sqlite3.connect(DATA_BASE_TRANSLIT)
    cursor = conn.cursor()
    try:
        cursor.execute(f'''
            INSERT INTO {table_name} (url_post_image, translation_articles_id)
            VALUES(?,?)
            ''', row)
        conn.commit()
    except sqlite3.OperationalError as e:
        print(f'Ошибка создание таблицы {table_name}: {e}')
    finally:
        conn.close()

def create_tables():
    """Создание таблиц для перевода"""
    try:
        cursor = base_connect_translition()
        _create_articles_tables(cursor)
        _create_translated_table(cursor)
        _create_image_post_table(cursor)
        _create_turgenev_ashmanov_table(cursor)
        _create_uniqueness_text_table(cursor)
        _create_translated_table(cursor)

    except:
        print(f'Ошибка создании таблиц')

if __name__ == "__main__":
    """ /// """
    # url = 'https://docs.pyt-hon.org/3/library/datetime.html'
    # print(_create_name_bd(url))
    print(get_tables_translit('articles'))
