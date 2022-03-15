from django.contrib.auth.models import AbstractBaseUser, AbstractUser
from django.db import models
from users.managers import UserManager
from phonenumber_field.modelfields import PhoneNumberField


class UserRoles:
    USER = "user"
    ADMIN = "admin"
    choices = (
        (USER, USER),
        (ADMIN, ADMIN),
    )


class User(AbstractBaseUser):

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone']

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
        "email address",
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
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
        ordering = ["id"]
