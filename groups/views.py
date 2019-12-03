from django.shortcuts import render, redirect
from groups.models import Groups
from groupusers.models import Groupusers
from django.contrib import messages
from festivals.models import Festival
from django.db.models import Q

# Create your views here.
def group(request):
    if request.method =="POST" :
        groups = Groups.objects.filter(is_authenticated=1).order_by('-date')
        q = request.POST.get('q', '') # GET request의 인자중에 q 값이 있으면 가져오고, 없으면 빈 문자열 넣기
        if q: # q가 있으면
            groups = groups.filter(Q(name__contains=q) | Q(hashtag__contains=q)) # 제목에 q가 포함되어 있는 레코드만 필터링
            return render(request, 'group.html', {
            'groups' : groups,
            'q' : q,
         })
        else:
            return render(request, 'group.html')
    else:
        groups = Groups.objects.filter(is_authenticated=1).order_by('-date')
        paginator = Paginator(groups, 10)

        page = request.GET.get('page')
        contexts = paginator.get_page(page)
        return render(request, 'group.html',{'contexts': contexts})

def each(request,name):
    group = Groups.objects.get(name = name)
    groupusers = Groupusers.objects.filter(group_name = group.name)
    context = {'group':group, 'groupusers': groupusers}
    return render(request, 'eachGroup.html', context)

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
      group = Groups(name=name, leader_id=leader, festival_name = festival_name, festival_pic = festival_pic, date=date, hashtag=hashtag, maxcount = maxcount, ticket=ticket, description=description, is_authenticated=1)
      group.save()
      groupuser = Groupusers(group_name = name, user_id = leader, status = 2)
      groupuser.save()
      return redirect('/group')
    else:
      #messages.info(request, "Same Group name in Database")
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

    groupuser = Groupusers(group_name = group_name, user_id = user_id, status = status)
    groupuser.save()

    context = {'group':group}
    return render(request, 'eachGroup.html', context)

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
 