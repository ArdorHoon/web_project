from django.urls import path
from festivals import views

urlpatterns = [
  path('', views.festival, name='festival'),
  path('detailFestival/<int:id>)/', views.detailFestival, name='detailFestival'),
  path('register/', views.register, name='createFestival')
]

