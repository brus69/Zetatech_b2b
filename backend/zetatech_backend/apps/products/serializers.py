from rest_framework import serializers

from apps.products.models import (Product, 
                                  Category, 
                                  Mark,
                                  )

class CategoryInternalSerializer(serializers.ModelSerializer):
    parent_category = serializers.SerializerMethodField()

    def get_parent_category(self, obj):
        return (
            CategoryInternalSerializer(obj.parent_category).data if obj.parent_category else None
        )

    class Meta:
        model = Category
        fields = [
            "name",
            "slug",
            "parent_category",
        ]

class MarkInternalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = [
            "name",
            "slug",
        ]



class ProductDetailSerializer(serializers.ModelSerializer):
    is_favorite = serializers.BooleanField(read_only=True)
    category = CategoryInternalSerializer(many=True)
    mark = MarkInternalSerializer(many=True)

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
                  'category',
                  'is_favorite'
                  )



class ProductSerializer(serializers.ModelSerializer):
    is_favorite = serializers.BooleanField(read_only=True)

    class Meta:
        model = Product
        fields = ('id',
                  'title',
                  'h1',
                  'img_product',
                  'slug',
                  'datafield',
                  'price',
                  'downloaded',
                  'annotation',
                  'is_favorite'
                  )


class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = ('slug', 'name', 'subcategories')

    def get_subcategories(self, obj):
        subcategories = Category.objects.filter(parent_category=obj)
        return CategorySerializer(subcategories, many=True).data


    
class CategoryIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('slug', 'name')

class MarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = ('slug', 'name')

