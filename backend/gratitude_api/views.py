from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import GratitudeSerializer
from .models import GratitudeDB


class GratitudeView(APIView):

    def get(self, request, pk=None):
        if pk:  
            data = GratitudeDB.objects.get(pk=pk)
            serializer = GratitudeSerializer(data)
        else:
            data = GratitudeDB.objects.all()
            serializer = GratitudeSerializer(data, many=True)
        return Response({"result": serializer.data})

    def post(self, request):
        gratitude_post = request.data
        serializer = GratitudeSerializer(data=gratitude_post)
        if serializer.is_valid(raise_exception=True):
            gratitude_post_saved = serializer.save()
        return Response({"result": f"New Post: {gratitude_post_saved.post_text}"})

    def put(self, request, pk):
        saved_gratitude_post = get_object_or_404(GratitudeDB.objects.all(), pk=pk)
        data = request.data
        serializer = GratitudeSerializer(instance=saved_gratitude_post, data=data, partial=True) #partial means not all fields are required 
        #The .is_valid() method takes an optional raise_exception flag that will cause it to raise a serializers.ValidationError exception if there are validation errors.
        if serializer.is_valid(raise_exception=True):#
            saved_gratitude_post = serializer.save()
        return Response({"result": f"{saved_gratitude_post.post_text} updated"})

    def delete(self, request, pk):
        gratitude_post = get_object_or_404(GratitudeDB.objects.all(), pk=pk)
        gratitude_post.delete()
        return Response({"result": f"Gratitude Post id {pk} deleted"},status=204)
