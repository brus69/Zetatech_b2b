"""
Модуль для взаимодействия с DeepL API для перевода текста.
1) открыть базу sqllite
2) отправить запрос
3) получить ответ
"""
import requests
import sqlite3

from constants import DEEPL_TOKEN


headers = {"Authorization":f"DeepL-Auth-Key {DEEPL_TOKEN}"}

def base_connect():
    """Показывает кол-во символов для превода, и сам текст для превода"""
    conn = sqlite3.connect('crawler/sqlite.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM lingflow_scrapy")
    data_list = cursor.fetchall()
    # result_dict = {item[0]: (item[1], item[2], item[3], item[4]) 
    #                for item in data_list}
    cursor.close()
    return data_list

def quantity_text(text):
    """подсчет кол-ва символов для перевода"""
    count_symbol = 0
    for i in text:
            for n in i:
                if not isinstance(n, int):
                    count_symbol += len(n)
    return count_symbol
    

def translittext(text):
    """Перевод текста"""
    url = 'https://api-free.deepl.com/v2/translate'
    payload = {"text":text,"target_lang":"RU"}
    r = requests.post(url, headers=headers, data=payload)
    return r.text

def limittext():
    """Проверка лимитов на стороне deepl"""
    url = 'https://api-free.deepl.com/v2/usage'
    r = requests.get(url, headers=headers)
    return r.json()

def checklimittranslit(count_symbol, limittranslit):
    """Проверка на возможность перевести текст с текущим лимитом"""
    result = limittranslit['character_limit'] - limittranslit['character_count']
    if count_symbol > result:
        print('Привышение лимитов на:', result - count_symbol)
        return False
    else:
        return True
