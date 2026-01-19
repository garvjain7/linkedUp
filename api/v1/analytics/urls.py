from django.urls import path
from api.v1.analytics.views import (
    AnalyticsDashboardView,
    EngagementMetricsView,
    PostAnalyticsView,
    PostImpressionsView,
)

urlpatterns = [
    path('dashboard/', AnalyticsDashboardView.as_view()),
    path('engagement/', EngagementMetricsView.as_view()),
    path('posts/<str:post_uid>/', PostAnalyticsView.as_view()),
    path('posts/<str:post_uid>/impressions/', PostImpressionsView.as_view()),
]
