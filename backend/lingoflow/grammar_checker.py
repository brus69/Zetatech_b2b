"""
Модуль для проверки 
грамматики с использованием API от turgenev.ashmanov.com

Много(параметр risk) — это если риск высокий (от 8 баллов) или, тем более, 
критический (от 13). 
Впрочем, средний (от 5) — это тоже не очень хорошо.
"""

import requests

from constants import TURGENEV_TOKEN


def check_text_turgenev(text:str) -> dict:
    """Проверка текста на угрозу риска алгоритма Баден-Баден"""
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


if __name__ == "__main__":
    print(check_text_turgenev(text))