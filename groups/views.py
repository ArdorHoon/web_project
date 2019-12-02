from django.shortcuts import render, redirect
from groups.models import Groups
from groupusers.models import Groupusers
from django.contrib import messages
from festivals.models import Festival


# Create your views here.
def group(request):
    groups = Groups.objects.filter(is_authenticated=1)
    context = {'groups':groups}
    return render(request, 'group.html',context)

def each(request,name):
    group = Groups.objects.get(name = name)
    context = {'group':group}
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

def apply(request,id):
    group = Groups.objects.get(id = id)
    group_name = group.name
    user_id = request.user.username
    status = 0

    groupuser = Groupusers(group_name = group_name, user_id = user_id, status = status)
    groupuser.save()

    context = {'group':group}
    return render(request, 'eachGroup.html', context)
