"""
Модуль для проверки 
грамматики с использованием API от turgenev.ashmanov.com

Много(параметр risk) — это если риск высокий (от 8 баллов) или, тем более, 
критический (от 13). 
Впрочем, средний (от 5) — это тоже не очень хорошо.
"""
#На выходе check_text_turgenev(text) получаем:
#data = {'link': 'md50b417075b6af51185bacf0b39ba58e', 'level': 'низкий', 'details': [{'params': [{'value': '9.42', 'name': '«Академическая тошнота»', 'score': 0}, {'value': '6.26', 'name': '«Тошнота» словосочетаний', 'score': 1}, {'value': '3.00', 'name': '«Классическая тошнота»', 'score': 0}, {'value': 'Нет', 'name': 'Сверхчастые слова', 'score': 0}, {'value': 'Нет', 'name': 'Сверхконцентрация «и»', 'score': 0}], 'link': 'dd50b417075b6af51185bacf0b39ba58e', 'block': 'frequency', 'sum': 1}, {'params': [{'value': '0.05', 'name': 'Плотность стилистических проблем', 'score': 0}, {'value': 19, 'name': 'Количество стилистических проблем', 'score': 0}], 'link': 'sd50b417075b6af51185bacf0b39ba58e', 'block': 'style', 'sum': 0}, {'params': [{'value': '0.04', 'name': 'Покрытие ключевыми словами', 'score': 0}], 'link': 'qd50b417075b6af51185bacf0b39ba58e', 'block': 'keywords', 'sum': 0}, {'params': [{'value': '0.36', 'name': 'Доля содержательного текста', 'score': 0}, {'value': '0.29', 'name': 'Водность', 'score': 0}], 'link': 'fd50b417075b6af51185bacf0b39ba58e', 'block': 'formality', 'sum': 0}, {'params': [{'value': '15.2', 'name': 'Индекс удобочитаемости ', 'score': 1}], 'link': 'rd50b417075b6af51185bacf0b39ba58e', 'block': 'readability', 'sum': 1}], 'risk': 2}

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
    r=requests.post(url, data=payload)
    return r.json()



