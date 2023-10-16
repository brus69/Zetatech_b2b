from django.contrib.auth import get_user_model
from django.db import models


class TagBlog(models.Model):
    """Модель тегов. Состоит из полей: имя, цвет и слаг."""
    name = models.CharField(
        max_length=150,
        unique=True,
        verbose_name='Название тега'
    )
    slug = models.SlugField(
        max_length=150,
        unique=True,
        verbose_name='Слаг тега'
    )

    class Meta:
        ordering = ('name',)
        default_related_name = 'blog_tags'
        verbose_name = 'Тег'
        verbose_name_plural = 'Теги'

    def __str__(self) -> str:
        return self.name


class Blog(models.Model):
    """Модель блога."""
    title = models.CharField(
        max_length=150,
        verbose_name='Заголовок'
    )
    description = models.CharField(
        max_length=400,
        verbose_name='Описание'
    )
    created = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Создан'
    )
    author = models.ForeignKey(
        get_user_model(),
        on_delete=models.PROTECT,
        editable=False
    )
    image = models.ImageField(
        upload_to='apps/blog/media',
        verbose_name='Изображение',
        blank=True
    )
    content = models.TextField(
        verbose_name='Текст публикации'
    )
    tags = models.ManyToManyField(
        TagBlog,
        verbose_name='Теги'
    )
    published = models.BooleanField(
        default=False,
        verbose_name='Опубликован'
    )
    pub_date = models.DateTimeField(
        default=None,
        null=True,
        verbose_name='Дата публикации',
        editable=False
        )

    class Meta:
        default_related_name = 'blogs'
        verbose_name = 'Публикация'
        verbose_name_plural = 'Публикации'

    @property
    def short_title(self):
        return self.title if len(self.title) < 30 else (self.title[:28] + '..')
