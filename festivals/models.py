from django.db import models

# Create your models here.
class festival(models.Model):
  name = models.CharField(max_length=30, default="")
  # time = models.CharField(max_length=50, default="")
  date = models.DateField(blank=True, null=True)
  place = models.CharField(max_length=30, default="")
  price = models.IntegerField(default="", blank=True, null=True)
  # lineup = models.TextField(default="")
  pic = models.ImageField(blank=True)
  