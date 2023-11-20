import factory
from django.core.files.base import ContentFile

from factory.django import DjangoModelFactory
from apps.blog.models import Post, TagPost
from apps.user.factory import UserFactory


class TagPostFactory(DjangoModelFactory):
    name = factory.Faker('sentence', nb_words=1, variable_nb_words=True)

    class Meta:
        model = TagPost


class PostFactory(DjangoModelFactory):
    title = factory.Faker('sentence', nb_words=2, variable_nb_words=True)
    description = factory.Faker('sentence', nb_words=5, variable_nb_words=True)
    h1 = factory.Faker('sentence', nb_words=4, variable_nb_words=True)
    content = factory.Faker('text', max_nb_chars=1000)
    user = factory.SubFactory(UserFactory)

    image = factory.django.ImageField(color='blue')

    class Meta:
        model = Post

    @factory.post_generation
    def tags(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for tags in extracted:
                self.tags.add(tags)

