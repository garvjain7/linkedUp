from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class AnalyticsDashboardView(APIView):
    """Get analytics dashboard data"""
    def get(self, request):
        # TODO: Implement get analytics dashboard
        pass


class EngagementMetricsView(APIView):
    """Get engagement metrics"""
    def get(self, request):
        # TODO: Implement get engagement metrics
        pass


class PostAnalyticsView(APIView):
    """Get analytics for specific post"""
    def get(self, request, post_uid):
        # TODO: Implement get post analytics
        pass


class PostImpressionsView(APIView):
    """Get impressions for specific post"""
    def get(self, request, post_uid):
        # TODO: Implement get post impressions
        pass
