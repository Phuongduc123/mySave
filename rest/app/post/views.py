from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .models import Post
from rest.app.profile.models import UserProfile 
from rest.app.user.serializers import UserSerializer
from rest.app.file.models import File 
from rest.app.file.serializers import FileSerializer


class PostPageList(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(self, request, format=None):
        """
        request method is GET
        return list of json all posts and each post has file id
        """

        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)

        profile = UserProfile.objects.get(user=request.user)
        profile_serializer = UserSerializer(profile)

        file = File.objects.all()
        file_serializer = FileSerializer(file, many=True)

        response = {
            'success': 'true',
            'message': 'Post Page is here',
            'data': serializer.data,
            'who is sending request': profile_serializer.data,
            # 'file': file_serializer.data
        }
        return Response(response)

    def post(self, request, format=None):
        """
        request method is POST
        request body: {"title":"sample title here","file":"file_id"} file id here is the file owned by user
        return json has link to file
        """
        request.data['user'] = request.user._id
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserPostList(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(self, request, format=None):
        """
        request method is GET
        return json post that a user has shared
        """
        posts = Post.objects.filter(user=request.user)
        serializer = PostSerializer(posts, many=True)

        profile = UserProfile.objects.get(user=request.user)
        profile_serializer = UserSerializer(profile)

        response = {
            'success': 'true',
            'message': 'Post Page is here',
            'data': serializer.data,
            'profile': profile_serializer.data
        }
        return Response(response)

class SearchPostList(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(self, request, format=None):
        """
        request method is GET
        request body: {"search":"search string"}
        return json post that a user has shared
        """
        posts = Post.objects.filter(title__contains=request.data['search'])
        serializer = PostSerializer(posts, many=True)

        profile = UserProfile.objects.get(user=request.user)
        profile_serializer = UserSerializer(profile)

        response = {
            'success': 'true',
            'message': 'Post Page is here',
            'data': serializer.data,
            'who is searching heh?': profile_serializer.data
        }
        return Response(response)