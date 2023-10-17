from rest_framework import generics
from rest_framework.response import Response

from apps.faq.models import FAQ
from apps.faq.serializers import FAQSerializer


class FAQView(generics.ListAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer