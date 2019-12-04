from django.db import models
# from django.utils import timezone
import datetime

# Create your models here.
class Groups(models.Model):
  name = models.CharField(max_length=50, default="")
  leader_id = models.CharField(max_length=20, default="")
  festival_name = models.CharField(max_length=30, default="")
  festival_pic = models.ImageField(blank=True, null=True)
  date = models.DateField(default=datetime.date.today)
  hashtag = models.CharField(max_length=30, default="")
  usercount = models.IntegerField(default=1) # 얘를 없애구
  maxcount = models.IntegerField(default=1)
  # ticket = models.ImageField(null=True, blank=True)
  ticket = models.ImageField(upload_to="image", null=True, blank=True)
  description = models.TextField(max_length=200, default="")
  notification = models.TextField(max_length=1024, default="")
  is_authenticated = models.IntegerField(default=0)

class Comment(models.Model):
  groupname = models.CharField(max_length=30, default="")
  context = models.CharField(max_length=50, default="")
  user_id = models.CharField(max_length=20, default="")
  date = models.DateTimeField(auto_now_add=True)
