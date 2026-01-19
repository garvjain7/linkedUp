from django.urls import path, include

urlpatterns = [
    path('auth/', include('api.v1.auth.urls')),
    path('users/', include('api.v1.users.urls')),
    path('posts/', include('api.v1.posts.urls')),
    path('comments/', include('api.v1.comments.urls')),
    path('reactions/', include('api.v1.reactions.urls')),
    path('feed/', include('api.v1.feed.urls')),
    path('notifications/', include('api.v1.notifications.urls')),
    path('analytics/', include('api.v1.analytics.urls')),
    path('search/', include('api.v1.search.urls')),
    path('premium/', include('api.v1.premium.urls')),
]
