from apps.blog.api.v1.views import PostViewSet
from django.urls import include, path
from rest_framework.routers import DefaultRouter

router_v1 = DefaultRouter()
router_v1.register(r'blog', PostViewSet, basename='blog')

urlpatterns = [
    path('', include(router_v1.urls)),
]
