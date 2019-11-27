from django.shortcuts import render, redirect
from festivals.models import festival
from django.contrib import messages

# Create your views here.
def RegisterFestival(request):
  if request.method =="POST" :
    festivalName = request.POST.get("fes_name", " ")
    festivalDate = request.POST.get("fes_date", " ")
    festivalPlace = request.POST.get("fes_date", " ")
    festivalPrice = request.POST.get("fes_date", " ")
    festivalPicture = request.POST.get("fes_date", " ")
    
    is_festival_in = festival.objects.filter(name=festivalName)
    if is_festival_in == 0: 
      festival(name=festivalName, date=festivalDate, place=festivalPlace, price=festivalPrice, pic=festivalPicture)
    else:
      messages.info("등록하려 하는 축제 정보가 이미 DB안에 존재합니다!")
      redirect('/festival/')

    messages.info("등록되었습니다")
    redirect('/festival')
  else:
    return render(request, 'festival.html')
  
  
  
