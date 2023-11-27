"""
Модуль для проверки уникальности текста 
с использованием API от text.ru
"""

import requests

key='b7effaa52c8049b3e4efe6f9801a8e38'
text = 'Привет мир. Переименовывает или перемещает старый путь в новый, при необходимости принудительно, с выборочным повторным шифрованием'

def text_uniqueness(text):
    """Проверка на уникальность текста"""
    url = 'http://api.text.ru/post'
    payload = {'userkey': key, 'text': text}
    r = requests.post(url, data=payload)
    return r.json()

def text_limit_balance():
    """Остаток кол-во символов баланса"""
    url = 'http://api.text.ru/account'
    payload = {'userkey': key, 'method':'get_packages_info'}
    r = requests.post(url, data=payload)
    return r.json()
