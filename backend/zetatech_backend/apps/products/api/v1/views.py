from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema

from apps.products.serializers import (ProductSerializer,
                                       CategorySerializer,
                                       CategoryIdSerializer,
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

class CategoryViewSet(viewsets.ViewSet):

    @extend_schema(responses={"200": CategorySerializer})
    def list(self, request):
        queryset = Category.objects.filter(parent_category=None)
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)

    @extend_schema(responses={"200": CategoryIdSerializer}) 
    def retrieve(self, request, pk=None):
        queryset = Category.objects.all()
        category_id = get_object_or_404(queryset, pk=pk)
        serializer = CategoryIdSerializer(category_id)
        return Response(serializer.data)

@extend_schema(responses={"200": MarkSerializer})
class MarkViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer
    