from django.shortcuts import render, redirect
from festivals.models import festival

# Create your views here.
def Register(request):
  if request.method =="POST" :
    festivalName = request.POST.get("fes_name", " ")
    festivalDate = request.POST.get("fes_date", " ")
    festivalPlace = request.POST.get("fes_date", " ")
    festivalPrice = request.POST.get("fes_date", " ")
    festivalPicture = request.POST.get("fes_date", " ")
    
    is_festival_in = festival.objects.filter(name=festivalName)
    if is_festival_in == 0: 
      festival(name=festivalName, date=festivalDate, place=festivalPlace, price=festivalPrice, pic=festivalPicture)

  