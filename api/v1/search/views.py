from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class GlobalSearchView(APIView):
    """Global search across all content"""
    def get(self, request):
        # TODO: Implement global search
        pass


class UserSearchView(APIView):
    """Search for users"""
    def get(self, request):
        # TODO: Implement user search
        pass


class PostSearchView(APIView):
    """Search for posts"""
    def get(self, request):
        # TODO: Implement post search
        pass


class SearchSuggestionsView(APIView):
    """Get search suggestions"""
    def get(self, request):
        # TODO: Implement search suggestions
        pass
