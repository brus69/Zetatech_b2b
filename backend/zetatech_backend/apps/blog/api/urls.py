from django.urls import include, path

urlpatterns = [
    path('v1/', include('apps.blog.api.v1.urls')),
]
