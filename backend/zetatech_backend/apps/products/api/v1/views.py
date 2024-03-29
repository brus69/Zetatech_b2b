from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from apps.blog.pagination import BlogAPIPagination
from drf_spectacular.utils import extend_schema
from django.db.models import Exists, OuterRef
from apps.products.serializers import (ProductDetailSerializer, ProductSerializer,
                                       CategorySerializer,
                                       CategoryIdSerializer,
                                       MarkSerializer,
                                       )

from apps.products.models import (Product, 
                                  Category, 
                                  Mark,
                                  )
from apps.favourites.models import Favorite

@extend_schema(responses={"200": ProductSerializer})
class ProductViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = ProductSerializer

    pagination_class = BlogAPIPagination


    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return super().get_serializer_class()
    
    @extend_schema(responses={"200": ProductDetailSerializer}) 
    def retrieve(self, request, pk=None):
        queryset = Product.objects.all()
        product = get_object_or_404(queryset, slug=pk)
        serializer = ProductDetailSerializer(product)
        return Response(serializer.data)

    def get_queryset(self):
        queryset = Product.objects.annotate(
            is_favorite=Exists(Favorite.objects.filter(
                product_id=OuterRef('id'),
                user_id=self.request.user.pk,
            ))).all()
        return queryset
  

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
    