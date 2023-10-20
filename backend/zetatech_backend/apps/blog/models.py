from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse
from .utils import unique_slugify


class TagPost(models.Model):
    """Модель тегов. Состоит из полей: имя и слаг."""
    name = models.CharField(
        max_length=50,
        unique=True,
        verbose_name='Название тега'
    )
    slug = models.SlugField(
        max_length=80,
        unique=True,
        blank=True,
        verbose_name='Слаг тега',
        help_text='Автоматическое поле, можно заполнить вручную.'
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slugify(self, self.name)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ('name',)
        default_related_name = 'post_tags'
        verbose_name = 'Тег'
        verbose_name_plural = 'Теги'

    def __str__(self) -> str:
        return self.name


class Post(models.Model):
    """Модель публикации блога."""
    title = models.CharField(
        max_length=60,
        verbose_name='SEO заголовок'
    )
    h1 = models.CharField(
        max_length=150,
        verbose_name='Заголовок'
    )
    description = models.CharField(
        max_length=400,
        verbose_name='SEO описание публикации'
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
        TagPost,
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
    slug = models.SlugField(
        max_length=180,
        unique=True,
        blank=True,
        verbose_name='Слаг статьи',
        help_text='Автоматическое поле, можно заполнить вручную.'
    )

    class Meta:
        default_related_name = 'posts'
        verbose_name = 'Публикация'
        verbose_name_plural = 'Публикации'

    def get_absolute_url(self):
        return reverse('blog_detail', kwargs={'slug': self.slug})

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slugify(self, self.h1)
        super().save(*args, **kwargs)

    @property
    def short_title(self):
        return self.title if len(self.title) < 30 else (self.title[:28] + '..')
