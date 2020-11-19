from django.db import models
import uuid
from django.conf import settings
from rest.app.file.models import File

# Create your models here.
class Post(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, db_index=True)
    title = models.CharField(max_length=50)
    file = models.ForeignKey(File, on_delete=models.CASCADE, default=0, related_name='posts',) 
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts',) 
    timestamp = models.DateTimeField(auto_now_add=True)
    vote = models.IntegerField(default=0)

    def __str__(self):
        return str(self.title)

    def get_comment_count(self):
        return self.comments.count()

    class Meta:
        db_table = "post"
        ordering = ["-timestamp"]