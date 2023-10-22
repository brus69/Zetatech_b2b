from django.urls import include, path

urlpatterns = [
    path('v1/', include('apps.products.api.v1.urls')),
]