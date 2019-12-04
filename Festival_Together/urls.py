"""Festival_Together URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from main import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('index/', views.index, name='index'),
    path('mypage/', views.mypage, name='mypage'),
    path('mypage/<name>', views.each, name='each'),
    path('mypage/<name>/room', views.room, name='room'),
    path('mypage/<name>/getout', views.getout, name='getout'),
    path('mypage/<name>/room/confirm', views.confirmGroup),
    path('festival/', include('festivals.urls')),
    path('group/', include('groups.urls')),
    path('users/', include('users.urls')),
    path('manager/', include('manager.urls')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)