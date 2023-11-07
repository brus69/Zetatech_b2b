from django.urls import path


from . import views 

urlpatterns = [
    path('newsletters', views.ApplicationView.as_view(), name='newsletters'),
]