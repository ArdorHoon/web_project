from django.shortcuts import render, redirect
from festivals.models import Festival
from django.contrib import messages
from django.core.files.storage import default_storage


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


        file = request.FILES['fes_pic']
        file_name = default_storage.save(file.name, file)

        messages.info(request, "등록되었습니다")
        return redirect('/festival')
    else:
      messages.info(request, "등록하려 하는 축제 정보가 이미 DB안에 존재합니다!")
      return redirect('/festival/register')

  else:
    return render(request, 'createFestival.html', locals())


def upload(request):
    folder = request.path.replace("/", "_")
    uploaded_filename = request.FILES['f'].name

    # create the folder if it doesn't exist.
    try:
        os.mkdir(os.path.join(settings.MEDIA_ROOT, folder))
    except:
        pass

    # save the uploaded file inside that folder.
    full_filename = os.path.join(settings.MEDIA_ROOT, folder, uploaded_filename)
    fout = open(full_filename, 'wb+')

    file_content = ContentFile( request.FILES['f'].read() )

    # Iterate through the chunks.
    for chunk in file_content.chunks():
        fout.write(chunk)
    fout.close()