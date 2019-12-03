from django.shortcuts import render, redirect
from festivals.models import Festival
from groups.models import Groups
from django.contrib import messages

def register(request):
  if request.user.is_superuser:
    if request.method =="POST":
      name = request.POST.get("fes_name", " ")
      date = request.POST.get("fes_date", " ")
      place = request.POST.get("fes_loca", " ")
      price = request.POST.get("fes_price", " ")
      poster = request.FILES['fes_pic']

      is_festival_in = Festival.objects.filter(name=name)
      if is_festival_in.count() == 0: 
        fest = Festival(name=name, date=date, place=place, price=price, poster=poster)
        fest.save()
      else:
        messages.info(request, "등록하려 하는 축제 정보가 이미 DB안에 존재합니다!")
        return redirect('/manager/register_festival')

      messages.info(request, "등록되었습니다")
      return redirect('/index')
    else:
      return render(request, 'createFestival.html')
  else:
    return redirect('/index')

def confirm(request): #main view 에서 응답 처리
  if request.user.is_superuser:
    if request.method=="POST":
      accept = request.POST.get("accept", None)
      denial = request.POST.get("denial", None)

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

      paginator = Paginator(groups, 10)
      page = request.GET.get('page')
      contexts = paginator.get_page(page)

      context = {'contexts': contexts}
      return render(request, 'confirmTicket.html', contexts)
  else:
    return redirect('/index')
