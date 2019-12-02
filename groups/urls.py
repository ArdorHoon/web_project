from django.urls import path
from groups import views
# from django.conf import settings
# from django.conf.urls.static import static

urlpatterns = [
   path('', views.group, name='group'),
   path('register/', views.register, name='registerGroup'),
   path('<int:id>/', views.each)
 ]

# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)