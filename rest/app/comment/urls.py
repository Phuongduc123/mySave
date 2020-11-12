from django.conf.urls import url
from .views import CommentPost, GetCommentPost
from django.views.decorators.cache import cache_page

urlpatterns = [
    url(r'^commentpostlist/$', cache_page(15 * 60)(CommentPost.as_view())),
    url(r'^getcommentpost/$', cache_page(15 * 60)(GetCommentPost.as_view())),
]