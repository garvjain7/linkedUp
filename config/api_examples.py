"""
API View Examples for Skeleton Loader Pages

This file shows you how to structure your API endpoints to work with the skeleton loader system.
Copy these functions into your app views and integrate with your database models.
"""

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json


# ============================================================================
# POSTS API EXAMPLE
# ============================================================================

@require_http_methods(["GET"])
def posts_api(request):
    """
    Fetch posts for feed
    
    Expected response format:
    {
        "posts": [
            {
                "id": 1,
                "author": "John Doe",
                "avatar": "JD",
                "time": "2 hours ago",
                "content": "Post content here",
                "image": null or "image_url"
            },
            ...
        ]
    }
    """
    try:
        # TODO: Query your Post model from database
        # Example:
        # from apps.posts.models import Post
        # posts = Post.objects.all().order_by('-created_at')[:20]
        # posts_data = [{
        #     'id': post.id,
        #     'author': post.author.first_name + ' ' + post.author.last_name,
        #     'avatar': post.author.first_name[0] + post.author.last_name[0],
        #     'time': post.get_relative_time(),
        #     'content': post.content,
        #     'image': post.image.url if post.image else None,
        # } for post in posts]
        
        posts_data = []  # Replace with actual data
        
        return JsonResponse({
            'success': True,
            'posts': posts_data
        }, safe=False)
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)


# ============================================================================
# PROFILE API EXAMPLE
# ============================================================================

@require_http_methods(["GET"])
def profile_api(request):
    """
    Fetch user profile
    
    Expected response format:
    {
        "profile": {
            "username": "John Doe",
            "initials": "JD",
            "title": "Senior Developer",
            "location": "San Francisco, CA",
            "bio": "Passionate about...",
            "stats": {
                "views": "2,340",
                "impressions": "12,560",
                "followers": "89"
            }
        }
    }
    """
    try:
        # TODO: Query your User model from database
        # Example:
        # from django.contrib.auth.models import User
        # user = request.user  # or get specific user
        # profile_data = {
        #     'username': user.first_name + ' ' + user.last_name,
        #     'initials': user.first_name[0] + user.last_name[0],
        #     'title': user.profile.job_title,
        #     'location': user.profile.location,
        #     'bio': user.profile.bio,
        #     'stats': {
        #         'views': user.profile.profile_views,
        #         'impressions': user.profile.post_impressions,
        #         'followers': user.followers.count(),
        #     }
        # }
        
        profile_data = {}  # Replace with actual data
        
        return JsonResponse({
            'success': True,
            'profile': profile_data
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)


# ============================================================================
# NOTIFICATIONS API EXAMPLE
# ============================================================================

@require_http_methods(["GET"])
def notifications_api(request):
    """
    Fetch user notifications
    
    Expected response format:
    {
        "notifications": [
            {
                "id": 1,
                "avatar": "JS",
                "name": "Jane Smith",
                "action": "liked your post",
                "time": "2 hours ago"
            },
            ...
        ]
    }
    """
    try:
        # TODO: Query your Notification model from database
        # Example:
        # from apps.notifications.models import Notification
        # notifications = Notification.objects.filter(
        #     recipient=request.user
        # ).order_by('-created_at')[:20]
        # notif_data = [{
        #     'id': notif.id,
        #     'avatar': notif.actor.first_name[0] + notif.actor.last_name[0],
        #     'name': notif.actor.first_name + ' ' + notif.actor.last_name,
        #     'action': notif.get_action_display(),
        #     'time': notif.get_relative_time(),
        # } for notif in notifications]
        
        notifications_data = []  # Replace with actual data
        
        return JsonResponse({
            'success': True,
            'notifications': notifications_data
        }, safe=False)
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)


# ============================================================================
# HOW TO INTEGRATE
# ============================================================================

"""
1. Create these views in your app views.py or api/views.py
   
   Example structure:
   apps/posts/views.py
   apps/users/views.py
   apps/notifications/views.py

2. Create urls.py in your app:
   
   # apps/posts/urls.py
   from django.urls import path
   from . import views
   
   urlpatterns = [
       path('', views.posts_api, name='posts_api'),
   ]

3. Include in main config/urls.py:
   
   from apps.posts.views import posts_api
   from apps.users.views import profile_api
   from apps.notifications.views import notifications_api
   
   urlpatterns = [
       path('api/v1/posts/', posts_api, name='posts_api'),
       path('api/v1/profile/', profile_api, name='profile_api'),
       path('api/v1/notifications/', notifications_api, name='notifications_api'),
   ]

4. Update the JavaScript fetch URLs in:
   - static/js/feed.js
   - static/js/profile.js
   - static/js/notifications.js
   
   Example (feed.js):
   async fetchPosts() {
       const response = await fetch(this.apiEndpoint);
       if (!response.ok) throw new Error('Failed to fetch');
       const data = await response.json();
       return data.posts;
   }

5. Test by navigating to each page in your browser
   - You should see skeleton loader immediately
   - After API response, real content should appear
"""
