"""
Модуль для анализа статьи на кол-во повроряющихся слов,
для промта на генерацию изображения
"""
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist

nltk.download('punkt')
nltk.download('stopwords')

#Стоп-слова
custom_stop_words = ['это', 'для', 'на']

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

def process_result_prompt(example_text:str):
    """Делает промт для нейросетки"""

    file_path = "data.txt"
    with open(file_path, 'r', encoding='utf-8') as file:
        example_text = file.read()

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
