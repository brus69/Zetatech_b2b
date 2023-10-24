from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from .constants import (ADMIN, AUTHENTICATED_USER, CONTENT_MANAGER, EDITOR,
                        EMAIL_MAX_LENGTH, GUEST, ROLE_MAX_LENGTH)


class User(AbstractUser):
    """Users authentication system are represented by this model."""

    class Role(models.TextChoices):
        GUEST = "guest"
        AUTHENTICATED_USER = "authenticated_user"
        ADMIN = "admin"
        EDITOR = "editor"
        CONTENT_MANAGER = "content_manager"

    email = models.EmailField(
        _("Email address"), max_length=EMAIL_MAX_LENGTH, unique=True
    )
    role = models.CharField(
        _("Users role"),
        choices=Role.choices,
        max_length=ROLE_MAX_LENGTH,
        default=GUEST,
    )

    class Meta:
        ordering = ["id"]
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.username

    @property
    def is_admin(self):
        return self.role == ADMIN

    @property
    def is_authenticated(self):
        return self.role == AUTHENTICATED_USER

    @property
    def is_editor(self):
        return self.role == EDITOR

    @property
    def is_content_manager(self):
        return self.role == CONTENT_MANAGER
