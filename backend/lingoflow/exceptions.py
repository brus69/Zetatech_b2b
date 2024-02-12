class CantGetTranslated(Exception):
    """Отказ в переводе"""

class ExceededGetLimit(Exception):
    """Превышен лимит"""
    pass

class CantGetLimit(Exception):
    """Отказ в получении лимитов"""

class LimitExceededError(Exception):
    """Исключение, возникающее при исчерпании лимита API"""
    pass

class TurgenevAPIError(Exception):
    """Исключение, связанное с ошибкой в Turgenev API"""
    pass

class LengthTextError(Exception):
    """Ошибка лимит текста"""
    pass

class TextAPIError(Exception):
    """Исключение, связанное с ошибкой в API Text"""
    pass