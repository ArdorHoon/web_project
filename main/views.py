from django.shortcuts import render, redirect
from users.models import Data
from festivals.models import Festival
from groups.models import Groups
from groupusers.models import Groupusers
        
# Create your views here.

#  return render(request, 'search.html')

def index(request):
  festivals = Festival.objects.filter(best=1)
  context = {"festivals": festivals}
  return render(request, 'index.html', context)

def manage(request):
  return render(request, 'manage.html')

def room(request,name):
    group = Groups.objects.get(name = name)
    groupusers = Groupusers.objects.filter(group_name = group.name)
    context = {'group':group, 'groupusers': groupusers}
    return render(request, 'groupRoom.html', context)

def mypage(request):
      
  datas = Data.objects.get(uid=request.user.username) #단일 행 가져오기
  Groups = Groupusers.objects.filter(user_id = request.user.username)

  context = {'datas': datas , 'Groups' : Groups }

  return render(request, 'mypage.html', context)

def confirmGroup(request,name):
  if request.method=="POST":
    accept = request.POST.get("accept", None)
    denial = request.POST.get("denial", None)

    group = Groups.objects.get(name=name)

    if accept is not None and denial is None:
      groupuser = Groupusers.objects.get(group_name=group.name, user_id=accept)
      print(groupuser.group_name, groupuser.user_id)
      groupuser.status = 1
      groupuser.save()
    else:
      groupuser = Groupusers.objects.get(group_name=group.name, user_id=denial)
      groupuser.status = -1
      groupuser.save()

    groupusers = Groupusers.objects.filter(group_name = group.name)

    context = {'group':group, 'groupusers': groupusers}
    return render(request, 'eachGroup.html', context)

  else:
    group = Groups.objects.get(name=name)
    groupusers = Groupusers.objects.filter(group_name = group.name)
    context = {'group':group, 'groupusers': groupusers}
    return render(request, 'eachGroup.html', context)


def getout(request,name):
    groupuser = Groupusers.objects.get(group_name=name, user_id=request.user.username)
    groupuser.delete()

    datas = Data.objects.get(uid=request.user.username) #단일 행 가져오기
    Groups = Groupusers.objects.filter(user_id = request.user.username)

    context = {'datas': datas , 'Groups' : Groups }

    return render(request, 'mypage.html', context)
   