from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema

from apps.favourites.serializers import FavoriteSerializer 
from apps.favourites.models import Favorite
from apps.favourites.pagination import FavoriteAPIPagination

from shared.permissions import CurrentUserOrAdmin

@extend_schema(responses={'200': FavoriteSerializer})
class FavoriteView(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    pagination_class = FavoriteAPIPagination
    http_method_names = ["get", "post", "delete"]
    lookup_field = "product_id"
    lookup_url_kwarg = "product_id"

    permission_classes = [permissions.IsAuthenticated]
    

    def get_permissions(self):
        if self.action == "destroy":
            self.permission_classes = [ CurrentUserOrAdmin ]
        return super().get_permissions()
    
    def get_queryset(self):
        user = self.request.user
        queryset = user.favorites.all()
        return queryset