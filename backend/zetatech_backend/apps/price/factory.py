import factory
from factory.django import DjangoModelFactory
from apps.price.models import Grid, Price


class GridFactory(DjangoModelFactory):
    name = factory.Faker('sentence', nb_words=2, variable_nb_words=True)
    value = factory.Faker('sentence', nb_words=2, variable_nb_words=True)

    class Meta:
        model = Grid


class PriceFactory(DjangoModelFactory):
    name = factory.Faker('sentence', nb_words=2, variable_nb_words=True)
    price = factory.Faker('pyint', min_value=1000, max_value=20000)

    class Meta:
        model = Price

    @factory.post_generation
    def grid(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for grid in extracted:
                self.grid.add(grid)
