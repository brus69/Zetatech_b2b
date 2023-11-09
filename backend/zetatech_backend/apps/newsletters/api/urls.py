from django.urls import include, path

urlpatterns = [
    path("v1/", include("apps.newsletters.api.v1.urls")),
]
