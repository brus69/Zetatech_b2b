"""
Модуль для взаимодействия с DeepL API для перевода текста.
1) открыть базу sqllite
2) отправить запрос
3) получить ответ
"""
import json
import requests
import sqlite3

key=''
headers = {"Authorization":f"DeepL-Auth-Key {key}"}

def base_connect():
    """Показывает кол-во символов для превода, и сам текст для превода"""
    conn = sqlite3.connect('crawler/sqlite.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM lingflow_scrapy")
    data_list = cursor.fetchall()
    count_symbol = 0

 #подсчет кол-ва символов для перевода
    for i in data_list:
        for n in i:
            if not isinstance(n, int):
                count_symbol += len(n)

    result_dict = {item[0]: (item[1], item[2], item[3], item[4]) for item in data_list}
    return {'count_symbol': count_symbol, 'text_no_translit': result_dict}
    

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
    result = limittranslit['character_limit'] - limittranslit['character_count']
    if count_symbol > result:
        print('Привышение лимитов на:', result - count_symbol)
        return False
    else:
        return True


bc = base_connect()
count_symbol = bc['count_symbol']
limittranslit = limittext()
checklimittranslit(count_symbol, limittranslit)
text_no_translit = bc['text_no_translit']
print(text_no_translit[1])