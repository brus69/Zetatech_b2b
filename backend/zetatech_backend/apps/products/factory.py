import factory
from factory.django import DjangoModelFactory
from django.contrib.auth import get_user_model

User = get_user_model()

from apps.products.models import (Product, 
                                  Category, 
                                  Mark,
                                  )

class UserFactory(DjangoModelFactory):
    username = factory.Faker('user_name')
    email = factory.Faker('email')

    class Meta:
        model = User

class MarkFactory(DjangoModelFactory):
    name = factory.Faker('sentence', nb_words=1, variable_nb_words=True)
    slug = factory.Faker('sentence', nb_words=1, variable_nb_words=True)
    
    class Meta:
        model = Mark

class CategoryFactory(DjangoModelFactory):
    name = factory.Faker('sentence', nb_words=1, variable_nb_words=True)
    slug = factory.Faker('sentence', nb_words=1, variable_nb_words=True)

    class Meta:
        model = Category

class ProductFactory(DjangoModelFactory):
    title = factory.Faker('sentence', nb_words=2, variable_nb_words=True)
    description = factory.Faker('sentence', nb_words=5, variable_nb_words=True)
    h1 = factory.Faker('sentence', nb_words=1, variable_nb_words=True)
    slug = factory.Faker('sentence', nb_words=1, variable_nb_words=True)
    price = factory.Faker('random_int', min=10, max=1000)
    downloaded = factory.Faker('random_int', min=0, max=1000)
    annotation = factory.Faker('text', max_nb_chars=200)
    content = factory.Faker('text', max_nb_chars=1000)
    user = factory.SubFactory(UserFactory)

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