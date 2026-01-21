from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class ImpressionsView(APIView):
    """Get profile impressions analytics"""
    def get(self, request, username):
        # TODO: Implement get impressions
        pass


class ProfileViewsView(APIView):
    """Get profile views analytics"""
    def get(self, request, username):
        # TODO: Implement get profile views
        pass


class PostEngagementView(APIView):
    """Get post engagement analytics"""
    def get(self, request, username):
        # TODO: Implement get post engagement
        pass


class FollowersGrowthView(APIView):
    """Get followers growth analytics"""
    def get(self, request, username):
        # TODO: Implement get followers growth
        pass
