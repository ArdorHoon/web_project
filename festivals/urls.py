from django.urls import path
from festivals import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
  path('', views.festival, name='festival'),
  path('detailFestival/<int:id>)/', views.detailFestival, name='detailFestival'),
  path('register/', views.register, name='createFestival')
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)