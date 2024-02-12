"""
Модуль для проверки 
грамматики с использованием API от turgenev.ashmanov.com
"""

import requests

from constants import TURGENEV_TOKEN, PRICE_API_LIMIT_TURGENEV, TURGENEV_URL
from database import get_tables_translit, insert_table_turgenev_ashmanov
from exceptions import LimitExceededError, TurgenevAPIError


class TurgenevAPI:
    def __init__(self):
        self.token = TURGENEV_TOKEN
    def _get_balance(self) -> dict:
        """Проверить баланс аккаунта в Тургенев API"""
        payload = {'api': 'balance', 'key': self.token}
        response = requests.get(TURGENEV_URL, params=payload)
        return response.json()

    def _check_limit(self) -> int:
        """Кол-во доступных проверок в Тургенев API"""
        balance = self._get_balance()
        return int(balance['balance'] // PRICE_API_LIMIT_TURGENEV)

    def _check_text(self, text:str) -> dict:
        """Проверить текст на угрозы фильтра от поисковых систем
           с помощью Turgenev API"""

        limit = self._check_limit()
        if limit < 1:
            raise LimitExceededError('Ошибка: Закончились лимиты API')

        payload = {
            'key': self.token,
            'text': text,
            'api': 'risk',
            'more': 1
        }
        response = requests.post(TURGENEV_URL, data=payload)
        data = response.json()

        if 'error' in data:
            raise TurgenevAPIError(data["error"])

        return {
            'risk_point': data['risk'],
            'name_risk': data['level']
        }

    def process_results(self):
        """Обработать результаты проверки
        текстов с помощью Turgenev API и записать в БД"""
        texts = get_tables_translit('translated_articles', 'id, translated_content')

        for text_id, text_content in texts:
            try:
                result = self._check_text(text_content)
            except LimitExceededError:
                print('Закончились Лимиты API')
                break
            except TurgenevAPIError as e:
                print(f'Ошибка Turgenev API: {e}')
            else:
                row = (result['risk_point'], result['name_risk'], text_id)
                insert_table_turgenev_ashmanov(row)


if __name__ == "__main__":
    turgenev_api = TurgenevAPI()
    print(type(turgenev_api.get_balance()))