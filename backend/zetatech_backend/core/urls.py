from django.urls import include, path
from django.contrib import admin
from django.urls import path

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path("swagger/", SpectacularSwaggerView.as_view(url_name="schema"),name="swagger-ui"),
    
    path("api/", include("apps.faq.api.urls")),
]
