from django.db import models

# Create your models here.
class Data(models.Model):
  name = models.CharField(max_length=10, default="")
  uid = models.CharField(max_length=20, default="")
  gender = models.CharField(max_length=10, default="")
  age = models.IntegerField(default=0)
  # image = models.ImageField(blank=True, null=True)