from django.contrib import admin
from .models import Grid, Price


@admin.register(Grid)
class GridAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'value',
    )
    list_filter = ('name',)


@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'price',
        'active'
    )
    list_filter = ('name',)
    list_editable = ('active',)
