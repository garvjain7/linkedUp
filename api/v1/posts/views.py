from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class PostCreateListView(APIView):
    """Create post or list posts"""
    def get(self, request):
        # TODO: Implement list posts
        pass
    
    def post(self, request):
        # TODO: Implement create post
        pass


class PostDetailView(APIView):
    """Get post details"""
    def get(self, request, post_uid):
        # TODO: Implement get post detail
        pass


class EditPostView(APIView):
    """Edit a post"""
    def put(self, request, post_uid):
        # TODO: Implement edit post
        pass


class DeletePostView(APIView):
    """Delete a post"""
    def delete(self, request, post_uid):
        # TODO: Implement delete post
        pass


class UpdateVisibilityView(APIView):
    """Update post visibility"""
    def put(self, request, post_uid):
        # TODO: Implement update post visibility
        pass


class PostMediaView(APIView):
    """Upload media to post"""
    def post(self, request, post_uid):
        # TODO: Implement post media upload
        pass


class PollDetailView(APIView):
    """Get poll details"""
    def get(self, request, post_uid):
        # TODO: Implement get poll detail
        pass


class PollVoteView(APIView):
    """Vote on a poll"""
    def post(self, request, post_uid):
        # TODO: Implement poll vote
        pass


class PostStatsView(APIView):
    """Get post statistics"""
    def get(self, request, post_uid):
        # TODO: Implement get post stats
        pass


class ReportPostView(APIView):
    """Report a post"""
    def post(self, request, post_uid):
        # TODO: Implement report post
        pass
