from rest_framework import generics
from drf_spectacular.utils import extend_schema

from apps.reviews.models import Review
from apps.reviews.serializers import ReviewSerializer


@extend_schema(responses={"200": ReviewSerializer})
class ReviewView(generics.ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer