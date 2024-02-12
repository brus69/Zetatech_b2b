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


class TextToImageProcessor:
    def __init__(self):
        self.URL = 'https://api-key.fusionbrain.ai/'
        self.AUTH_HEADERS = {
            'X-Key': f'Key {FUSIONBRAIN_PUBLIC_TOKEN}',
            'X-Secret': f'Secret {FUSIONBRAIN_SECRET_TOKEN}',
        }

    def get_model(self):
        response = requests.get(self.URL + 'key/api/v1/models', headers=self.AUTH_HEADERS)
        data = response.json()
        return data[0]['id']

    def generate_image(self, prompt, model, images=1, width=1024, height=1024):
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

    def check_generation_status(self, request_id, attempts=10, delay=10):
        while attempts > 0:
            response = requests.get(self.URL + 'key/api/v1/text2image/status/' + request_id, headers=self.AUTH_HEADERS)
            data = response.json()
            if data['status'] == 'DONE':
                return data['images']

            attempts -= 1
            time.sleep(delay)

    def process_image_generation(self):
        text_prompts = get_tables_translit('promt', 'promt, translation_articles_id')

        for text in text_prompts:
            model_id = self.get_model()
            uuid = self.generate_image(text[0], model_id)
            images = self.check_generation_status(uuid)
            output_folder = "media"
            name_file = self._decode_and_save_image(images[0], output_folder)
            url_post_image = f"{output_folder}/{name_file}"
            data = (url_post_image, text[1])
            insert_image_post(data)
            print(data)

    def _decode_and_save_image(self, base64_string, output_folder):
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


if __name__ == '__main__':
    ...