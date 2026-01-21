from django.urls import path
from api.v1.profile.views import (
    MyProfileView,
    MyProfileContactInfoView,
    MyProfilePostsView,
    MyProfileCommentsView,
    MyProfileReactionsView,
    MyProfileMediaView,
    MyProfileAnalyticsView,
)

urlpatterns = [
    # Profile management
    path('me/<str:username>/', MyProfileView.as_view()),
    
    # Contact info
    path('me/<str:username>/contact-info/', MyProfileContactInfoView.as_view()),
    
    # Profile content
    path('me/<str:username>/posts/', MyProfilePostsView.as_view()),
    path('me/<str:username>/comments/', MyProfileCommentsView.as_view()),
    path('me/<str:username>/reactions/', MyProfileReactionsView.as_view()),
    path('me/<str:username>/media/', MyProfileMediaView.as_view()),
    
    # Analytics entry point
    path('me/<str:username>/analytics/', MyProfileAnalyticsView.as_view()),
]
