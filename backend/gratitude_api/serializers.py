from rest_framework import serializers
from .models import GratitudeDB


class GratitudeSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    post_text = serializers.CharField(style={'base_template': 'textarea.html'})
    photo = serializers.CharField(max_length=255)
    video = serializers.CharField(max_length=255)
    giphy = serializers.CharField(max_length=255)
    date_created = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return GratitudeDB.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.post_text = validated_data.get('post_text', instance.post_text)
        instance.photo = validated_data.get('photo', instance.photo)
        instance.giphy = validated_data.get('giphy', instance.giphy)
        instance.date_created = validated_data.get('date_created', instance.date_created)
        instance.save()
        return instance