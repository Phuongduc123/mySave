from django.conf.urls import url
from .views import PostPageList, UserPostList, SearchPostListByTitle, SearchPostListByUser, GetPostListByPart
from django.views.decorators.cache import cache_page

urlpatterns = [
    url(r'^postpage/$', cache_page(15 * 60)(PostPageList.as_view())),
    # url(r'^postpage/$', PostPageList.as_view()),
    url(r'^userpost/$', cache_page(15 * 60)(UserPostList.as_view())),
    url(r'^searchpost/$', cache_page(15 * 60)(SearchPostListByTitle.as_view())),
    url(r'^searchpostbyuser/$', cache_page(15 * 60)(SearchPostListByUser.as_view())),
    url(r'^getpostbyamount/$', GetPostListByPart.as_view()),
]