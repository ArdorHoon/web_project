from django.urls import path
from groups import views

urlpatterns = [
   path('', views.group, name='group'),
   path('register/', views.register, name='registerGroup'),
   path('<name>/apply/', views.apply ),
   path('<name>/confirm/', views.confirmGroup ),
   path('<name>/', views.each)
 ]