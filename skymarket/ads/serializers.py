from phonenumber_field import serializerfields
from rest_framework import serializers

from ads.models import Ad, Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("pk", "text", "author", "created_at")


class AdSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ad
        fields = ("pk", "image", "title", "price", "description")


class AdDetailSerializer(serializers.ModelSerializer):
    author_first_name = serializers.ReadOnlyField(source="author.first_name")
    author_last_name = serializers.ReadOnlyField(source="author.last_name")
    phone = serializerfields.PhoneNumberField(source="author.phone")

    class Meta:
        model = Ad
        fields = ("pk", "image", "title", "price", "phone", "author_first_name", "author_last_name", "description")
