from django.urls import include, path

urlpatterns = [
    path('v1/', include('apps.favourites.api.v1.urls')),
]