from django.urls import path


from . import views 

urlpatterns = [
    path('faqs', views.FAQView.as_view(), name='faq'),
]