from rest_framework import serializers
from django.core.cache import cache
from apps.team.models import Team

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ("name", "description", "image",)