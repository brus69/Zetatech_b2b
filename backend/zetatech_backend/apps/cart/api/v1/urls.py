from django.urls import path, include
from rest_framework.routers import SimpleRouter

from . import views 

router = SimpleRouter()

router.register(r'cart', views.CartView, basename='cart')

urlpatterns = [
    path('', include(router.urls))
]