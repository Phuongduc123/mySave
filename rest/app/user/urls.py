from django.conf.urls import url
from rest.app.user.views import UserRegistrationView
from rest.app.user.views import UserLoginView
# from rest.app.user.views import UserProfileCreateView

urlpatterns = [
	# url(r'^createprofile', UserProfileCreateView.as_view()),
    url(r'^signup', UserRegistrationView.as_view()),
    url(r'^signin', UserLoginView.as_view()),
    ]

