from django.urls import include, path
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)

urlpatterns = [] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('admin/', admin.site.urls),
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path("swagger/", SpectacularSwaggerView.as_view(url_name="schema"),
         name="swagger-ui"),

    path("api/", include([
        path("", include("apps.faq.api.urls")),
        path("", include("apps.user.api.urls")),
        path("", include("apps.team.api.urls")),
        path("", include("apps.products.api.urls")),
        path("", include("apps.blog.api.urls")),
        path("", include("apps.application.api.urls")),
        path("", include("apps.price.api.urls")),
        path("", include("apps.favourites.api.urls")),
        path("", include("apps.reviews.api.urls")),
        path("", include("apps.newsletters.api.urls")),
        path("", include("apps.cart.api.urls")),
    ])),

]

