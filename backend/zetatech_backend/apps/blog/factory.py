import factory
from factory.django import DjangoModelFactory
from django.contrib.auth import get_user_model
from apps.blog.models import Post, TagPost


User = get_user_model()


class UserFactory(DjangoModelFactory):
    username = factory.Faker('user_name')
    email = factory.Faker('email')

    class Meta:
        model = User


class TagPostFactory(DjangoModelFactory):
    name = factory.Faker('sentence', nb_words=1, variable_nb_words=True)
    slug = factory.Faker('sentence', nb_words=1, variable_nb_words=True)

    class Meta:
        model = TagPost


class PostFactory(DjangoModelFactory):
    title = factory.Faker('sentence', nb_words=2, variable_nb_words=True)
    description = factory.Faker('sentence', nb_words=5, variable_nb_words=True)
    h1 = factory.Faker('sentence', nb_words=1, variable_nb_words=True)
    content = factory.Faker('text', max_nb_chars=1000)
    author = factory.SubFactory(UserFactory)

    class Meta:
        model = Post

    @factory.post_generation
    def tags(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for tags in extracted:
                self.tagpost.add(tags)
