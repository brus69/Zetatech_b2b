from django.db import models

from shared.models import TimeStampedModel

class Newsletter(TimeStampedModel):
    email = models.EmailField(unique=True)