from django.shortcuts import render, redirect

# Create your views here.
def index(request):
  return render(request, 'index.html')

def manage(request):
  return render(request, 'manage.html')

def mypage(request):
  return render(request, 'mypage.html')

def confirmTicket(request):
  return render(request, 'confirmTicket.html')