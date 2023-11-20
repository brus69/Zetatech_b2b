from apps.team.models import Team
import factory


class TeamFactory(factory.django.DjangoModelFactory):
    name = factory.Faker("sentence", nb_words=3, variable_nb_words=True)
    description = factory.Faker("sentence", nb_words=20, variable_nb_words=True)
    position = factory.Faker("sentence", nb_words=4, variable_nb_words=True)
    image = factory.django.ImageField(color='blue')

    class Meta:
        model = Team
