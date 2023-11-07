from rest_framework import serializers

from apps.application.models import Application, ShortApplication

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ("name","email","description","format","attachment")
   

class ShortApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortApplication
        fields = ("name","phone")
   