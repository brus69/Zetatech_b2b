"""
Модуль для проверки уникальности текста 
с использованием API от text.ru
"""

import requests

from constants import TEXT_TOKEN


def text_uniqueness(text:str):
    """Проверка на уникальность текста"""
    url = 'http://api.text.ru/post'
    payload = {'userkey': TEXT_TOKEN, 'text': text}
    r = requests.post(url, data=payload)
    return r.json()

def text_limit_balance():
    """Остаток кол-во символов баланса"""
    url = 'http://api.text.ru/account'
    payload = {'userkey': TEXT_TOKEN, 'method':'get_packages_info'}
    r = requests.post(url, data=payload)
    return r.json()
