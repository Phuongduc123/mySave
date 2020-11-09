from rest.app.user.models import User
from rest.app.user.serializers import UserSerializer

def get_user_who_send_request(user):
    profile = user.get_user_profile()
    profile_serializer = UserSerializer(profile)
    return profile_serializer.data