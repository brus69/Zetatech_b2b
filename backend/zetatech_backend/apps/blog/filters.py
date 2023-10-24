from django_filters import AllValuesMultipleFilter
from django_filters.rest_framework.filterset import FilterSet

from .models import Post


class PostFilter(FilterSet):
    """Фильтр постов по пол и теги."""
    tags = AllValuesMultipleFilter(
        field_name='tags__slug',
    )

    class Meta:
        model = Post
        fields = (
            'tags',
        )
