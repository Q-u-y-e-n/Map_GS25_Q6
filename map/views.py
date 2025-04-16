# Create your views here.
from django.shortcuts import render

# Create your views here.

def mapsPage(request):
    return render(request, 'map/map_detail.html')
def NVL(request):
    return render(request, 'map/NVT.html')
