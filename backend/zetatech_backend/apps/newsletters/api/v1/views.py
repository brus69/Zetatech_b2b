from rest_framework import generics
from drf_spectacular.utils import extend_schema

from apps.newsletters.models import Newsletter
from apps.newsletters.serializers import NewsletterSerializer

@extend_schema(request=NewsletterSerializer)
class ApplicationView(generics.CreateAPIView):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer