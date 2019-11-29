from django.shortcuts import render, redirect
from groups.models import Groups
from django.contrib import messages

# Create your views here.
def group(request):
  return render(request, 'group.html')

def each(request):
    return render(request, 'eachGroup.html')

def register(request):
  if request.method == "POST":
    name = request.POST.get("gn", " ")
    leader = request.user.username
    date = request.POST.get("gd", " ")
    hashtag = request.POST.get("ght", " ")
    ticket = request.POST.get("gtk", " ")
    description = request.POST.get("gct", " ")

    group_in_db = Groups.objects.filter(name=name)
    if group_in_db.count() == 0:
      group = Groups(name=name, leader_id=leader, date=date, hashtag=hashtag, ticket=ticket, description=description)
      group.save()
    else:
      # messages.info(request, "Same Group name in Database")
      return redirect('/group/register')
    return redirect('/group')
  else:  
    return render(request, 'registerGroup.html')

