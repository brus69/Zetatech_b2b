from rest_framework import generics
from drf_spectacular.utils import extend_schema

from apps.faq.models import FAQ
from apps.faq.serializers import FAQSerializer


@extend_schema(responses={"200": FAQSerializer})
class FAQView(generics.ListAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer