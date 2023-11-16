from django.db import models
from django.contrib.auth import get_user_model
from shared.utils import unique_slugify

from shared.models import TimeStampedModel 

User = get_user_model()


class Mark(models.Model):
    name = models.CharField('Название метки')
    slug = models.SlugField("Слаг", unique=True, null=False)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Метка'
        verbose_name_plural = 'Метки'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slugify(self, self.name)
        return super().save(*args, **kwargs)


class Category(models.Model):
    name = models.CharField('Название категории')
    slug = models.SlugField("Слаг", unique=True, null=False)
    parent_category = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)

    
    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slugify(self, self.name)
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(TimeStampedModel):
    title = models.CharField('Заголовок веб-страницы', max_length=100)
    description = models.CharField('Описание', max_length=200)
    h1 = models.CharField('Заголовок на странице', max_length=100)
    img_product = models.ImageField(
        'Изображение', null=True, blank=True, upload_to="products/images/"
        )
    slug = models.SlugField("Слаг", unique=True, null=False)
    datafield = models.FileField('БД Парсинга', upload_to="products/uploads/")
    price = models.PositiveSmallIntegerField('Цена')
    downloaded =  models.PositiveSmallIntegerField('Кол-во загрузок')
    annotation = models.TextField('Краткое описание')
    content = models.TextField('Подробное описание')
    mark = models.ManyToManyField(Mark)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ManyToManyField(Category)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'БД (Парсинг)'
        verbose_name_plural = 'БД (Парсинг)'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slugify(self, self.h1)
        return super().save(*args, **kwargs)




