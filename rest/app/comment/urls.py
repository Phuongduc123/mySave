from django.conf.urls import url
from .views import CommentPostList

urlpatterns = [
    url(r'^commentpostlist/$', CommentPostList.as_view()),
]