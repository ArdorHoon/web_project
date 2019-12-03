from django.db import models
import datetime

# Create your models here.
class Festival(models.Model):
  name = models.CharField(max_length=30, default="")
  # time = models.CharField(max_length=50, default="")
  date = models.DateField(default=datetime.date.today)
  place = models.CharField(max_length=30, default="")
  price = models.IntegerField(default=0, blank=True, null=True)
  # lineup = models.TextField(default="")
<<<<<<< HEAD
  poster = models.ImageField(upload_to="image", null=True, blank=True)
=======
  pic = models.ImageField(upload_to="festival",null=True, blank=True)
>>>>>>> 97e5a0a3ba84d372c57f93b3f59e0536bc8755ed
