from django.shortcuts import render, redirect
from festivals.models import Festival
from groups.models import Groups
from django.contrib import messages
from django.core.paginator import Paginator 

def register(request):
  if request.user.is_superuser:
    if request.method =="POST":
      name = request.POST.get("fes_name", " ")
      date = request.POST.get("fes_date", " ")
      place = request.POST.get("fes_loca", " ")
      price = request.POST.get("fes_price", " ")
      desc = request.POST.get("fes_desc", " ")
      poster = request.FILES['fes_pic']

      is_festival_in = Festival.objects.filter(name=name)
      if is_festival_in.count() == 0: 
        fest = Festival(name=name, date=date, place=place, price=price, poster=poster, desc=desc)
        fest.save()
      else:
        #messages.info(request, "등록하려 하는 축제 정보가 이미 DB안에 존재합니다!")
        return redirect('/manager/register_festival')

      #messages.info(request, "등록되었습니다")
      return redirect('/index')
    else:
      return render(request, 'createFestival.html')
  else:
    return redirect('/index')

def confirm(request):
  if request.user.is_superuser:
    if request.method=="POST":
      accept = request.POST.get("accept", None)
      denial = request.POST.get("denial", None)
      print(accept, denial)
      if accept is not None and denial is None: 
        group = Groups.objects.get(name=accept)
        group.is_authenticated = 1
        group.save()
      else:
        group = Groups.objects.get(name=denial)
        group.is_authenticated = -1
        group.save()
      
      return redirect('/manager/confirm_ticket')
    else:
      groups = Groups.objects.filter(is_authenticated=0)
      content = {"groups": groups}
      return render(request, 'confirmTicket.html', content)
  else:
    return redirect('/index')
