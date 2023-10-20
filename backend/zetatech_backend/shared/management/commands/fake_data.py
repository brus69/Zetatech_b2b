import factory

from django.core.management.base import BaseCommand
from django.db import transaction

from apps.faq.factory import FAQFactory
from apps.faq.models import FAQ
from apps.team.models import Team
from apps.team.factory import TeamFactory
from apps.products.factory import (UserFactory, 
                                   CategoryFactory, 
                                   MarkFactory, 
                                   ProductFactory,
                                   )


class Command(BaseCommand):
    help = "Generates test data"

    @transaction.atomic
    @factory.Faker.override_default_locale("ru_RU")
    def handle(self, *args, **kwargs):
        self.clear_old_data()

        self.stdout.write("Creating new data...")


        for _ in range(10):
            faq = FAQFactory()
            faq.save()


        team: Team = TeamFactory()
        team.image = team.image.field.attr_class(
            team,
            team.image.field,
            f"team.png",
        )
        team.save()
    
        self.stdout.write("Creating new data... - success")

    def clear_old_data(self):
        self.stdout.write("Deleting old data...")
        FAQ.objects.all().delete()
        self.stdout.write("Deleting old data... - success")
