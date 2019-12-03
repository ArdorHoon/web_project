from django.shortcuts import render, redirect
from festivals.models import Festival
from django.contrib import messages


# Create your views here.
def festival(request):
  if request.method =="POST" :
    qs = Festival.objects.all().order_by('-date')
    q = request.POST.get('q', '') # GET request의 인자중에 q 값이 있으면 가져오고, 없으면 빈 문자열 넣기
    if q: # q가 있으면
        qs = qs.filter(name__contains=q) # 제목에 q가 포함되어 있는 레코드만 필터링
        return render(request, 'festival.html', {
        'festivals' : qs,
        'q' : q,
     })
    else:
        return render(request, 'festival.html')
  else:
    festivals = Festival.objects.all().order_by('-date')
    context = {'festivals': festivals}
    return render(request, 'festival.html',context)

def detailFestival(request, id):
    festival = Festival.objects.get(pk = id)
    context = {'festival':festival}
    return render(request, 'detailFestival.html', context)
