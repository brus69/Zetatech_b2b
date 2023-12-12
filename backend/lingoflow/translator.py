"""
Модуль для взаимодействия с DeepL API для перевода текста.
1) открыть базу sqllite
2) отправить запрос
3) получить ответ
"""
import requests
import sqlite3

from constants import DEEPL_TOKEN

headers = {"Authorization":f"DeepL-Auth-Key "}

def base_connect() -> list[tuple]:
    """Показывает текст для превода"""
    conn = sqlite3.connect('crawler/sqlite.db')
    cursor = conn.cursor()
    cursor.execute("SELECT title, description, h1, content FROM lingflow_scrapy LIMIT 2")
    data_list = cursor.fetchall()
    # result_dict = {item[0]: (item[1], item[2], item[3], item[4]) 
    #                for item in data_list}
    cursor.close()
    return data_list


def quantity_text(text:str) -> int:
    """подсчет кол-ва символов для перевода"""
    count_symbol = 0
    for i in text:
            for n in i:
                if not isinstance(n, int):
                    count_symbol += len(n)
    return count_symbol
    
def translittext(text:str) -> str:
    """Перевод текста"""
    # Ответ {"translations":[{"detected_source_language":"EN","text":"Что такое веб-скрепинг"}]}
    url = 'https://api-free.deepl.com/v2/translate'
    payload = {"text":text,"target_lang":"RU"}
    r = requests.post(url, headers=headers, data=payload)
    if r.status_code == 403:
        return f'Доступ запрещен к {url} код ошибки: {r.status_code}'
    else:
        return r.text
    

def limittext() -> dict:
    """Проверка лимитов на стороне deepl"""
    url = 'https://api-free.deepl.com/v2/usage'
    r = requests.get(url, headers=headers)
    return r.json()

def checklimittranslit(count_symbol:int, limittranslit:int) -> bool:
    """Проверка на возможность перевести текст с текущим лимитом"""
    result = limittranslit['character_limit'] - limittranslit['character_count']
    if count_symbol > result:
        print('Привышение лимитов на:', result - count_symbol)
        return False
    else:
        return True

