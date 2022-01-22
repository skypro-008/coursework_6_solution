from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from users.managers import CustomUserManager
from django.utils.translation import gettext_lazy as _


class UserRoles:
    USER = 'user'
    MODERATOR = 'moderator'
    ADMIN = 'admin'
    choices = (
        (USER, USER),
        (MODERATOR, MODERATOR),
        (ADMIN, ADMIN),
    )


class User(AbstractUser):
    username = models.CharField(
        max_length=64,
        blank=True,
        null=True,
    )
    first_name = models.CharField(
        max_length=64,
        verbose_name="Имя",
        help_text="Введите имя, макс 64 символа",
    )

    last_name = models.CharField(
        max_length=64,
        verbose_name="Фамилия",
        help_text="Введите фамилию, макс 64 символа",
    )

    email = models.EmailField(
        'email address',
        unique=True,
        help_text="Укажите электронную почту",

    )

    phone = PhoneNumberField(
        verbose_name="Телефон для связи",
        help_text="Укажите телефон для связи",
    )

    role = models.CharField(
        max_length=20,
        choices=UserRoles.choices,
        default=UserRoles.USER,
        verbose_name="Роль пользователя",
        help_text="Выберите роль пользователя",
    )

    image = models.ImageField(
        upload_to="profile",
        null=True,
        verbose_name="Аватар",
        help_text="Загрузите аватар",
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone']
    objects = CustomUserManager()

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.email

    @property
    def is_admin(self):
        return self.role == UserRoles.ADMIN

    @property
    def is_moderator(self):
        return self.role == UserRoles.MODERATOR

    @property
    def is_user(self):
        return self.role == UserRoles.USER

    class Meta:
        verbose_name = _("Пользователь")
        verbose_name_plural = _("Пользователи")
