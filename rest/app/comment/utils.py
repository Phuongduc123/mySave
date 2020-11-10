from .serializers import CommentSerializer
from rest.app.user.serializers import UserSerializer


def custom_serializing_comment(comment):
    comment_serializer = CommentSerializer(comment)
    user_serializer = UserSerializer(comment.user.profile)
    return [{'comment': comment_serializer.data}, 
            {'user who comment': user_serializer.data}]