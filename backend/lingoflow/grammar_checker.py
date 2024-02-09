"""
Модуль для проверки 
грамматики с использованием API от turgenev.ashmanov.com

Много(параметр risk) — это если риск высокий (от 8 баллов) или, тем более, 
критический (от 13). 
Впрочем, средний (от 5) — это тоже не очень хорошо.
"""

import requests

from constants import (TURGENEV_TOKEN,
                       PRICE_API_LIMIT_TURGENEV)

from database import (get_tables_translit,
                      insert_table_turgenev_ashmanov)

def turgenev_balance():
    """Проверить баланс"""
    url = 'https://turgenev.ashmanov.com/'
    payload = {
        'api': 'balance',
        'key': TURGENEV_TOKEN
    }
    r = requests.get(url, params=payload)
    return r.json()

def check_limit():
    """Кол-во проверок"""
    balance = turgenev_balance()
    count = int(balance['balance'] / PRICE_API_LIMIT_TURGENEV)
    return count

def check_text_turgenev(text:str) -> dict:
    """Проверка текста на угрозу риска алгоритма Баден-Баден"""
    limit = check_limit()
    if limit < 1:
        print('Ошибка: Закончились лимиты')
    url = 'https://turgenev.ashmanov.com/'
    payload = {
        'key':TURGENEV_TOKEN,
        'text':text,
        'api':'risk',
        'more': 1
    }
    r = requests.post(url, data=payload)
    data = r.json()
    data = {
        'risk_point': data['risk'],
        'name_risk': data['level']
    }
    if 'error' in data:
        print(f'Ошибка: {data["error"]}')
        return None
    return data

def get_result_turgenev():
    data = get_tables_translit('translated_articles', 'id, translated_content')
    for text_content in data:
        data = check_text_turgenev(text_content[1])
        row = (data['risk_point'], data['name_risk'], text_content[0])
        insert_table_turgenev_ashmanov(row)

if __name__ == "__main__":
    get_result_turgenev()