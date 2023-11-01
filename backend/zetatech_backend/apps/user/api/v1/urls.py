from django.urls import include, path

from apps.user.api.v1.views import OTPVerificationView

urlpatterns = [
    path(r"auth/", include("djoser.urls")),
    path(r"auth/", include("djoser.urls.jwt")),
    path('auth/otp/', OTPVerificationView.as_view(), name='otp'),
]
