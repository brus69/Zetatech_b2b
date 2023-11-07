from django.urls import path


from . import views 

urlpatterns = [
    path('applications', views.ApplicationView.as_view(), name='application'),
    path('short_applications', views.ShortApplicationView.as_view(), name='short_applications'),
]