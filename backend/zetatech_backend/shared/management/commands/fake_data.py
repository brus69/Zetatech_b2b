import factory

from django.core.management.base import BaseCommand
from django.db import transaction

from apps.faq.factory import FAQFactory
from apps.faq.models import FAQ
from apps.team.models import Team
from apps.team.factory import TeamFactory
from apps.products.models import (User, Category, Mark, Product)
from apps.products.factory import ( 
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

        category = CategoryFactory()
        category.save()
        
        mark = MarkFactory()
        mark.save()

        for _ in range(15):
            product = ProductFactory()
            product.save()
    
        self.stdout.write("Creating new data... - success")

    def clear_old_data(self):
        self.stdout.write("Deleting old data...")
        FAQ.objects.all().delete()
        Team.objects.all().delete()
        Category.objects.all().delete()
        Mark.objects.all().delete()
        Product.objects.all().delete()
        for user in User.objects.all():
            if user.username != 'admin':
                user.delete()
        self.stdout.write("Deleting old data... - success")
