import factory
from factory.django import DjangoModelFactory

from apps.products.factory import ProductFactory
from apps.favourites.models import Favorite

class FavoriteFactory(DjangoModelFactory):
    product = factory.SubFactory(ProductFactory)

    class Meta:
        model = Favorite