from django.urls import path
from festivals import views

urlpatterns = [
  path('', views.festival, name='festival'),
  # path('register/', views.register, name='createFestival')
]