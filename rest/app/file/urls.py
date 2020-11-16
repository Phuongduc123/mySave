from django.conf.urls import url
from .views import UserFileList, GetFile
from django.views.decorators.cache import cache_page

urlpatterns = [
    url(r'^userfile/$', cache_page(60 * 60)(UserFileList.as_view())),
    url(r'^getfile/$', cache_page(15 * 60)(GetFile.as_view())),
]