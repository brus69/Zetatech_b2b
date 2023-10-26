from apps.user.models import User
from apps.user.serializers import (
    ProfileEditSerializer,
    SetPasswordSerializer,
    UsersCreateSerializer,
    UserSerializer,
)
from drf_spectacular.utils import extend_schema
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response


@extend_schema(responses={"200": UserSerializer})
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)

    def get_serializer_class(self):
        if self.action in (
            "list",
            "retrieve",
        ):
            return UserSerializer
        return UsersCreateSerializer

    @action(
        detail=False,
        methods=["GET", "PATCH"],
        permission_classes=(IsAuthenticated,),
    )
    def me(self, request):
        if request.method == "PATCH":
            serializer = ProfileEditSerializer(
                request.user,
                data=request.data,
                partial=True,
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        serializer = UserSerializer(request.user)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    @action(
        detail=False,
        methods=["POST"],
        permission_classes=(IsAuthenticated,),
    )
    def set_password(self, request):
        serializer = SetPasswordSerializer(
            request.user,
            data=request.data,
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(
            {"detail": "Password changed successfully!"},
            status=status.HTTP_204_NO_CONTENT,
        )
