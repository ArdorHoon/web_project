from django.shortcuts import render, redirect
from users.models import Data

        
# Create your views here.
def index(request):
  return render(request, 'index.html')

def manage(request):
    
  return render(request, 'manage.html')

def mypage(request):
      
  datas = Data.objects.get(uid=request.user.username) #단일 행 가져오기
  context = {'datas': datas}

  return render(request, 'mypage.html', context)

def confirmTicket(request):
  return render(request, 'confirmTicket.html')