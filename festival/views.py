from django.shortcuts import render, redirect
from festival.models import Festival
from django.contrib import messages

# Create your views here.
def festival(request):
  return render(request, 'festival.html')
  
  
  
