from rest_framework import viewsets
from rest_framework import mixins
from drf_spectacular.utils import extend_schema

from apps.products.serializers import (ProductSerializer,
                                       CategorySerializer,
                                       MarkSerializer,
                                       )

from apps.products.models import (Product, 
                                  Category, 
                                  Mark,
                                  )

@extend_schema(responses={"200": ProductSerializer})
class ProductViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

@extend_schema(responses={"200": CategorySerializer})
class CategoryViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

@extend_schema(responses={"200": MarkSerializer})
class MarkViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer
    