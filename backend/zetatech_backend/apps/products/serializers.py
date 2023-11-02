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
    subcategories = serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = ('slug', 'name', 'subcategories')

    def get_subcategories(self, obj):
        subcategories = Category.objects.filter(parent_category=obj)
        return CategorySerializer(subcategories, many=True).data

    def to_representation(self, instance):
        data = super().to_representation(instance)
        context = {
            'name': data['name'],
            'slug': data['slug'],
            'subcategories': data['subcategories'],
        }
        return context
    
class CategoryIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('slug', 'name')

class MarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = ('id', 'slug', 'name')