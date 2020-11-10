from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .models import Post
from rest.app.profile.models import UserProfile 
from rest.app.user.models import User 
from rest.app.user import utils 
from rest.app.user.serializers import UserSerializer
from rest.app.file.models import File 
from rest.app.file.serializers import FileSerializer


'''
return a serialized post with profile user 
'''
def custom_serializing_post(post):
    post_serializer = PostSerializer(post)
    file_serializer = FileSerializer(post.file)
    user_serializer = UserSerializer(post.user.profile)
    return [{'post': post_serializer.data}, 
            {'file attatched to post': file_serializer.data}, 
            {'person who post': user_serializer.data}]
'''
return a serializer user profile
'''
def get_user_who_send_request(user):
    profile = user.get_user_profile()
    profile_serializer = UserSerializer(profile)
    return profile_serializer.data

class PostPageList(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(self, request, format=None):
        """
        request method is GET
        return list of json all posts and each post has file id
        """
        result = []
        posts = Post.objects.select_related('file', 'user')[:100]
        for post in posts:
            result.append(custom_serializing_post(post))
        response = {
            'success': 'true',
            'message': 'Post Page is here',
            'news': result,
            'who is sending request': utils.get_user_who_send_request(request.user),
        }
        return Response(response)

    def post(self, request, format=None):
        """
        request method is POST
        request body: {"title":"sample title here","file":"file_id"} file id here is the file owned by user
        return json has link to file
        """
        request.data['user'] = request.user._id
        file_id = request.data['file']
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # publish the file
            file = File.objects.get(_id=file_id)
            file.published = True
            file.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        """
        request method is DELETE
        request body: {"id":"post-id"} should only get from userpost
        """
        post = Post.objects.get(_id=request.data['id'])
        post.delete()
        response = {
            'success': 'true',
            'message': 'User post deleted successfully',
        }
        return Response(response, status=status.HTTP_204_NO_CONTENT)

class UserPostList(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(self, request, format=None):
        """
        request method is GET
        return json post that a user has shared
        """
        posts = request.user.get_all_user_posts()
        result = []
        for post in posts:
            result.append(custom_serializing_post(post))
        response = {
            'success': 'true',
            'message': 'Post Page is here',
            'data': result,
            'who is sending the request': get_user_who_send_request(request.user)
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
        result = []
        for post in posts:
            result.append(custom_serializing_post(post))
        response = {
            'success': 'true',
            'message': 'Post Page Search is here',
            'data': result,
            'who is searching heh?': get_user_who_send_request(request.user)
        }
        return Response(response)