from django.urls import path


from . import views 

urlpatterns = [
    path('faq', views.FAQView.as_view(), name='faq'),
]