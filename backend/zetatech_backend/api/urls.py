from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.blog.views import PostViewSet

router_v1 = DefaultRouter()
router_v1.register('blog', PostViewSet)

urlpatterns = [
    path('v1/', include(router_v1.urls)),
]
