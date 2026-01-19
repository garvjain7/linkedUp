from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class NotificationListView(APIView):
    """Get notifications list"""
    def get(self, request):
        # TODO: Implement get notifications
        pass


class UnreadCountView(APIView):
    """Get unread notifications count"""
    def get(self, request):
        # TODO: Implement get unread count
        pass


class MarkAsReadView(APIView):
    """Mark notification as read"""
    def post(self, request, notification_uid):
        # TODO: Implement mark as read
        pass


class MarkAllReadView(APIView):
    """Mark all notifications as read"""
    def post(self, request):
        # TODO: Implement mark all as read
        pass


class NotificationSettingsView(APIView):
    """Get/update notification settings"""
    def get(self, request):
        # TODO: Implement get notification settings
        pass
    
    def put(self, request):
        # TODO: Implement update notification settings
        pass
