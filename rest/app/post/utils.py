from .serializers import PostSerializer
from rest.app.user.serializers import UserSerializer
from rest.app.file.serializers import FileSerializer

'''
return a post that has bonus json file and json profile-user
'''
def custom_serializing_post(post):
    post_serializer = PostSerializer(post)
    file_serializer = FileSerializer(post.file)
    user_serializer = UserSerializer(post.user.profile)
    return [{'post': post_serializer.data}, 
            {'file attatched to post': file_serializer.data}, 
            {'person who post': user_serializer.data}]