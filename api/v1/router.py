from django.urls import path, include

urlpatterns = [
    # User profiles (other users)
    path('users/', include('api.v1.users.urls')),
    
    # Own profile management
    path('profile/', include('api.v1.profile.urls')),
    
    # Network/Connections
    path('network/', include('api.v1.network.urls')),
    
    # Analytics (accessible from profile analytics endpoint)
    path('analytics/', include('api.v1.analytics.urls')),
    
    # Other modules
    path('posts/', include('api.v1.posts.urls')),
    path('comments/', include('api.v1.comments.urls')),
    path('reactions/', include('api.v1.reactions.urls')),
    path('feed/', include('api.v1.feed.urls')),
    path('notifications/', include('api.v1.notifications.urls')),
    path('search/', include('api.v1.search.urls')),
    path('premium/', include('api.v1.premium.urls')),
    path('auth/', include('api.v1.auth.urls')),
]
