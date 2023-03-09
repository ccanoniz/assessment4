from django.db import models
from django.utils import timezone

class GratitudeDB(models.Model):
    post_text = models.TextField()
    photo = models.CharField(max_length=255, blank=True)
    video = models.CharField(max_length=255, blank=True)
    giphy = models.CharField(max_length=255, blank=True)
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"ID: self.id , photo: self.photo. video: self.video, giphy: self.giphy, date: self.date_created"


