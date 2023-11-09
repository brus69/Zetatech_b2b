from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Review(models.Model):
  rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
  author = models.CharField(max_length=256)
  text = models.CharField(max_length=1024)