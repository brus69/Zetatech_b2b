from django.db import models

# Create your models here.

def get_image_path(instance, filename):
    directory = "team/images/"
    format_file = "img_.png" 
    path = directory + format_file
    return path

class Team(models.Model):
    name = models.CharField()
    description = models.CharField()
    position = models.CharField()
    image = models.ImageField("Картинка", upload_to=get_image_path)
