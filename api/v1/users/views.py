from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class UserDetailView(APIView):
    """Get user profile"""
    def get(self, request, username):
        # TODO: Implement get user detail
        pass


class UserContactInfoView(APIView):
    """Get user contact information"""
    def get(self, request, username):
        # TODO: Implement get user contact info
        pass


class UserMessageView(APIView):
    """Send message to user"""
    def post(self, request, username):
        # TODO: Implement send message
        pass


class UserFollowView(APIView):
    """Follow a user"""
    def post(self, request, username):
        # TODO: Implement follow user
        pass


class UserUnfollowView(APIView):
    """Unfollow a user"""
    def post(self, request, username):
        # TODO: Implement unfollow user
        pass


class UserBlockView(APIView):
    """Block a user"""
    def post(self, request, username):
        # TODO: Implement block user
        pass


class UserUnblockView(APIView):
    """Unblock a user"""
    def post(self, request, username):
        # TODO: Implement unblock user
        pass


class UserPostsView(APIView):
    """Get user's posts"""
    def get(self, request, username):
        # TODO: Implement get user posts
        pass


class UserFollowersView(APIView):
    """Get user's followers"""
    def get(self, request, username):
        # TODO: Implement get user followers
        pass


class UserFollowingView(APIView):
    """Get users that user is following"""
    def get(self, request, username):
        # TODO: Implement get user following
        pass


class UserRelationshipStateView(APIView):
    """Get relationship state with user"""
    def get(self, request, username):
        # TODO: Implement get relationship state
        pass
