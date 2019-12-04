from django.shortcuts import render, redirect
from users.models import Data
from festivals.models import Festival
from groups.models import Groups
from groups.models import Comment
from groupusers.models import Groupusers
from django.utils import timezone

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
    notify = request.POST.get("notify", None) 
    comment = request.POST.get("comment", None)
    if notify is None:
      group = Groups.objects.get(name = name)
      comm = Comment(groupname=group.name, context=comment, user_id=request.user.username)
      comm.save()
    else:
      group = Groups.objects.get(name = name)
      group.notification = notify
    
    return redirect('/mypage/'+name+'/room')
  else:
    group = Groups.objects.get(name = name)
    groupusers = Groupusers.objects.filter(group_name = group.name)
    comments = Comment.objects.filter(groupname=group.name)
    context = {'group':group, 'groupusers': groupusers, 'comments':comments}
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
    Groups = Groupusers.objects.filter(leader_id = request.user.username)

    context = {'datas': datas , 'Groups' : Groups }

    return render(request, 'mypage.html', context)
<<<<<<< HEAD

def each(request,name):
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

=======
   
  
>>>>>>> d6feb2baa81f67259fa9213f413aa4d56fda4cbb
