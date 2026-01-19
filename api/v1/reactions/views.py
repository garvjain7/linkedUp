from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class ReactionToggleView(APIView):
    """Toggle reaction on post/comment"""
    def post(self, request):
        # TODO: Implement reaction toggle
        # Expected payload: {
        #   "target_type": "post" | "comment",
        #   "target_uid": "...",
        #   "reaction": "like"
        # }
        pass


class ReactionListView(APIView):
    """List reactions (internal/debugging/analytics)"""
    def get(self, request):
        # TODO: Implement list reactions
        pass
