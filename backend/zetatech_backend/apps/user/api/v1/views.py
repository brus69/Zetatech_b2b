from django.utils import timezone

from drf_spectacular.utils import extend_schema
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from apps.user.models import Otp, User
from apps.user.serializers import (
    OtpSerializer,
    ProfileEditSerializer,
    SetPasswordSerializer,
    UsersCreateSerializer,
    UserSerializer,
)


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



@extend_schema(responses={"200": OtpSerializer})
class OTPVerificationView(APIView):
    
    def post(self, request):
        code = request.data.get('code')
        token = request.data.get('token')
        try:
            opt = Otp.objects.get(code=code, token=token, expired_at__gte=timezone.now())

            refresh = RefreshToken.for_user(opt.user)

            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_200_OK)

        except Otp.DoesNotExist:
            return Response({'error': 'Invalid OTP code.'}, status=status.HTTP_400_BAD_REQUEST)