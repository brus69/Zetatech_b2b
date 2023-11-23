import factory
from factory.django import DjangoModelFactory


from apps.user.factory import UserFactory
from apps.products.models import (Product, 
                                  Category, 
                                  Mark,
                                  )


class MarkFactory(DjangoModelFactory):
    name = factory.Faker('sentence', nb_words=1, variable_nb_words=True)
    
    class Meta:
        model = Mark

class CategoryFactory(DjangoModelFactory):
    name = factory.Faker('sentence', nb_words=1, variable_nb_words=True)

    class Meta:
        model = Category

class ProductFactory(DjangoModelFactory):
    title = factory.Faker('sentence', nb_words=2, variable_nb_words=True)
    description = factory.Faker('sentence', nb_words=5, variable_nb_words=True)
    h1 = factory.Faker('sentence', nb_words=1, variable_nb_words=True)
    price = factory.Faker('random_int', min=10, max=1000)
    downloaded = factory.Faker('random_int', min=0, max=1000)
    annotation = factory.Faker('text', max_nb_chars=200)
    content = factory.Faker('text', max_nb_chars=1000)
    user = factory.SubFactory(UserFactory)
    img_product = factory.django.ImageField(color='green')

    class Meta:
        model = Product

    @factory.post_generation
    def mark(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for mark in extracted:
                self.mark.add(mark)
    
    @factory.post_generation
    def category(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for category in extracted:
                self.category.add(category)