from django.urls import path
from groups import views

urlpatterns = [
  path('', views.group, name='group'),
  path('eachGroup', views.each, name= 'eachGroup'),
  path('register/', views.register, name='registerGroup')
]