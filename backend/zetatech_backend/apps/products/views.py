from rest_framework import viewsets
from rest_framework import mixins

from apps.products.serializers import (ProductSerializer,
                                       CategorySerializer,
                                       MarkSerializer,
                                       )

from apps.products.models import (Product, 
                                  Category, 
                                  Mark,
                                  )

class ProductViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class MarkViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer
    