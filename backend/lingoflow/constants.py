#Перевод статей
DEEPL_TOKEN = os.environ.get('DEEPL_TOKEN')

#Анализ на уникальность
TEXT_TOKEN = os.environ.get('TEXT_TOKEN')
TEXT_URL_POST = 'http://api.text.ru/post'
TEXT_URL_ACCOUNT = 'http://api.text.ru/account'

#Проверка на риск попасть(Тургенев) в Баден-Баден
TURGENEV_TOKEN = os.environ.get('TURGENEV_TOKEN')

#Стоимость проверки по API(Тургенев):
PRICE_API_LIMIT_TURGENEV = 0.3

#Генерация изображений
FUSIONBRAIN_PUBLIC_TOKEN = os.environ.get('FUSIONBRAIN_PUBLIC_TOKEN')
FUSIONBRAIN_SECRET_TOKEN = os.environ.get('FUSIONBRAIN_SECRET_TOKEN')

#База которую нужно превести
DATA_BASE = 'crawler/scrape_do.db'

#База готовых переводов
DATA_BASE_TRANSLIT = 'base_translit.db'