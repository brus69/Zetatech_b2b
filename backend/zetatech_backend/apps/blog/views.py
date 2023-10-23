from rest_framework import viewsets, decorators
from .models import TagPost, Post
from .serializers import TagPostSerializer, PostSerializer
from .pagination import BlogAPIPagination
from rest_framework.permissions import AllowAny


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    """Вьюсет публикаций только для чтения."""
    queryset = Post.objects.filter(published=True)
    serializer_class = PostSerializer
    pagination_class = BlogAPIPagination
    permission_classes = [AllowAny]

    @decorators.action(methods=('get',), detail=False)
    def tags(self, request):
        tags = self.paginate_queryset(TagPost.objects.all())
        serializer = TagPostSerializer(
            tags,
            many=True,
            context={'request': request}
        )
        return self.get_paginated_response(serializer.data)
