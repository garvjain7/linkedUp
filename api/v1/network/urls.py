from django.urls import path
from api.v1.network.views import (
    NetworkDashboardView,
    ReceivedRequestsView,
    SentRequestsView,
    AcceptRequestView,
    IgnoreRequestView,
    ConnectionsListView,
    SuggestionsView,
)

urlpatterns = [
    # Network dashboard
    path('', NetworkDashboardView.as_view()),
    
    # Connection requests
    path('requests/received/', ReceivedRequestsView.as_view()),
    path('requests/sent/', SentRequestsView.as_view()),
    
    # Request actions
    path('requests/<str:username>/accept/', AcceptRequestView.as_view()),
    path('requests/<str:username>/ignore/', IgnoreRequestView.as_view()),
    
    # Lists
    path('connections/', ConnectionsListView.as_view()),
    path('suggestions/', SuggestionsView.as_view()),
]
