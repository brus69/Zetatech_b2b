from apps.faq.models import FAQ
import factory


class FAQFactory(factory.django.DjangoModelFactory):
    answer = factory.Faker("sentence", nb_words=3, variable_nb_words=True)
    question = factory.Faker("sentence", nb_words=50, variable_nb_words=True)

    class Meta:
        model = FAQ
