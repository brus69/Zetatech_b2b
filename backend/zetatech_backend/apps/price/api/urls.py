from django.urls import include, path

urlpatterns = [
    path('v1/', include('apps.price.api.v1.urls')),
]
