from rest_framework import serializers
from .models import File

class FileSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = File
        fields = ('file', 'timestamp', 'name', 'user', '_id')

    def get_name(self, obj):
        file_name = ''
        if obj.file and hasattr(obj.file, 'name'):
            file_name = obj.file.name
        return file_name
