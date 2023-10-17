from django.db import models


class FAQ(models.Model):
    question = models.CharField()
    answer = models.CharField()