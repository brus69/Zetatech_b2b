from django.contrib.auth.password_validation import validate_password
from django.core import exceptions as django_exceptions

from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User."""

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "bio",
            "role",
        )


class ProfileEditSerializer(UserSerializer):
    """Serializer for Profile."""

    role = serializers.CharField(read_only=True)


class UsersCreateSerializer(UserCreateSerializer):
    """Serializer for creating a user."""

    class Meta:
        model = User
        fields = (
            "email",
            "id",
            "username",
            "first_name",
            "last_name",
            "password",
        )
        extra_kwargs = {
            "first_name": {"required": True, "allow_blank": False},
            "last_name": {"required": True, "allow_blank": False},
            "email": {"required": True, "allow_blank": False},
        }

    def validate_username(self, value):
        """Function that checks the username range boundaries."""
        if value.lower() == "me":
            raise serializers.ValidationError(
                f"Using name {value} as username is not allowed"
            )
        return value


class SetPasswordSerializer(serializers.Serializer):
    """Serializer for changing user password."""

    current_password = serializers.CharField()
    new_password = serializers.CharField()

    def validate(self, obj):
        try:
            validate_password(obj["new_password"])
        except django_exceptions.ValidationError as e:
            raise serializers.ValidationError(
                {"new_password": list(e.messages)}
            )
        return super().validate(obj)

    def update(self, instance, validated_data):
        if not instance.check_password(validated_data["current_password"]):
            raise serializers.ValidationError(
                {"current_password": "Wrong password."}
            )
        if (
            validated_data["current_password"]
            == validated_data["new_password"]
        ):
            raise serializers.ValidationError(
                {
                    "new_password": "The new password must be different from the current one."
                }
            )
        instance.set_password(validated_data["new_password"])
        instance.save()
        return validated_data
