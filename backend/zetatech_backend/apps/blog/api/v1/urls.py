from backend.zetatech_backend.apps.blog.api.v1.views import PostViewSet
from django.urls import include, path
from rest_framework.routers import DefaultRouter

router_v1 = DefaultRouter()
router_v1.register('blog', PostViewSet)

urlpatterns = [
    path('v1/', include(router_v1.urls)),
]
