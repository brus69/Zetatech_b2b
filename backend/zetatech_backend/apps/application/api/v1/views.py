from rest_framework import generics
from drf_spectacular.utils import extend_schema

from apps.application.models import Application, ShortApplication
from apps.application.serializers import ApplicationSerializer, ShortApplicationSerializer


@extend_schema(request=ApplicationSerializer)
class ApplicationView(generics.CreateAPIView):
    throttle_scope = "low"
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

@extend_schema(request=ShortApplicationSerializer)
class ShortApplicationView(generics.CreateAPIView):
    throttle_scope = "low"
    queryset = ShortApplication.objects.all()
    serializer_class = ShortApplicationSerializer