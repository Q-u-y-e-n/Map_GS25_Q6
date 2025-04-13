from django.urls import path
from . import views
app_name = 'map'

urlpatterns = [
    path('', views.mapsPage),
    path('co-ban/', views.mapsPage, name="co-ban"),
]