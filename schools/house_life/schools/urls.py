from django.conf.urls import url
from schools import views

urlpatterns = [
    url(r'^schools/$', views.school_list),
    url(r'^schools/(?P<pk>[0-9]+)/$', views.school_detail),
]