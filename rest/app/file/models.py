from django.db import models
from django.conf import settings
import uuid

class File(models.Model):

    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = models.FileField(blank=False, null=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.file.name)

    class Meta:
        db_table = "file"
        ordering = ["timestamp"]
