"""
Модуль для проверки уникальности текста 
с использованием API от text.ru
"""

import requests
import time

from constants import TEXT_TOKEN
from database import (get_tables_translit, insert_table_unigueness_text)

def text_uniqueness(text:str, limit_balance: int) -> str:
    """Проверка на уникальность текста"""
    url = 'http://api.text.ru/post'
    payload = {'userkey': TEXT_TOKEN, 'text': text}
    count_text = len(text)
    try:
        if count_text < 100:
            print('Минимальная длина текста — 100 символов.')
            return None
        elif count_text > limit_balance:
            print('Баланс на проверку уникальности исчерпан')
            return None
        else:
            r = requests.post(url, data=payload)
            data = r.json()
            return data['text_uid']
    except:
        if 'error_code' in data:
            print(data['error_desc'])
        else:
            print("Ошибка: не удалось выполнить запрос")
    # {'error_code': 112, 'error_desc': 'Проверяемый текст слишком короткий. Минимальная длина текста — 100 символов.'}


def text_limit_balance():
    """Остаток кол-во символов баланса"""
    url = 'http://api.text.ru/account'
    payload = {'userkey': TEXT_TOKEN, 'method':'get_packages_info'}
    r = requests.post(url, data=payload)
    data = r.json()
    return int(data['size'])

def text_result_uniqueness_uid(text_uid: str):
    """Результат проверки текста"""
    url = 'http://api.text.ru/post'
    payload = {'userkey': TEXT_TOKEN, 'uid': text_uid}
    try:
        while True:
            r = requests.post(url, data=payload)
            data = r.json()
            if 'error_code' in data:
                if data['error_code'] == 181:
                    time.sleep(10)
                else:
                    print(f"Ошибка при выполнении запроса: {data['error_code']}")
                    return None
            elif 'unique' in data:
                return data['unique']
            else:
                print("Не удалось распознать ответ сервера")
                return None
    except requests.exceptions.RequestException as e:
        print(f"Ошибка запроса: {e}")
        return None

def text_result() -> int:
    limit_balance = text_limit_balance()
    texts = get_tables_translit('translated_articles', 'id, translated_content')
    for text in texts:
        text_uid = text_uniqueness(text[1], limit_balance)
        if text_uid:
            data = text_result_uniqueness_uid(text_uid)
            result = (int(float(data)), text[0])
            print(result)
            insert_table_unigueness_text(result)
    return f'Запись'



if __name__ == "__main__":
    result = text_result()
    print(result)
