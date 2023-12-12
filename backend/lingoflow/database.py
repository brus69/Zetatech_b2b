"""
Модуль для взаимодействия с базой данных, 
где вы будете хранить переведенные статьи
"""
import sqlite3
import requests

DEEPL_API_KEY = ''
DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate'


def create_translated_table(cursor):
    """Создает таблицу для переведенных статей"""
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS translated_articles (
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

def translate_text(text):
    """Перевод текста с использованием DeepL API"""
    if text:
        payload = {
            'text': text,
            'target_lang': 'ru',
            'auth_key': DEEPL_API_KEY
        }

        response = requests.post(DEEPL_API_URL, data=payload)

        if response.status_code == 200:
            translation_data = response.json()
            translated_text = translation_data['translations'][0]['text']
            return translated_text
        else:
            print(f"Ошибка при переводе текста. Код ошибки: {response.status_code}")
    return None

def main():
    # Подключение к исходной базе данных
    source_connection = sqlite3.connect('crawler/sqlite.db')
    source_cursor = source_connection.cursor()

    # Подключение к новой базе данных
    translite_connection = sqlite3.connect('translite.db')
    translite_cursor = translite_connection.cursor()

    # Создание таблицы для переведенных статей
    create_translated_table(translite_cursor)
    translite_connection.commit()

    # Перевод и сохранение в новую базу данных
    source_cursor.execute('SELECT id, title, description, h1, content FROM lingflow_scrapy')
    articles = source_cursor.fetchall()

    for article in articles:
        article_id, title, description, h1, content = article

        translated_title = translate_text(title)
        translated_description = translate_text(description)
        translated_h1 = translate_text(h1)
        translated_content = translate_text(content)

        translite_cursor.execute('''
            INSERT INTO translated_articles (
                id, title, description, h1, content,
                translated_title, translated_description, translated_h1, translated_content
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (article_id, title, description, h1, content,
              translated_title, translated_description, translated_h1, translated_content))

    translite_connection.commit()

    # Закрытие соединений
    source_connection.close()
    translite_connection.close()

if __name__ == "__main__":
    main()