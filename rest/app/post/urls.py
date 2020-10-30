from django.conf.urls import url
from .views import PostPageList, UserPostList, SearchPostList

urlpatterns = [
    url(r'^postpage/$', PostPageList.as_view()),
    url(r'^userpost/$', UserPostList.as_view()),
    url(r'^searchpost/$', SearchPostList.as_view()),
]