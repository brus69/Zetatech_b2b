from slugify import slugify
from django.utils.crypto import get_random_string

def unique_slugify(instance, name):
    """Генерирует уникальный Slug"""
    model = instance.__class__
    unique_slug = slugify(name)

    while model.objects.filter(slug=unique_slug).exists():
        unique_slug = slugify(name) + "-" + get_random_string(length=4)

    return unique_slug