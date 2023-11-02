from rest_framework import serializers

from apps.application.models import Application

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ("name","email","description","format","attachment")
   