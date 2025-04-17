# Create your views here.
from django.shortcuts import render

# Create your views here.

def mapsPage(request):
    return render(request, 'map/map_detail.html')
def NVL(request):
    return render(request, 'map/NVL.html')
def tvk(request):
    return render(request, 'map/tvk.html')
def BP4042(request):
    return render(request, 'map/BP_40_42.html')
def viva(request):
    return render(request, 'map/viva.html')
def bp(request):
    return render(request, 'map/bp.html')
def hg(request):
    return render(request, 'map/hg.html')
