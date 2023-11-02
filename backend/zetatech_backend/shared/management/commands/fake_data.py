from django.test import tag
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

from apps.blog.models import TagPost, Post
from apps.blog.factory import TagPostFactory, PostFactory

from apps.price.models import Grid, Price
from apps.price.factory import GridFactory, PriceFactory



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

        for _ in range(6):
            team: Team = TeamFactory()
            team.image = team.image.field.attr_class(
                team,
                team.image.field,
                f"team.png",
            )
            team.save()



        for _ in range(5):
            mark = MarkFactory()
            mark.save()
            
            category = CategoryFactory()
            
            category.save()

            product = ProductFactory(
                mark=[mark],
                category=[category],
            )
            
            product.save()

        for _ in range(3):
            tag_post = TagPostFactory()
            tag_post.save()

            for _ in range(10):
                post = PostFactory(
                    tags=[tag_post]
                )
                post.save()

        for _ in range(7):
            grid = GridFactory()
            grid.save()

            price = PriceFactory(
                grid=[grid]
            )
            price.save()

        self.stdout.write("Creating new data... - success")

    def clear_old_data(self):
        self.stdout.write("Deleting old data...")
        FAQ.objects.all().delete()
        Team.objects.all().delete()
        Category.objects.all().delete()
        Mark.objects.all().delete()
        Product.objects.all().delete()
        TagPost.objects.all().delete()
        Post.objects.all().delete()
        Grid.objects.all().delete()
        Price.objects.all().delete()

        for user in User.objects.all():
            if user.username != 'admin':
                user.delete()
        self.stdout.write("Deleting old data... - success")
