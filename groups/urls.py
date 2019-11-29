
from django.urls import path
from groups import views

urlpatterns = [
  path('', views.group, name='group'),
  path('each/', views.each, name= 'eachGroup'),
  path('register/', views.register, name='registerGroup')
]