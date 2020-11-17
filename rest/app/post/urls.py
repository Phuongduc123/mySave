from django.conf.urls import url
from .views import PostPageList, UserPostList, SearchPostListByTitle, SearchPostListByUser
from django.views.decorators.cache import cache_page

urlpatterns = [
    url(r'^postpage/$', PostPageList.as_view()),
    # url(r'^postpage/$', PostPageList.as_view()),
    url(r'^userpost/$', UserPostList.as_view()),
    url(r'^searchpost/$', SearchPostListByTitle.as_view()),
    url(r'^searchpostbyuser/$', SearchPostListByUser.as_view()),
]