from django.urls import include, path

urlpatterns = [
    path("v1/", include("apps.reviews.api.v1.urls")),
]
