from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema

from apps.price.models import Price
from apps.price.serializers import PriceSerializer


@extend_schema(responses={"200": PriceSerializer})
class PriceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Price.objects.filter(active=True)
    serializer_class = PriceSerializer
    permission_classes = [AllowAny]
