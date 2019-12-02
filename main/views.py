from django.shortcuts import render, redirect
from users.models import Data
# from festivals.models import Festival
from groups.models import Groups
from groupusers.models import Groupusers
        
# Create your views here.

#  return render(request, 'search.html')

def index(request):
  return render(request, 'index.html')

def manage(request):
  return render(request, 'manage.html')

def each(request,name):
    group = Groups.objects.get(name = name)
    context = {'group':group}
    return render(request, 'eachGroup.html', context)

def mypage(request):
      
  datas = Data.objects.get(uid=request.user.username) #단일 행 가져오기
  Groups = Groupusers.objects.filter(user_id = request.user.username)

  context = {'datas': datas , 'Groups' : Groups }

  return render(request, 'mypage.html', context)

def confirmTicket(request):
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
    #n = Groups.objects.filter(is_authenticated=0).count()
    #if(n==1):
    groups = Groups.objects.filter(is_authenticated=0)
    #else:
    # GroupList = Groups.objects.filter(is_authenticated=0)

    context = {'groups': groups}
    return render(request, 'confirmTicket.html', context)

  #groups = Groups.objects.filter(is_authenticated=0)
  #context = {'groups': groups}
  #return render(request, 'confirmTicket.html', context)


