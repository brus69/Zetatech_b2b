import factory
from factory.django import DjangoModelFactory

from apps.products.factory import ProductFactory, UserFactory
from apps.favourites.models import Favorite

class FavoriteFactory(DjangoModelFactory):
    user = factory.SubFactory(UserFactory)
    product = factory.SubFactory(ProductFactory)

    class Meta:
        model = Favorite