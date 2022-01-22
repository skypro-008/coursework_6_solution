from rest_framework.routers import SimpleRouter

from djoser.views import UserViewSet
from django.urls import include, path

users_router = SimpleRouter()

users_router.register("users", UserViewSet, basename="users")

urlpatterns = [
    path("", include(users_router.urls)),
]
