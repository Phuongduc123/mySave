from django.conf.urls import url
from .views import CommentPost, GetCommentPost
# from django.views.decorators.cache import cache_page

urlpatterns = [
    url(r'^commentpostlist/$', CommentPost.as_view()),
    url(r'^getcommentpost/$',GetCommentPost.as_view()),
]