from datetime import datetime

from django.contrib import admin

from .models import Post, TagPost


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
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


@admin.register(TagPost)
class TagAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'slug',
    )
    list_filter = ('name',)
