from django.urls import path
from api.v1.feed.views import (
    MainFeedView,
    FollowingFeedView,
    TrendingFeedView,
    UserFeedView,
)

urlpatterns = [
    path('', MainFeedView.as_view()),
    path('following/', FollowingFeedView.as_view()),
    path('trending/', TrendingFeedView.as_view()),
    path('user/<str:username>/', UserFeedView.as_view()),
]
