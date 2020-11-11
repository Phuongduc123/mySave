from django.conf.urls import url
from .views import PostPageList, UserPostList, SearchPostList
from django.views.decorators.cache import cache_page

urlpatterns = [
    url(r'^postpage/$', cache_page(15 * 60)(PostPageList.as_view())),
    url(r'^userpost/$', cache_page(15 * 60)(UserPostList.as_view())),
    url(r'^searchpost/$', cache_page(15 * 60)(SearchPostList.as_view())),
]