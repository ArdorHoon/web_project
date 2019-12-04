from django.shortcuts import render, redirect
from groups.models import Groups
from groupusers.models import Groupusers
from django.contrib import messages
from festivals.models import Festival
from django.db.models import Q
from django.core.paginator import Paginator

# Create your views here.
def group(request):
    if request.method =="POST" :
        q = request.POST.get('q', '') # GET request의 인자중에 q 값이 있으면 가져오고, 없으면 빈 문자열 넣기
        q_temp = '%' + q + '%'
        if q: # q가 있으면
            groups = Groups.objects.raw("SELECT g.id, g.name, g.usercount, g.maxcount, g.festival_name, g.date, g.hashtag, g.description, f.poster from groups_groups as g left outer join festivals_festival as f on g.festival_name = f.name where g.is_authenticated = 1 and (g.name like '%{0}%' or g.hashtag like '%{0}%' ) order by date".format(q_temp))
            return render(request, 'group.html', {
            'groups' : groups,
            'q' : q,
         })
        else:
            return render(request, 'group.html')
    else:
        groups = Groups.objects.raw("SELECT g.id, g.name, g.usercount, g.maxcount, g.festival_name, g.date, g.hashtag, g.description, f.poster from groups_groups as g left outer join festivals_festival as f on g.festival_name = f.name where g.is_authenticated = 1 order by date")
        content = {"groups":groups}
        return render(request, 'group.html',content)

def each(request,name):
    group = Groups.objects.get(name = name)
    festival = Festival.objects.get(name = group.festival_name)
    # group = Groups.objects.raw("SELECT g.id, g.name, g.usercount, g.maxcount, g.festival_name, g.date, g.hashtag, g.description, f.poster from groups_groups as g left outer join festivals_festival as f on g.festival_name = f.name where g.name = %s",name)

    try:
        queryset = Groupusers.objects.get(group_name = group.name, user_id = request.user.username)
        if queryset.status == -1 :
            queryset.delete()
    except:
        groupusers = Groupusers.objects.filter(group_name = group.name, user_id = request.user.username)
        context = {'group':group, 'festival':festival, 'groupusers': groupusers}
        return render(request, 'eachGroup.html', context)

    groupusers = Groupusers.objects.filter(group_name = group.name, user_id = request.user.username)
    context = {'group':group, 'festival':festival, 'groupusers': groupusers}
    return render(request, 'eachGroup.html',context)

def register(request):
  if request.method == "POST":
    name = request.POST.get("gn", " ")
    leader = request.user.username
    festival_name = request.POST.get("gf"," ")

    try:
        festival = Festival.objects.all()
        festival = festival.filter(name = festival_name)
        festival_pic = festival.pic
    except:
        print("no specific festival")
        festival_pic = ""

    date = request.POST.get("gd", " ")
    hashtag = request.POST.get("ght", " ")
    maxcount = request.POST.get("gmc", " ")
    # ticket = request.POST.get("gtk", " ")
    ticket = request.FILES['gtk']
    description = request.POST.get("gds", " ")

    group_in_db = Groups.objects.filter(name=name)
    if group_in_db.count() == 0:
      group = Groups(name=name, leader_id=leader, festival_name = festival_name, festival_pic = festival_pic, date=date, hashtag=hashtag, maxcount = maxcount, ticket=ticket, description=description, is_authenticated=0)
      group.save()
      groupuser = Groupusers(group_name = name, user_id = leader, status = 2)
      groupuser.save()
      messages.info(request, "그룹 등록을 완료하였습니다.\n승인을 기다려주세요...")
      return redirect('/group')
    else:
      messages.info(request, "같은 이름의 그룹이 존재합니다.")
      return redirect('/group/register')
  else:
    festival = Festival.objects.all()
    context = {'festival':festival}
    return render(request, 'registerGroup.html',context)

def apply(request,name):
    group = Groups.objects.get(name = name)

    group_name = group.name
    user_id = request.user.username
    status = 0

    groupuser_in_db = Groupusers.objects.filter(group_name = group_name, user_id = user_id)
    if groupuser_in_db.count() == 0:
        groupuser = Groupusers(group_name = group_name, user_id = user_id, status = status)
        groupuser.save()

    groupusers=Groupusers.objects.filter(group_name = group_name, user_id = user_id)
    context = {'group':group, 'groupusers':groupusers}
    messages.info(request, name+"그룹 가입이 신청되셨습니다.")
    return render(request, 'eachGroup.html',context)

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
    return render(request, 'eachGroup.html', context)

  else:
    group = Groups.objects.get(name=name)
    groupusers = Groupusers.objects.filter(group_name = group.name)
    context = {'group':group, 'groupusers': groupusers}
    return render(request, 'eachGroup.html', context)
 