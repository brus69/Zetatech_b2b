# Generated by Django 4.2.6 on 2023-11-11 09:16

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("blog", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="post",
            old_name="author",
            new_name="user",
        ),
    ]
