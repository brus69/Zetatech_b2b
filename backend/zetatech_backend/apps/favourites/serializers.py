from rest_framework import serializers

from apps.favourites.models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ('id', 'user', 'product' )

    def to_representation(self, instance):
        p = Favorite.objects.get(id=instance.id)
        context = {
            'name_product': p.product.h1,
            'price': p.product.price,
            'slug': p.product.slug,
            'date': p.date_add,
            
        }
        return context