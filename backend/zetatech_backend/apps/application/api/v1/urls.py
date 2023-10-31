from django.urls import path


from . import views 

urlpatterns = [
    path('applications', views.ApplicationView.as_view(), name='application'),
]