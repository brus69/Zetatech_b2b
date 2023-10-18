from apps.team.models import Team
import factory


class TeamFactory(factory.django.DjangoModelFactory):
    name = factory.Faker("sentence", nb_words=3, variable_nb_words=True)
    description = factory.Faker("sentence", nb_words=50, variable_nb_words=True)

    class Meta:
        model = Team
