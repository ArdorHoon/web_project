from django.shortcuts import render, redirect
from festival.models import Festival
from django.contrib import messages

# Create your views here.
def festival(request):
  qs = Festival.objects.all()

  q = request.GET.get('q', '') # GET request의 인자중에 q 값이 있으면 가져오고, 없으면 빈 문자열 넣기
  if q: # q가 있으면
      qs = qs.filter(name__icontains=q) # 제목에 q가 포함되어 있는 레코드만 필터링
      return render(request, 'festival.html', {
        'post_list' : qs,
        'q' : q,
        
      })
  else: 
      return render(request, 'festival.html')

def register(request):
  if request.method =="POST" :
    name = request.POST.get("fes_name", " ")
    date = request.POST.get("fes_date", " ")
    place = request.POST.get("fes_loca", " ")
    price = request.POST.get("fes_price", " ")
    picture = request.POST.get("fes_pic", " ")

    is_festival_in = Festival.objects.filter(name=name)
    if is_festival_in.count() == 0: 
      fest = Festival(name=name, date=date, place=place, price=price, pic=picture)
      fest.save()
    else:
      messages.info(request, "등록하려 하는 축제 정보가 이미 DB안에 존재합니다!")
      return redirect('/festival/register')

    messages.info(request, "등록되었습니다")
    return redirect('/festival')
  else:
    return render(request, 'createFestival.html')
  
  
  
