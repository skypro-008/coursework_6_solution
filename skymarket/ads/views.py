from django.shortcuts import get_object_or_404
from rest_framework import pagination, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from ads.models import Ad, Comment
from ads.permissions import IsOwner, IsAdmin
from ads.serializers import AdDetailSerializer, AdSerializer, CommentSerializer
from django_filters.rest_framework import DjangoFilterBackend
from ads.filters import AdFilter
from rest_framework.decorators import action


class AdPagination(pagination.PageNumberPagination):
    page_size = 3


class AdViewSet(viewsets.ModelViewSet):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    pagination_class = AdPagination
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwner, IsAdmin]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = AdFilter

    def get_serializer_class(self):
        if self.action == "retrieve":
            return AdDetailSerializer
        return AdSerializer

    def get_queryset(self):
        if self.action == "me":
            return Ad.objects.filter(author=self.request.user).all()
        return Ad.objects.all()


    @action(
        detail=False,
        methods=[
            "get",
        ],
    )
    def me(self, request, *args, **kwargs):
        return super().list(self, request, *args, **kwargs)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwner, IsAdmin]

    def get_queryset(self):
        ad_id = self.kwargs.get("ad_pk")
        ad_instance = get_object_or_404(Ad, id=ad_id)
        return ad_instance.comments.all()
