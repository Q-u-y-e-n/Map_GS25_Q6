from django.shortcuts import render
#from django.http import HttpResponse

def  homepage(request):
    #return HttpResponse('Xin chào Django')
    return render(request, 'home.html')
