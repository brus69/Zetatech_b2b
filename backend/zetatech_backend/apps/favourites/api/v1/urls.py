from django.urls import path, include
from rest_framework.routers import SimpleRouter

from apps.favourites.api.v1.views import FavoriteView

router = SimpleRouter()

router.register(r'favorites', FavoriteView, basename='favorites')

urlpatterns = [
    path('', include(router.urls))
]