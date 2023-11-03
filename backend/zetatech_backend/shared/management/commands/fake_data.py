import factory
import random

from django.core.management.base import BaseCommand
from django.db import transaction

from apps.faq.factory import FAQFactory
from apps.faq.models import FAQ
from apps.team.models import Team
from apps.team.factory import TeamFactory
from apps.reviews.models import Review
from apps.products.models import (User, Category, Mark, Product)
from apps.products.factory import ( 
                                   CategoryFactory, 
                                   MarkFactory, 
                                   ProductFactory,
                                   )
from apps.reviews.factory import ReviewFactory

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

        categories = []

        for _ in range(15):
            parent_category = CategoryFactory()
            parent_category.save()
            categories.append(parent_category)


            for _ in range(random.randint(2,8)):
                category = CategoryFactory()
                category.parent_category = parent_category
                category.save()
                categories.append(category)


        for _ in range(25):
            mark = MarkFactory()
            mark.save()

            product = ProductFactory(
                mark=[mark],
                category=[ random.choice(categories)],
            )
            
            product.save()

        for _ in range(3):
            tag_post = TagPostFactory()
            tag_post.save()

            for _ in range(10):
                post = PostFactory(
                    tags=[tag_post]
                )
                post.published = True
                post.save()

        for _ in range(3):

            grids = []

            for _ in range(6):
                grid = GridFactory()
                grid.save()
                grids.append(grid)

            price = PriceFactory(
                grid=grids
            )
            price.active = True
            price.save()

        for _ in range(10):
            review = ReviewFactory()
            review.save()

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
        Review.objects.all().delete()

        for user in User.objects.all():
            if user.username != 'admin':
                user.delete()

        self.stdout.write("Deleting old data... - success")
