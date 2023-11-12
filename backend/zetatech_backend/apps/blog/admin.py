from datetime import datetime

import import_export as ie
from django.contrib import admin
from django.contrib.auth import get_user_model
from import_export import fields, resources, widgets

from .models import Post, TagPost

User = get_user_model()


class PostExportResource(resources.ModelResource):
    tags = fields.Field(
        column_name='tags',
        attribute='tags',
        widget=widgets.ManyToManyWidget(TagPost, field='name', separator='|')
    )

    class Meta:
        model = Post
        exclude = ('image',)
        export_order = (
            'id',
            'title',
            'h1',
            'description',
            'slug',
            'content',
            'tags',
            'user',
            'published',
            'pub_date',
            'created_at',
            'updated_at'
        )


class PostImportResource(resources.ModelResource):
    """
    Ресурс импорта каталога постов из файла в БД.
    Несколько тегов можно импортировать с помощью сепаратора |.
    Также можно использовать новые теги, они автоматически создаются в базе.
    """
    tags = fields.Field(
        column_name='tags',
        attribute='tags',
        widget=widgets.ManyToManyWidget(TagPost, field='name', separator='|')
    )

    user = fields.Field(
        column_name='user',
        attribute='user',
        widget=widgets.ForeignKeyWidget(User, field='username'))

    def before_import_row(self, row, **kwargs):
        """Создание тегов перед началом импорта."""
        tags = [
            item for line in row["tags"].splitlines()
            for item in line.split('|')
        ]
        if len(tags) > 1:
            for tag in tags:
                TagPost.objects.get_or_create(name=tag)
        elif len(tags) == 1:
            TagPost.objects.get_or_create(name=tags[0])

    class Meta:
        model = Post
        skip_unchanged = True
        import_id_fields = ['title']
        fields = (
            'title',
            'h1',
            'description',
            'content',
            'tags',
            'user'
        )


class PostAdmin(ie.admin.ImportExportModelAdmin):
    list_display = (
        'id',
        'user',
        'published',
        'pub_date',
        'short_title'
    )

    list_editable = ('published',)
    list_filter = ('user', 'tags')
    search_fields = ('title', 'user', 'tags')
    resource_classes = (PostImportResource,)

    def save_model(self, request, obj, form, change):
        obj.user = request.user
        obj.save()
        form.save_m2m()

        if (obj.pub_date is None
                and obj.published
                and 'published' in form.changed_data):
            obj.pub_date = datetime.now()
            obj.save()
            form.save()

    def get_export_resource_class(self):
        return PostExportResource


@admin.register(TagPost)
class TagAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'slug',
    )
    list_filter = ('name',)


admin.site.register(Post, PostAdmin)
