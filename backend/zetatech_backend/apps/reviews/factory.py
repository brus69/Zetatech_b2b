import factory

from apps.reviews.models import Review


class ReviewFactory(factory.django.DjangoModelFactory):
    rating = factory.Faker('pyint', min_value=1, max_value=5)
    text = factory.Faker("sentence", nb_words=10, variable_nb_words=True)
    author = factory.Faker("sentence", nb_words=3, variable_nb_words=True)

    class Meta:
        model = Review
