from rest_framework import serializers

from apps.faq.models import FAQ

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ("answer", "question",)