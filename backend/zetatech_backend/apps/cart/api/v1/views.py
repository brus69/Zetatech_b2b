from django.core.cache import cache
from rest_framework import mixins, permissions, viewsets
from rest_framework.response import Response
from apps.cart.utils import get_cart_redis_key
from drf_spectacular.utils import extend_schema
from apps.cart.models import Cart
from apps.cart.serializers import CreateCartSerializer, CartProductsSerializer
from apps.products.models import Product

@extend_schema(responses={"200": CartProductsSerializer})
class CartView(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartProductsSerializer
    lookup_field= 'product_id'

    permission_classes = [permissions.AllowAny]


    def get_serializer_class(self, *args, **kwargs):
        if self.action == "create" or self.action == 'remove':
            return CreateCartSerializer
        
        if self.action == "list":
            return CartProductsSerializer
        

    def destroy(self, request, *args, **kwargs):
        pk = request.data['product_id']

        if request.user.pk:
            cart = Cart.objects.filter(product_id=request.data['product_id'], user_id = request.user.pk)
            cart.delete()

            return Response([])
        
        key = get_cart_redis_key(request.COOKIES['session_id'])
        
        ids = cache.get(key) or []
        cache.set(key, [id for id in ids if id != pk])
        
        return Response(ids)
    
    @extend_schema(request=CreateCartSerializer)
    def create(self, request, *args, **kwargs):
        if request.user.pk:
            cart = Cart.objects.create(product_id=request.data['product_id'], user_id = request.user.pk)
            cart.save()
            return Response([cart.id])
        
        ids = cache.get(get_cart_redis_key(request.COOKIES['session_id'])) or []
        ids.append(request.data['product_id'])
        cache.set(get_cart_redis_key(request.COOKIES['session_id']), list(set(ids)))

        return Response(ids)


    @extend_schema(responses={ "200": CartProductsSerializer(many=True)})
    def list(self, request, *args, **kwargs):
        if request.user.pk:
            queryset = Cart.objects.filter(user_id = request.user.pk).select_related('product')
            product_serializer = CartProductsSerializer([cart.product for cart in queryset], many=True)
            return Response(product_serializer.data)

        ids = cache.get(get_cart_redis_key(request.COOKIES['session_id'])) or []
        queryset = Product.objects.filter(id__in=ids)
        product_serializer = CartProductsSerializer(queryset, many=True)

        return Response(product_serializer.data)
