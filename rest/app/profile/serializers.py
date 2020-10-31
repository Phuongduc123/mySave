from rest.app.profile.models import UserProfile
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['name']