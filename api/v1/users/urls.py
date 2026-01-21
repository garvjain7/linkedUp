from django.urls import path
from api.v1.users.views import (
    UserDetailView,
    UserContactInfoView,
    UserMessageView,
    UserFollowView,
    UserUnfollowView,
    UserBlockView,
    UserUnblockView,
    UserPostsView,
    UserFollowersView,
    UserFollowingView,
    UserRelationshipStateView,
)

urlpatterns = [
    # User detail & contact
    path('<str:username>/', UserDetailView.as_view()),
    path('<str:username>/contact-info/', UserContactInfoView.as_view()),
    
    # Messaging
    path('<str:username>/message/', UserMessageView.as_view()),
    
    # Follow/Unfollow
    path('<str:username>/follow/', UserFollowView.as_view()),
    path('<str:username>/unfollow/', UserUnfollowView.as_view()),
    
    # Block/Unblock
    path('<str:username>/block/', UserBlockView.as_view()),
    path('<str:username>/unblock/', UserUnblockView.as_view()),
    
    # User content
    path('<str:username>/posts/', UserPostsView.as_view()),
    path('<str:username>/followers/', UserFollowersView.as_view()),
    path('<str:username>/following/', UserFollowingView.as_view()),
    
    # Relationship
    path('<str:username>/relationship-state/', UserRelationshipStateView.as_view()),
]
