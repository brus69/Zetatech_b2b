from datetime import datetime

import import_export as ie
from django.contrib import admin
from import_export import fields, resources, widgets

from .models import Post, TagPost


class PostExportResource(resources.ModelResource):
    """Ресурс экспорта в файл каталога постов."""
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
            'author',
            'published',
            'pub_date',
            'created'
        )


class PostImportResource(resources.ModelResource):
    """Ресурс импорта каталога постов из файла в БД.
    Несколько тегов можно импортировать с помощью сепаратора |.
    Также можно использовать новые теги, они автоматически создаются в базе."""
    tags = fields.Field(
        column_name='tags',
        attribute='tags',
        widget=widgets.ManyToManyWidget(TagPost, field='name', separator='|')
    )

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
            'tags'
        )


class PostAdmin(ie.admin.ImportExportModelAdmin):
    list_display = (
        'id',
        'author',
        'published',
        'pub_date',
        'short_title'
    )

    list_editable = ('published',)
    list_filter = ('author', 'tags')
    search_fields = ('title', 'author', 'tags')
    resource_classes = (PostImportResource,)

    def save_model(self, request, obj, form, change):
        obj.author = request.user
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
