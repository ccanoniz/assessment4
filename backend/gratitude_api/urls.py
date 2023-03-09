from django.urls import path
from . import views

urlpatterns = [
    path('', views.GratitudeView.as_view(), name='gratitude_list'), # for listing and creating
    path('<int:pk>', views.GratitudeView.as_view(), name='gratitude_post_detail'), # for detail, updating, and deleting
]