from django.db import models
from shared.models import TimeStampedModel


class Grid(TimeStampedModel):
    name = models.CharField(
        max_length=100,
        verbose_name='Название преимущества'
    )
    value = models.CharField(
        max_length=100,
        verbose_name='Значение'
    )

    def __str__(self) -> str:
        return f'{self.name}: {self.value}'


class Price(TimeStampedModel):
    name = models.CharField(
        max_length=100,
        verbose_name='Название тарифа'
    )
    price = models.PositiveSmallIntegerField(
        verbose_name='Цена'
    )
    grid = models.ManyToManyField(
        Grid,
        verbose_name='Преимущества'
    )
    active = models.BooleanField(
        default=False
    )

    class Meta:
        ordering = ('price',)
        default_related_name = 'prices'
        verbose_name = 'Тариф'
        verbose_name_plural = 'Тарифы'

    def __str__(self) -> str:
        return self.name
