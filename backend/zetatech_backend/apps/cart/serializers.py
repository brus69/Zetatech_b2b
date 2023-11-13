from rest_framework import serializers

from apps.products.models import Product
from apps.cart.models import Cart


class CartProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'title', 'slug', 'price')


class CreateCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('product_id',)