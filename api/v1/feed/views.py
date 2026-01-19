from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class MainFeedView(APIView):
    """Get main feed (cursor-based pagination)"""
    def get(self, request):
        # TODO: Implement get main feed
        pass


class FollowingFeedView(APIView):
    """Get feed from following users (cursor-based pagination)"""
    def get(self, request):
        # TODO: Implement get following feed
        pass


class TrendingFeedView(APIView):
    """Get trending feed (cursor-based pagination)"""
    def get(self, request):
        # TODO: Implement get trending feed
        pass


class UserFeedView(APIView):
    """Get specific user's feed"""
    def get(self, request, username):
        # TODO: Implement get user feed
        pass
