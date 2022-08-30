from django.db import models

# Create your models here.
class Groupusers(models.Model):
  group_name = models.CharField(max_length=50, default="")
  user_id = models.CharField(max_length=10, default="")
  status = models.IntegerField(default=0, null=True, blank=True)
  # 2는 리더, 1는 user, 0은 대기, -1는 거절

