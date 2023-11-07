from rest_framework import serializers

from apps.newsletters.models import Newsletter

class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = (
            'email',
        )
