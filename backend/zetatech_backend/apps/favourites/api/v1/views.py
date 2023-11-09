from rest_framework import viewsets
from rest_framework import mixins
from drf_spectacular.utils import extend_schema

from apps.favourites.serializers import FavoriteSerializer 
from apps.favourites.models import Favorite
from apps.favourites.pagination import FavoriteAPIPagination

@extend_schema(responses={'200': FavoriteSerializer})
class FavoriteViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
    ):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    pagination_class = FavoriteAPIPagination