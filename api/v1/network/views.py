from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class NetworkDashboardView(APIView):
    """Get network dashboard overview"""
    def get(self, request):
        # TODO: Implement get network dashboard
        pass


class ReceivedRequestsView(APIView):
    """Get received connection requests"""
    def get(self, request):
        # TODO: Implement get received requests
        pass


class SentRequestsView(APIView):
    """Get sent connection requests"""
    def get(self, request):
        # TODO: Implement get sent requests
        pass


class AcceptRequestView(APIView):
    """Accept connection request"""
    def post(self, request, username):
        # TODO: Implement accept request
        pass


class IgnoreRequestView(APIView):
    """Ignore connection request"""
    def post(self, request, username):
        # TODO: Implement ignore request
        pass


class ConnectionsListView(APIView):
    """Get all connections"""
    def get(self, request):
        # TODO: Implement get connections list
        pass


class SuggestionsView(APIView):
    """Get connection suggestions"""
    def get(self, request):
        # TODO: Implement get suggestions
        pass
