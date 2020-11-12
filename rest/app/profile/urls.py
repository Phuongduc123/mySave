from django.conf.urls import url
from rest.app.profile.views import UserProfileView, GetProfile
from django.views.decorators.cache import cache_page


urlpatterns = [
    url(r'^profile', cache_page(60 * 60)(UserProfileView.as_view())),
    url(r'^getprofile', cache_page(15 * 60)(GetProfile.as_view())),
    ]
