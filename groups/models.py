from django.db import models
import datetime

# Create your models here.
class Groups(models.Model):
  name = models.CharField(max_length=50, default="")
  leader_id = models.CharField(max_length=20, default="")
  festival_name = models.CharField(max_length=30, default="")
  festival_pic = models.ImageField(blank=True, null=True)
  date = models.DateField(default=datetime.date.today)
  hashtag = models.CharField(max_length=30, default="")
  usercount = models.IntegerField(default=0, null=True, blank=True)
  maxcount = models.IntegerField(default=1, null=True, blank=True)
  ticket = models.ImageField(null=True, blank=True)
  description = models.TextField(max_length=200, default="")
  is_authenticated = models.IntegerField(default=0)