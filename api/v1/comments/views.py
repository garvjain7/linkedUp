from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class CommentCreateListView(APIView):
    """Create comment or list comments"""
    def get(self, request):
        # TODO: Implement list comments
        pass
    
    def post(self, request):
        # TODO: Implement create comment
        pass


class CommentDetailView(APIView):
    """Get comment details"""
    def get(self, request, comment_uid):
        # TODO: Implement get comment detail
        pass


class DeleteCommentView(APIView):
    """Delete a comment"""
    def delete(self, request, comment_uid):
        # TODO: Implement delete comment
        pass


class CommentRepliesView(APIView):
    """Get replies to a comment"""
    def get(self, request, comment_uid):
        # TODO: Implement get comment replies
        pass
    
    def post(self, request, comment_uid):
        # TODO: Implement create reply
        pass
