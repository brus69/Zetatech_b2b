# Generated by Django 4.2.6 on 2023-11-10 13:53

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("favourites", "0003_favorite_date_add_alter_favorite_product"),
    ]

    operations = [
        migrations.RenameField(
            model_name="favorite",
            old_name="date_add",
            new_name="created_at",
        ),
    ]
