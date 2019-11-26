from django.shortcuts import render, redirect

# Create your views here.
def index(request):
  return render(request, 'index.html')

def group(request):
  return render(request, 'group.html')

def festival(request):
  return render(request, 'festival.html')

def createFestival(request):
  return render(request, 'createFestival.html')

def manage(request):
  return render(request, 'manage.html')


def confirmTicket(request):
  return render(request, 'confirmTicket.html')