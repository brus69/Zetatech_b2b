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


def get_tables_translit(table_name = 'articles', column='*'):
    conn = sqlite3.connect(DATA_BASE_TRANSLIT)
    cursor = conn.cursor()
    cursor.execute(f''' 
    SELECT {column} FROM {table_name} LIMIT 4
    ''')
    data_list = cursor.fetchall()
    cursor.close()
    return data_list

def get_tables_all():
    conn = sqlite3.connect(DATA_BASE_TRANSLIT)
    cursor = conn.cursor()
    cursor.execute(f'''
    SELECT name FROM sqlite_master WHERE type='table';
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


if __name__ == "__main__":
    """ /// """
    result = get_tables_translit('stop_words', 'text_stop_words')
    data = result[0][0].replace(' ', '').split(',')
    print(data)
    
    # r = get_tables_all()
    # print(r)