from django.contrib.auth.models import AbstractUser
from django.db import models




from .constants import (
    ADMIN,
    AUTHENTICATED_USER,
    CONTENT_MANAGER,
    EDITOR,
    EMAIL_MAX_LENGTH,
    GUEST,
    ROLE_MAX_LENGTH,
)


def get_image_path(instance, filename):
    directory = "user/avatar/"
    format_file = "img_.png" 
    path = directory + format_file
    return path

class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    class Role(models.TextChoices):
        GUEST = "guest "
        AUTHENTICATED_USER = "authenticated_user"
        ADMIN = "admin"
        EDITOR = "editor"
        CONTENT_MANAGER = "content_manager"

    email = models.EmailField(
        "Адрес электронной почты",
        max_length=EMAIL_MAX_LENGTH,
        unique=True,
    )
    role = models.CharField(
        "Роль пользователя",
        choices=Role.choices,
        max_length=ROLE_MAX_LENGTH,
        default=GUEST,
    )

    avatar = models.ImageField("Картинка", upload_to=get_image_path, null=True, blank=True)


    class Meta:
        ordering = ["id"]
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

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


class Otp(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField("token", max_length=40, db_index=True, unique=True)
    code = models.CharField(max_length=6, null=False, blank=False)
    expired_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
