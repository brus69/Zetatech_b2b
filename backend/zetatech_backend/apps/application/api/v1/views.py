from rest_framework import generics
from drf_spectacular.utils import extend_schema

from apps.application.models import Application
from apps.application.serializers import ApplicationSerializer


@extend_schema(request=ApplicationSerializer)
class ApplicationView(generics.CreateAPIView):
    throttle_scope = "low"
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer