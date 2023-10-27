from rest_framework.pagination import PageNumberPagination


class BlogAPIPagination(PageNumberPagination):
    """Пагинация с параметром limit. Стандартный размер - 6,
    максимальный - 100."""
    page_size = 6
    page_size_query_param = 'limit'
    max_page_size = 100
