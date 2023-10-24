from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers

from .models import Post, TagPost


class TagPostSerializer(serializers.ModelSerializer):
    """Сериалайзер тегов публикаций."""
    class Meta:
        model = TagPost
        fields = (
            'id',
            'name',
            'slug'
        )


class PostSerializer(serializers.ModelSerializer):
    """Сериалайзер для чтения публикаций."""
    tags = TagPostSerializer(many=True, read_only=True)
    image = Base64ImageField(use_url=True)

    class Meta:
        model = Post
        fields = (
            'id',
            'title',
            'description',
            'tags',
            'h1',
            'content',
            'image',
            'author',
            'slug',
            'pub_date'
        )
        read_only_fields = ('author', 'pub_date')
