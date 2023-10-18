from rest_framework import generics
from drf_spectacular.utils import extend_schema

from apps.team.models import Team
from apps.team.serializers import TeamSerializer


@extend_schema(responses={"200": TeamSerializer})
class TeamView(generics.ListAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

