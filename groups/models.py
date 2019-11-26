from django.db import models

# Create your models here.
class Groups(models.Model):
  name = models.CharField(max_length=50, default="")
  festival = models.CharField(max_length=30, default="")
  category = models.CharField(max_length=20, default="")
  usercount = models.IntegerField(default=0)