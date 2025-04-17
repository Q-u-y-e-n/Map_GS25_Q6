from django.shortcuts import render
#from django.http import HttpResponse

def  homepage(request):
    #return HttpResponse('Xin chào Django')
    return render(request, 'home.html')
def  IntroPage(request):
    #return HttpResponse('Xin chào Django')
    return render(request, 'intro.html')
def  productPage(request):
    #return HttpResponse('Xin chào Django')
    return render(request, 'product.html')
def  contactPage(request):
    #return HttpResponse('Xin chào Django')
    return render(request, 'contact.html')
