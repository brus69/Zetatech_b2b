from rest_framework import serializers

from .models import Price, Grid


class GridSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grid
        fields = (
            'name',
            'value'
        )


class PriceSerializer(serializers.ModelSerializer):
    grid = GridSerializer(many=True, read_only=True)

    class Meta:
        model = Price
        fields = (
            'name',
            'price',
            'grid'
        )
