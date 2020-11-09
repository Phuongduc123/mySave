import uuid
from django.db import models
from django.conf import settings


class UserProfile(models.Model):

    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, db_index=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=50, unique=False)
    def __str__(self):
        return self.name

    class Meta:
        '''
        to set table name in database
        '''
        db_table = "profile"
