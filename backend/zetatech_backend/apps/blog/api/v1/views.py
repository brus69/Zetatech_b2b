from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import decorators, viewsets
from rest_framework.permissions import AllowAny

from apps.blog.filters import PostFilter
from apps.blog.models import Post, TagPost
from apps.blog.pagination import BlogAPIPagination
from apps.blog.serializers import PostSerializer, TagPostSerializer


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    """Вьюсет публикаций только для чтения.
    Путь к detail через slug.
    Показывает только опубликованные посты.
    Пагинация по параметру limit.
    Фильтрация по тегам."""
    queryset = Post.objects.filter(published=True)
    serializer_class = PostSerializer
    pagination_class = BlogAPIPagination
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend]
    filterset_class = PostFilter

    @decorators.action(methods=('get',), detail=False)
    def tags(self, request):
        tags = self.paginate_queryset(TagPost.objects.all())
        serializer = TagPostSerializer(
            tags,
            many=True,
            context={'request': request}
        )
        return self.get_paginated_response(serializer.data)
