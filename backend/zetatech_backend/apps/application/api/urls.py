from django.urls import include, path

urlpatterns = [
    path("v1/", include("apps.application.api.v1.urls")),
]
