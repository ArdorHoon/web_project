from django.db import models

# Create your models here.
class festival(models.Model):
  name = models.CharField(max_length=30, default="")
  time = models.CharField(max_length=50, default="")
  place = models.CharField(max_length=30, default="")
  price = models.IntegerField(default="", blank=True, null=True)
  lineup = models.TextField(default="")
  post = models.ImageField(blank=True)
  