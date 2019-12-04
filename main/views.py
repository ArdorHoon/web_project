from django.shortcuts import render, redirect
from users.models import Data
from festivals.models import Festival
from groups.models import Groups
from groups.models import Comment
from groupusers.models import Groupusers
from django.utils import timezone
from django.contrib import messages

# Create your views here.

#  return render(request, 'search.html')

def index(request):
  festivals = Festival.objects.filter(best=1)
  context = {"festivals": festivals}
  return render(request, 'index.html', context)

def manage(request):
  return render(request, 'manage.html')

def room(request,name):
  if request.method == "POST":
    notify = request.POST.get("notify", "없음") 
    comment = request.POST.get("comment", None)
    
    if comment is not None:
      group = Groups.objects.get(name = name)
      comm = Comment(groupname=group.name, context=comment, user_id=request.user.username)
      comm.save()
    if notify is not "없음":
      group = Groups.objects.get(name = name)
      group.notification = notify
      group.save()
    
    return redirect('/mypage/'+name+'/room')
  else:
    group = Groups.objects.get(name = name)
    fes = Festival.objects.get(name = group.festival_name)
    groupusers = Groupusers.objects.filter(group_name = group.name)
    comments = Comment.objects.filter(groupname=group.name)
    # context = {'group':group, 'festival': fes, 'groupusers': groupusers}
    context = {'group':group, 'festival': fes, 'groupusers': groupusers, 'comments':comments}
    return render(request, 'groupRoom.html', context)

def mypage(request):

  datas = Data.objects.get(uid=request.user.username) #단일 행 가져오기
  groupusers = Groupusers.objects.filter(user_id = request.user.username)
  groups = Groups.objects.filter(leader_id = request.user.username)

  context = {'datas': datas , 'groupusers' : groupusers , 'groups' : groups}

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
      group.usercount = group.usercount + 1
      group.save()
    else:
      groupuser = Groupusers.objects.get(group_name=group.name, user_id=denial)
      groupuser.status = -1
      groupuser.save()

    groupusers = Groupusers.objects.filter(group_name = group.name)

    context = {'group':group, 'groupusers': groupusers}
    return redirect('/mypage/'+name+'/room')
  else:
    group = Groups.objects.get(name=name)
    groupusers = Groupusers.objects.filter(group_name = group.name)
    context = {'group':group, 'groupusers': groupusers}
    return render(request, 'groupRoom.html', context)


def getout(request,name):
    groupuser = Groupusers.objects.get(group_name=name, user_id=request.user.username)
    groupuser.delete()

    datas = Data.objects.get(uid=request.user.username) #단일 행 가져오기
    groupusers = Groupusers.objects.filter(user_id = request.user.username)
    groups = Groups.objects.filter(leader_id = request.user.username)
    print(name)
    group = Groups.objects.get(name=name)
    group.usercount = group.usercount - 1

  
    
    context = {'datas': datas , 'groupusers' : groupusers , 'groups' : groups}
    messages.info(request, name+"그룹을 탈퇴했습니다.")
    return render(request, 'mypage.html', context)



def each(request,name):
    print("main's")
    group = Groups.objects.get(name = name)
    try:
       queryset = Groupusers.objects.get(group_name = group.name, user_id = request.user.username)
       if queryset.status == -1 :
           queryset.delete()
    except:
       print("no queryset")

    groupusers = Groupusers.objects.filter(group_name = group.name, user_id = request.user.username)
    context = {'group':group, 'groupusers': groupusers}

    return redirect('/group/'+name+'/')