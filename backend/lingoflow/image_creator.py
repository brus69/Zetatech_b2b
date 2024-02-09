"""
Модуль для создания изображений 
на основе текста и ключевых фраз.
"""
import base64
from io import BytesIO
from PIL import Image
from datetime import datetime
import json
import time
import os
import requests

from constants import FUSIONBRAIN_PUBLIC_TOKEN, FUSIONBRAIN_SECRET_TOKEN
from database import (get_tables_translit,
                      insert_image_post)

class Text2ImageAPI:

    def __init__(self, url, api_key, secret_key):
        self.URL = url
        self.AUTH_HEADERS = {
            'X-Key': f'Key {api_key}',
            'X-Secret': f'Secret {secret_key}',
        }

    def get_model(self):
        response = requests.get(self.URL + 'key/api/v1/models', headers=self.AUTH_HEADERS)
        data = response.json()
        return data[0]['id']

    def generate(self, prompt, model, images=1, width=1024, height=1024):
        params = {
            "type": "GENERATE",
            "numImages": images,
            "width": width,
            "height": height,
            "generateParams": {
                "query": f"{prompt}"
            }
        }

        data = {
            'model_id': (None, model),
            'params': (None, json.dumps(params), 'application/json')
        }
        response = requests.post(self.URL + 'key/api/v1/text2image/run', headers=self.AUTH_HEADERS, files=data)
        data = response.json()
        return data['uuid']

    def check_generation(self, request_id, attempts=10, delay=10):
        while attempts > 0:
            response = requests.get(self.URL + 'key/api/v1/text2image/status/' + request_id, headers=self.AUTH_HEADERS)
            data = response.json()
            if data['status'] == 'DONE':
                return data['images']

            attempts -= 1
            time.sleep(delay)

def decode_and_save_image(base64_string, output_folder):
    """Хранит картинку, на выход имя изображения"""
    try:
        image_data = base64.b64decode(base64_string)
        image = Image.open(BytesIO(image_data))
        current_datetime = datetime.now()
        timestamp = current_datetime.strftime("%Y-%m-%d_%H-%M-%S")
        output_filename = f"img_{timestamp}.png"
        output_path = os.path.join(output_folder, output_filename)
        os.makedirs(output_folder, exist_ok=True)
        image.save(output_path)
        return output_filename

    except Exception as e:
        print(f"Error processing image: {str(e)}")

def generate_image(text_promt):
    """Генерация изображения на выход путь до файла"""
    api = Text2ImageAPI('https://api-key.fusionbrain.ai/',
                        FUSIONBRAIN_PUBLIC_TOKEN,
                        FUSIONBRAIN_SECRET_TOKEN)
    model_id = api.get_model()
    uuid = api.generate(text_promt, model_id)
    # Промт будет геренерироваться на основе статьи
    images = api.check_generation(uuid)
    output_folder = "media"
    name_file = decode_and_save_image(images[0], output_folder)
    return output_folder + '/' + name_file

def get_result_image():
    text_promt = get_tables_translit('promt', 'promt, translation_articles_id')

    for text in text_promt:
        url_post_image = generate_image(text[0])
        data = (url_post_image, text[1])
        insert_image_post(data)
        print(data)

if __name__ == '__main__':
    get_result_image()