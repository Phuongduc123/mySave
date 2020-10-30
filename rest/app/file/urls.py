from django.conf.urls import url
from .views import UserFileList, GetFile

urlpatterns = [
    url(r'^userfile/$', UserFileList.as_view()),
    url(r'^getfile/$', GetFile.as_view()),
]