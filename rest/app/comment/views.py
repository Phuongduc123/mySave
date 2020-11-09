from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest.app.post.models import Post 
from rest.app.user import utils 
from .models import Comment
from .serializers import CommentSerializer


class CommentPostList(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(self, request, format=None):
        """
        request method GET
        request body {"id":"post-id"}
        """
        comment = Comment.objects.filter(post=request.data['id'])
        serializer = CommentSerializer(comment, many=True)
        response = {
            'success': 'true',
            'message': 'Comment Post Fetched succesfully',
            'all post comment here': serializer.data,
            'who is sending the request': utils.get_user_who_send_request(request.user),
        }
        return Response(response)

    def post(self, request, format=None):
        """
        request method POST
        request body {"content:"some content here","post":"post-id"}
        """
        request.data['user'] = request.user._id
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)