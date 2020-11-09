from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import FileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import File
from rest.app.user import utils 
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


class UserFileList(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(self, request, format=None):
        """
        request method is GET
        return list of json userfile has link to file
        """
        files = request.user.get_all_user_files()
        serializer = FileSerializer(files, many=True)
        
        response = {
            'success': 'true',
            'message': 'User file fetched successfully',
            'data': serializer.data,
            'profile': utils.get_user_who_send_request(request.user),
        }
        return Response(response)

    def post(self, request, format=None):
        """
        request method is POST
        must be in formdata
        request body: {"filetype": file-form-data-here}
        return json user recent post file has link to file
        """
        request.data['user'] = request.user._id
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        """
        request method is DELETE
        request body: {"id":"id-file"} should only get from userfile
        """
        file = File.objects.get(_id=request.data['id'])
        file.delete()
        response = {
            'success': 'true',
            'message': 'User file deleted successfully',
        }
        return Response(response, status=status.HTTP_204_NO_CONTENT)

class GetFile(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(self, request, format=None):
        """
        request method is GET
        request body: {"id":"file_id"}
        return json filelink that has requested id
        """
        files = File.objects.get(_id=request.data['id'])
        serializer = FileSerializer(files)
        response = {
            'success': 'true',
            'message': 'file fetched successfully',
            'data': serializer.data,
            'who wants to get file': utils.get_user_who_send_request(request.user),
        }
        return Response(response)
