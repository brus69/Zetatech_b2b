from django.urls import include, path

urlpatterns = [
    path("v1/", include("apps.team.api.v1.urls")),
]
