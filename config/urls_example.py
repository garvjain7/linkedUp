# config/urls.py - Add these URL patterns to your Django project

from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Skeleton Loader Pages
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('profile/', TemplateView.as_view(template_name='profile.html'), name='profile'),
    path('notifications/', TemplateView.as_view(template_name='notifications.html'), name='notifications'),
    
    # API Endpoints (to be replaced with your actual views)
    # path('api/v1/posts/', views.posts_api, name='posts_api'),
    # path('api/v1/profile/', views.profile_api, name='profile_api'),
    # path('api/v1/notifications/', views.notifications_api, name='notifications_api'),
]
