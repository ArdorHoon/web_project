from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth


def signup(request):
  if request.method == "POST":
    if request.POST.get("password1", " ") == request.POST.get("password2", " "):
      username = request.POST.get("username"," ")
      password = request.POST.get("password1"," ")
      email = request.POST.get("email", " ")
      
      user = User.objects.create_user(username,email,password)
      user.save()
      #auth.login(user)

      return redirect('/index/')
    return redirect('signup')
  return render(request, 'signup.html')

def login(request):
  if request.method =="POST":
    username = request.POST.get("username", " ")
    password = request.POST.get("password", " ")
    
    user = auth.authenticate(username=username, password=password)

    if user is not None:
      auth.login(request, user)
      return redirect('/index')
    else:
      return redirect('login')
  else:
    return render(request, 'login.html')

def logout(request):
  auth.logout(request)
  return redirect('/index')


# Create your views here.
