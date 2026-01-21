from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class MyProfileView(APIView):
    """Get/Update own profile"""
    def get(self, request, username):
        # TODO: Implement get own profile
        pass
    
    def patch(self, request, username):
        # TODO: Implement update own profile
        pass


class MyProfileContactInfoView(APIView):
    """Get/Update own contact information"""
    def get(self, request, username):
        # TODO: Implement get own contact info
        pass
    
    def patch(self, request, username):
        # TODO: Implement update own contact info
        pass


class MyProfilePostsView(APIView):
    """Get own posts"""
    def get(self, request, username):
        # TODO: Implement get own posts
        pass


class MyProfileCommentsView(APIView):
    """Get own comments"""
    def get(self, request, username):
        # TODO: Implement get own comments
        pass


class MyProfileReactionsView(APIView):
    """Get own reactions"""
    def get(self, request, username):
        # TODO: Implement get own reactions
        pass


class MyProfileMediaView(APIView):
    """Get own media"""
    def get(self, request, username):
        # TODO: Implement get own media
        pass


class MyProfileAnalyticsView(APIView):
    """Analytics entry point - redirects to analytics module"""
    def get(self, request, username):
        # TODO: Implement analytics entry point
        pass
