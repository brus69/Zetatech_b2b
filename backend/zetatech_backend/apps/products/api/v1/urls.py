from django.urls import path, include
from rest_framework.routers import SimpleRouter

from apps.products.api.v1.views import (ProductViewSet, 
                                 CategoryViewSet, 
                                 MarkViewSet,
                                 )

router =SimpleRouter()

router.register(r'products', ProductViewSet, basename='products')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'marks', MarkViewSet, basename='marks')


urlpatterns = [
    path('', include(router.urls))
]