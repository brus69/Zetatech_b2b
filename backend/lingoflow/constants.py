import os

#Перевод статей
DEEPL_TOKEN = os.environ.get('DEEPL_TOKEN')

#Анализ на уникальность
TEXT_TOKEN = os.environ.get('TEXT_TOKEN')

#Проверка на риск попасть в Баден-Баден
TURGENEV_TOKEN = os.environ.get('TURGENEV_TOKEN')

#Генерация изображений
FUSIONBRAIN_PUBLIC_TOKEN = os.environ.get('FUSIONBRAIN_PUBLIC_TOKEN')
FUSIONBRAIN_SECRET_TOKEN = os.environ.get('FUSIONBRAIN_SECRET_TOKEN')