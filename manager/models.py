from django.db import models

# Create your models here.
class Festival(models.Model):
  name = models.CharField(max_length=30, default="")
  date = models.DateField(default=datetime.date.today)
  place = models.CharField(max_length=30, default="")
  price = models.IntegerField(default=0, blank=True, null=True)
  poster = models.ImageField(upload_to="image", null=True, blank=True)
  desc = models.CharField(max_length=200, default="")