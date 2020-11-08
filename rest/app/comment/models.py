from django.db import models
from django.conf import settings
import uuid
from rest.app.post.models import Post

# Create your models here.
class Comment(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=200)

    def __str__(self):
        return str(self.content)

    class Meta:
        db_table = "comment"
        ordering = ["-timestamp"]