"""
Скрипт создает таблицы, бд проекта lingflow
"""

import sqlite3

from constants import DATA_BASE_TRANSLIT


def create_tables():
    conn = sqlite3.connect(DATA_BASE_TRANSLIT)
    cursor = conn.cursor()

    try:
        # Создание Таблицы для непереведенных статей
        cursor.execute(f'''
                CREATE TABLE IF NOT EXISTS articles (
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
        # Создание Таблицы для переведенных статей
        cursor.execute(f'''
                CREATE TABLE IF NOT EXISTS translated_articles (
                id INTEGER PRIMARY KEY,
                url TEXT UNIQUE,
                translated_title TEXT,
                translated_description TEXT,
                translated_h1 TEXT,
                translated_content TEXT,
                date TEXT,          
                FOREIGN KEY (id) REFERENCES
                image_post(translation_articles_id),   
                FOREIGN KEY (id) REFERENCES
                turgenev_ashmanov(translation_articles_id),
                FOREIGN KEY (id) REFERENCES
                uniqueness_text(translation_articles_id),
                FOREIGN KEY (id) REFERENCES
                articles(articles_id),
                FOREIGN KEY (id) REFERENCES 
                promt(translation_articles_id)
            )
            ''')
        # Создание Таблицы изображение к посту
        cursor.execute(f'''
                    CREATE TABLE IF NOT EXISTS image_post (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    url_post_image TEXT,
                    translation_articles_id NUMERIC NOT NULL,
                    UNIQUE(translation_articles_id)
                    )
                ''')
        # Создание Таблицы проверка текста на читаемость
        cursor.execute(f'''
                    CREATE TABLE IF NOT EXISTS turgenev_ashmanov (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    risk_point NUMERIC,
                    name_risk TEXT,
                    translation_articles_id NUMERIC NOT NULL,
                    UNIQUE(translation_articles_id)
                    )
                ''')

        # Создание Таблицы проверка уникальности текста
        cursor.execute(f'''
                CREATE TABLE IF NOT EXISTS uniqueness_text (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                is_unique NUMERIC,
                translation_articles_id NUMERIC NOT NULL,
                UNIQUE(translation_articles_id)
                )
                ''')

        # Создание Таблицы промта
        cursor.execute(f'''
                CREATE TABLE IF NOT EXISTS promt(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                promt TEXT,
                translation_articles_id NUMERIC NOT NULL,
                UNIQUE(translation_articles_id)
                ) 
                ''')
        
        # Создание таблицы для стоп-слов промта
        cursor.execute(f'''
                CREATE TABLE IF NOT EXISTS stop_words(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text_stop_words TEXT
                )
                ''')

    except sqlite3.OperationalError as e:
        print(f'Ошибка создание таблицы {table_name}: {e}')

    finally:
        print('Скрипт выполнен')


if __name__ == "__main__":
    create_tables()