from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth, messages
from users.models import Data



def signup(request):
  if request.method == "POST":
    if request.POST.get("password1", " ") == request.POST.get("password2", " "):
      username = request.POST.get("username"," ")
      password = request.POST.get("password1"," ")
      email = request.POST.get("email", " ")

      name = request.POST.get("name", " ")
      gender = request.POST.get("gender", " ")
      age = request.POST.get("age", " ")
      # ticket = request.POST.get("ticket", " ")

      user = User.objects.create_user(username,email,password)
      user.save()
      #auth.login(user)
      
      user_info = Data(name=name, uid=username, gender=gender, age=age)
      user_info.save()

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
      messages.info(request, "로그인 성공")
      return redirect('/index')
    else:
      return redirect('login')
  else:
    return render(request, 'login.html')

def logout(request):
  auth.logout(request)
  messages.info(request, "로그아웃 되었습니다")
  return redirect('/index')

# Create your views here.
