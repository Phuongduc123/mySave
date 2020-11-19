from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest.app.user import utils as userUtils
from .models import Post
from . import utils as postUtils
from .serializers import PostSerializer
from rest.app.file.models import File 



class PostPageList(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(self, request, format=None):
        """
        request method is GET
        return list of json all posts and each post has file id
        """
        result = []
        posts = Post.objects.select_related('file', 'user')
        for post in posts:
            result.append(postUtils.custom_serializing_post(post))
        response = {
            'success': 'true',
            'message': 'Post Page is here',
            'news': result,
            'who is sending request': userUtils.get_user_who_send_request(request.user),
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
            result.append(postUtils.custom_serializing_post(post))
        response = {
            'success': 'true',
            'message': 'Post Page is here',
            'data': result,
            'who is sending the request': userUtils.get_user_who_send_request(request.user)
        }
        return Response(response)

class SearchPostListByTitle(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def post(self, request, format=None):
        """
        request method is POST
        request body: {"search":"search string"}
        return json post that a user has shared
        """
        posts = Post.objects.filter(title__contains=request.data['search'])
        result = []
        for post in posts:
            result.append(postUtils.custom_serializing_post(post))
        response = {
            'success': 'true',
            'message': 'Post Page Search is here',
            'data': result,
            'who is searching heh?': userUtils.get_user_who_send_request(request.user)
        }
        return Response(response)

class SearchPostListByUser(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def post(self, request, format=None):
        """
        request method is POST
        request body: {"search":"search string"}
        return json post that a user has shared
        """
        from rest.app.profile.models import UserProfile
        users = UserProfile.objects.filter(name__contains=request.data['search'])
        posts = Post.objects.filter(user__profile__in=users)
        result = []
        for post in posts:
            result.append(postUtils.custom_serializing_post(post))
        response = {
            'success': 'true',
            'message': 'Post Page Search is here',
            'data': result,
            'who is searching heh?': userUtils.get_user_who_send_request(request.user)
        }
        return Response(response)

class GetPostListByPart(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def post(self, request, format=None):
        """
        request method is POST
        request body: {"start":"number", "amounts":"number", "vote": "1", "search":"search"}
        return json post that a user has shared
        """
        result = []
        posts = Post.objects.all()
        start = int(request.data['start'])
        end = int(request.data['start']) + int(request.data['number'])

        if 'vote' in request.data:    
            posts = posts.order_by('-vote')
        if 'search' in request.data:
            posts = posts.filter(title__contains=request.data['search'])
        posts = posts[start:end]

        for post in posts:
            result.append(postUtils.custom_serializing_post(post))
        response = {
            'success': 'true',
            'message': 'Post Page is here',
            'news': result,
            'who is sending request': userUtils.get_user_who_send_request(request.user),
        }
        return Response(response)

class VotePost(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def post(self, request, format=None):
        """
        request method is POST
        request body : {"post": "id post"}
        """
        post = Post.objects.get(_id=request.data['post'])
        post.vote+=1
        post.save()
        serializer = PostSerializer(post)
        return Response(serializer.data)