"""
Модуль для взаимодействия с DeepL API для перевода текста.
1) открыть json файл
2) отправить запрос
3) получить ответ
"""
import json
import requests

with open('test_data_json/data.json') as f:
    data = json.load(f)

response = requests.post('https://api-free.deepl.com/v2/translate', data=data)

result = response.text

print(result)