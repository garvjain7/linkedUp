from django.urls import path
from apps.reactions.views import (
    ReactionToggleView,
    ReactionListView,
)

urlpatterns = [
    path('toggle/', ReactionToggleView.as_view()),
    path('list/', ReactionListView.as_view()),
]
