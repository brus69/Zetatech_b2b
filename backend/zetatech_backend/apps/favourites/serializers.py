from rest_framework import serializers

from apps.favourites.models import Favorite
from apps.products.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('title',
                  'h1',
                  'img_product',
                  'slug',
                  'price',
                  )



class FavoriteSerializer(serializers.ModelSerializer):
    lookup_field = "product_id"
    lookup_url_kwarg = "product_id"
    class Meta:
        model = Favorite
        fields = ('user_id', 'product' )
    
    product = ProductSerializer()