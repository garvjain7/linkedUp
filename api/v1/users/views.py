from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class MyProfileView(APIView):
    """Get current user's profile"""
    def get(self, request):
        # TODO: Implement get current user profile
        pass


class EditMyProfileView(APIView):
    """Edit current user's profile"""
    def put(self, request):
        # TODO: Implement edit current user profile
        pass


class UserSettingsView(APIView):
    """Get/update user settings"""
    def get(self, request):
        # TODO: Implement get user settings
        pass
    
    def put(self, request):
        # TODO: Implement update user settings
        pass


class PrivacySettingsView(APIView):
    """Get/update privacy settings"""
    def get(self, request):
        # TODO: Implement get privacy settings
        pass
    
    def put(self, request):
        # TODO: Implement update privacy settings
        pass


class ProfileStrengthView(APIView):
    """Get profile strength score"""
    def get(self, request):
        # TODO: Implement get profile strength
        pass


class PublicUserView(APIView):
    """Get public user info"""
    def get(self, request, username):
        # TODO: Implement get public user info
        pass


class PublicProfileView(APIView):
    """Get public user profile"""
    def get(self, request, username):
        # TODO: Implement get public user profile
        pass


class FollowUserView(APIView):
    """Follow a user"""
    def post(self, request, username):
        # TODO: Implement follow user
        pass


class UnfollowUserView(APIView):
    """Unfollow a user"""
    def post(self, request, username):
        # TODO: Implement unfollow user
        pass


class MuteUserView(APIView):
    """Mute a user"""
    def post(self, request, username):
        # TODO: Implement mute user
        pass


class UnmuteUserView(APIView):
    """Unmute a user"""
    def post(self, request, username):
        # TODO: Implement unmute user
        pass


class BlockUserView(APIView):
    """Block a user"""
    def post(self, request, username):
        # TODO: Implement block user
        pass


class UnblockUserView(APIView):
    """Unblock a user"""
    def post(self, request, username):
        # TODO: Implement unblock user
        pass


class SendConnectionRequestView(APIView):
    """Send connection request"""
    def post(self, request, username):
        # TODO: Implement send connection request
        pass


class PendingConnectionsView(APIView):
    """Get pending connection requests"""
    def get(self, request):
        # TODO: Implement get pending connections
        pass


class AcceptConnectionView(APIView):
    """Accept connection request"""
    def post(self, request, username):
        # TODO: Implement accept connection
        pass


class RejectConnectionView(APIView):
    """Reject connection request"""
    def post(self, request, username):
        # TODO: Implement reject connection
        pass


class FollowersListView(APIView):
    """Get user's followers"""
    def get(self, request, username):
        # TODO: Implement get followers list
        pass


class FollowingListView(APIView):
    """Get users that user is following"""
    def get(self, request, username):
        # TODO: Implement get following list
        pass


class ConnectionsListView(APIView):
    """Get user's connections"""
    def get(self, request, username):
        # TODO: Implement get connections list
        pass
