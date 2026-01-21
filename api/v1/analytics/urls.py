from django.urls import path
from api.v1.analytics.views import (
    ImpressionsView,
    ProfileViewsView,
    PostEngagementView,
    FollowersGrowthView,
)

urlpatterns = [
    # Analytics endpoints following /me/<username>/analytics structure
    path('me/<str:username>/impressions/', ImpressionsView.as_view()),
    path('me/<str:username>/profile-views/', ProfileViewsView.as_view()),
    path('me/<str:username>/post-engagement/', PostEngagementView.as_view()),
    path('me/<str:username>/followers-growth/', FollowersGrowthView.as_view()),
]
