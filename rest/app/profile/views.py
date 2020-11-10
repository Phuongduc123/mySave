from rest_framework.views import APIView
from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest.app.profile.serializers import UserSerializer
from rest.app.profile.models import UserProfile
from rest.app.user import utils 

class UserProfileView(APIView):

    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(self, request):
        """
        request method is GET
        """
        try:
            status_code = status.HTTP_200_OK
            response = {
                'success': 'true',
                'message': 'User profile fetched successfully',
                'data': utils.get_user_who_send_request(request.user)
                }

        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'message': 'User does not exists',
                'error': str(e)
                }
        return Response(response, status=status_code)

    def put(self, request):
        """
        request method PUT
        request body: {"name":"change name here"}
        """
        user_profile = UserProfile.objects.get(user=request.user)
        serializer = UserSerializer(user_profile, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetProfile(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def post(self, request):
        """
        request method is POST
        request body: {"id":"user-id"}
        return json of profile user with that id
        """
        try:
            user_profile = UserProfile.objects.get(user=request.data['id'])
            status_code = status.HTTP_200_OK
            response = {
                'success': 'true',
                'message': 'User profile fetched successfully',
                'data': {
                    'name': user_profile.name,
                    }
                }

        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'message': 'User does not exists',
                'error': str(e)
                }
        return Response(response, status=status_code)
