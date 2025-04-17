from django.urls import path
from . import views
app_name = 'map'

urlpatterns = [
    path('', views.mapsPage),
    path('co-ban/', views.mapsPage, name="co-ban"),
     path('nvl/', views.NVL),
     path('tvk/', views.tvk),
     path('BP4042/', views.BP4042),
     path('viva/', views.viva),
     path('bp/', views.bp),
     path('hg/', views.hg),
]