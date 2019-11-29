from django.shortcuts import render, redirect
from groups.models import Groups
from django.contrib import messages

from festival.models import Festival


# Create your views here.
def group(request):
    groups = Groups.objects.all()
    context = {'groups':groups}
    return render(request, 'group.html',context)

def each(request):
    #groups = Groups.objects.get(name = name)
    return render(request, 'eachGroup.html')

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
    ticket = request.POST.get("gtk", " ")
    description = request.POST.get("gds", " ")

    group_in_db = Groups.objects.filter(name=name)
    if group_in_db.count() == 0:
      group = Groups(name=name, leader_id=leader, festival_name = festival_name, festival_pic = festival_pic, date=date, hashtag=hashtag, maxcount = maxcount, ticket=ticket, description=description)
      group.save()
    else:
      # messages.info(request, "Same Group name in Database")
      return redirect('/group/register')
    return redirect('/group')
  else:
    festival = Festival.objects.all()
    context = {'festival':festival}
    return render(request, 'registerGroup.html',context)

