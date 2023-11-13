from django.db import models
from django.contrib.auth import get_user_model

from apps.products.models import Product

User = get_user_model()

class Cart(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name = 'cart_product')

  class Meta:
      constraints = [
          models.UniqueConstraint(fields=['user_id', 'product_id'], name='user product')
      ]
      verbose_name = 'Корзина'
      verbose_name_plural = 'Корзины'        
