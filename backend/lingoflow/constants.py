#Перевод статей
# DEEPL_TOKEN = os.environ.get('DEEPL_TOKEN')
DEEPL_TOKEN = 'ade09c63-1962-3ebb-020d-ef5adedb2036:fx'

#Анализ на уникальность
# TEXT_TOKEN = os.environ.get('TEXT_TOKEN')
TEXT_TOKEN = 'b7effaa52c8049b3e4efe6f9801a8e38'
TEXT_URL_POST = 'http://api.text.ru/post'
TEXT_URL_ACCOUN = 'http://api.text.ru/account'

#Проверка на риск попасть(Тургенев) в Баден-Баден
# TURGENEV_TOKEN = os.environ.get('TURGENEV_TOKEN')
TURGENEV_TOKEN = 'f0b8c0e34017e150df1fbca0cab85e59'
TURGENEV_URL = 'https://turgenev.ashmanov.com/'


#Стоимость проверки по API(Тургенев):
PRICE_API_LIMIT_TURGENEV = 0.3

#Генерация изображений
# FUSIONBRAIN_PUBLIC_TOKEN = os.environ.get('FUSIONBRAIN_PUBLIC_TOKEN')
# FUSIONBRAIN_SECRET_TOKEN = os.environ.get('FUSIONBRAIN_SECRET_TOKEN')

FUSIONBRAIN_PUBLIC_TOKEN = 'CA23BD27D21E97C4E886A5AF3274DFE5'
FUSIONBRAIN_SECRET_TOKEN = 'C648FCDB0F38F510642E5420163C5BF7'
#База которую нужно превести
DATA_BASE = 'crawler/scrape_do.db'

#База готовых переводов
DATA_BASE_TRANSLIT = 'base_translit.db'