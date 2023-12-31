# Generated by Django 4.2.6 on 2023-10-27 18:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Category",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(verbose_name="Название категории")),
                ("slug", models.SlugField(verbose_name="URL")),
            ],
            options={
                "verbose_name": "Категория",
                "verbose_name_plural": "Категории",
            },
        ),
        migrations.CreateModel(
            name="Mark",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(verbose_name="Название метки")),
                ("slug", models.SlugField(verbose_name="URL")),
            ],
            options={
                "verbose_name": "Метка",
                "verbose_name_plural": "Метки",
            },
        ),
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "title",
                    models.CharField(
                        max_length=100, verbose_name="Заголовок веб-страницы"
                    ),
                ),
                (
                    "description",
                    models.CharField(max_length=200, verbose_name="Описание"),
                ),
                (
                    "h1",
                    models.CharField(
                        max_length=100, verbose_name="Заголовок на странице"
                    ),
                ),
                (
                    "img_product",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to="products/images/",
                        verbose_name="Изображение",
                    ),
                ),
                ("slug", models.SlugField(verbose_name="URL")),
                (
                    "datafield",
                    models.FileField(
                        upload_to="products/uploads/", verbose_name="БД Парсинга"
                    ),
                ),
                ("price", models.PositiveSmallIntegerField(verbose_name="Цена")),
                (
                    "downloaded",
                    models.PositiveSmallIntegerField(verbose_name="Кол-во загрузок"),
                ),
                ("annotation", models.TextField(verbose_name="Краткое описание")),
                ("content", models.TextField(verbose_name="Подробное описание")),
                ("category", models.ManyToManyField(to="products.category")),
                ("mark", models.ManyToManyField(to="products.mark")),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "БД (Парсинг)",
                "verbose_name_plural": "БД (Парсинг)",
            },
        ),
    ]
