from django.urls import path
from apps.notifications.views import (
    NotificationListView,
    UnreadCountView,
    MarkAsReadView,
    MarkAllReadView,
    NotificationSettingsView,
)

urlpatterns = [
    path('', NotificationListView.as_view()),
    path('unread-count/', UnreadCountView.as_view()),
    path('<str:notification_uid>/read/', MarkAsReadView.as_view()),
    path('mark-all-read/', MarkAllReadView.as_view()),
    path('settings/', NotificationSettingsView.as_view()),
]
