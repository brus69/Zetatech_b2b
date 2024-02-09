"""
Модуль для анализа статьи на кол-во повроряющихся слов,
для промта на генерацию изображения
"""
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist

from database import (get_tables_translit,
                      insert_table_promt)

nltk.download('punkt')
nltk.download('stopwords')

#Стоп-слова
custom_stop_words = ['это', 'для', 'на', 'очень', 'используется', 'и', 'быть', 'мочь', 'сказать', 'говорить', 'можете', 'сможете',
                     'также', 'хотите', 'нужно', 'использовать', 'помощью', 'которые', 'является', 'лучших', 'получить', 'ваш']

def process_russian_text(text, custom_stop_words=[]):
    """Разбирает строку на слова"""
    # Токенизация текста
    tokens = word_tokenize(text, language='russian')

    # Исключение стоп-слов (союзы, предлоги, местоимения и др.)
    stop_words = set(stopwords.words('russian') + custom_stop_words)
    filtered_words = [word.lower() for word in tokens if word.isalpha() and word.lower() not in stop_words]

    return filtered_words

def process_new_list_text(word_list, limit=3):
    """Возвращает список с фразами которые часто встречаются"""

    frequency_dist = FreqDist(word_list)
    most_common_words = frequency_dist.most_common()
    common_words = [word for word, count in most_common_words if count > limit]
    common_phrases_list = []
    for word in common_words:
        common_phrases_list.extend([word] * frequency_dist[word])
    final_list = list(set(common_phrases_list))

    return final_list

def process_prompt(example_text:str):
    """Делает промт для нейросетки"""

    processed_words = process_russian_text(example_text, custom_stop_words)
    i = 0
    result_text = ''
    result = process_new_list_text(processed_words)

    while len(result_text) <= 30 and i < len(result):
        result_text += result[i] + ', '
        i += 1
        if len(result_text) > 30:
            break
    result_text = result_text[:-2]

    if len(result_text) == 0:
        result_text = processed_words[0]
    return result_text

def get_result_promt():
    """Наполнение данных в таблицу"""
    example_text = get_tables_translit('translated_articles', 'id, translated_content')
    for text in example_text:
        promt = process_prompt(text[1])
        result = (promt, text[0])
        insert_table_promt(result)

if __name__ == "__main__":
    get_result_promt()