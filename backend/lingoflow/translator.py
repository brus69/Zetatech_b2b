"""
Модуль для взаимодействия с DeepL API для перевода текста.
1) открыть json файл
2) отправить запрос
3) получить ответ
"""
import json
import requests

text='Nothing has just lobbed a proverbial grenade into the growing Android and iMessage debate by announcing a new feature that lets you message iOS users from its Android phone with Apples famous blue bubbles.'
url = 'https://api-free.deepl.com/v2/translate'
headers = {"Authorization":"DeepL-Auth-Key "}
payload = {"text":text,"target_lang":"RU"}
r = requests.post(url, headers=headers, data=payload)
print(r.text)

# def translate_text(text, target_lang, auth_key):
#     url = "https://api-free.deepl.com/v2/translate"
#     headers = {
#         "Authorization": f"DeepL-Auth-Key {auth_key}",
#         "User-Agent": "YourApp/1.2.3",
#         "Content-Type": "application/json"
#     }
#     data = {
#         "text": [text],
#         "target_lang": target_lang
#     }

#     response = requests.post(url, json=data, headers=headers)

#     if response.status_code == 200:
#         translation = response.json()["translations"][0]["text"]
#         detected_language = response.json()["translations"][0]["detected_source_language"]
#         print(f"Detected source language: {detected_language}")
#         print(f"Translated text: {translation}")
#     else:
#         print(f"Translation failed. Status code: {response.status_code}")
#         print(response.text)

# # Используем ваш ключ DeepL-Auth-Key
# auth_key = ""
# text_to_translate = text
# target_language = "RU"

# translate_text(text_to_translate, target_language, auth_key)