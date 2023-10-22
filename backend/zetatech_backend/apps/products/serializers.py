from rest_framework import serializers

from apps.products.models import (Product, 
                                  Category, 
                                  Mark,
                                  )


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id',
                  'title',
                  'description',
                  'h1',
                  'img_product',
                  'slug',
                  'datafield',
                  'price',
                  'downloaded',
                  'annotation',
                  'content',
                  'mark',
                  'category'
                  )

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'slug', 'name')

class MarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = ('id', 'slug', 'name')