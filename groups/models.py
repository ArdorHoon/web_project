from django.db import models
import datetime

# Create your models here.
class Groups(models.Model):
  name = models.CharField(max_length=50, default="")
  leader_id = models.CharField(max_length=20, default="")
  date = models.DateField(default=datetime.date.today)
  # tag = models.CharField(max_length=30, default="")
  hashtag = models.CharField(max_length=30, default="")
  ticket = models.ImageField(null=True, blank=True)
  description = models.TextField(max_length=200, default="")
  usercount = models.IntegerField(default=1, null=True, blank=True)
  is_authenticated = models.IntegerField(default=0)
  