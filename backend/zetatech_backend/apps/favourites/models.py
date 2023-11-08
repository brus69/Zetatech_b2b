from django.db import models
from django.contrib.auth import get_user_model

from apps.products.models import Product

User = get_user_model()

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.user}: {self.product}'
    
    class Meta:
        verbose_name = 'Избранное'
        verbose_name_plural = 'Избранное'        
