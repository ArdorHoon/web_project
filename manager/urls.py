
from django.urls import path
from manager import views

urlpatterns = [
  path('register_festival/', views.register, name='createFestival'),
  path('confirm_ticket/', views.confirm, name='confirmTicket')
]