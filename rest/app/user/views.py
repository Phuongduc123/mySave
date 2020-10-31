from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest.app.user.serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer

class UserRegistrationView(CreateAPIView):

    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        """
        request method is POST
        request body: {"email":"email here", "password":"passwordhere", "profile": {name":"some stupid name"}
        return json confirmation
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = {
            'success' : 'True',
            'message': 'User registered  successfully',
            'data profile': serializer.data,
            }
        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)

class UserLoginView(CreateAPIView): #change to RetriveAPIView

    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self, request):
        """
        request method is POST
        request body: {"email":"email here", "password":"passwordhere"}
        return json that has token
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = {
            'success' : 'True',
            'message': 'User logged in  successfully',
            'email': serializer.data['email'],
            'token' : serializer.data['token'],
            }
        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)
