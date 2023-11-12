from django.urls import include, path

urlpatterns = [
    path("v1/", include("apps.cart.api.v1.urls")),
]
