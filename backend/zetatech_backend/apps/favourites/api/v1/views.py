from rest_framework import viewsets
from rest_framework import mixins
from drf_spectacular.utils import extend_schema

from apps.favourites.serializers import FavoriteSerializer 
from apps.favourites.models import Favorite

@extend_schema(responses={'200': FavoriteSerializer})
class FavoriteViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
    ):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer