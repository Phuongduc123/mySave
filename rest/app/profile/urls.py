from django.conf.urls import url
from rest.app.profile.views import UserProfileView, GetProfile


urlpatterns = [
    url(r'^profile', UserProfileView.as_view()),
    url(r'^getprofile', GetProfile.as_view()),
    ]
