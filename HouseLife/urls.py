"""HouseLife URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from suburbs import views

urlpatterns = [
    url(r'^suburbs/$', views.suburb_list),
    url(r'^suburbs/(?P<name>[a-zA-Z_]+)$', views.suburb_detail),
    url(r'^schools/$', views.school_list),
    url(r'^schools/(?P<name>[a-zA-Z_]+)$', views.school_detail),
    url(r'^schoolTable/(?P<name>[a-zA-Z_]+)$', views.school_table),
    url(r'^hospitalsTable/(?P<name>[a-zA-Z_]+)$', views.hospitals_table),
    url(r'^ageChart/(?P<name>[a-zA-Z_]+)$', views.age_chart),
    url(r'^suburbImageCarousel/(?P<name>[a-zA-Z_]+)$', views.suburb_image_carousel),
]
urlpatterns += staticfiles_urlpatterns()
urlpatterns = format_suffix_patterns(urlpatterns)