from django.db import models

from shared.models import TimeStampedModel


class Application(TimeStampedModel):
    name = models.CharField()
    email = models.EmailField()
    description = models.TextField(blank=True, null=True)
    format = models.CharField(max_length=56)
    attachment =  models.FileField(blank=True, null=True)

    
class ShortApplication(TimeStampedModel):
    name = models.CharField()
    phone = models.CharField(max_length=26)
