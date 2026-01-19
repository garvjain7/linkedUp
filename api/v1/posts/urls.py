from django.urls import path
from apps.posts.views import (
    PostCreateListView,
    PostDetailView,
    EditPostView,
    DeletePostView,
    UpdateVisibilityView,
    PostMediaView,
    PollDetailView,
    PollVoteView,
    PostStatsView,
    ReportPostView,
)

urlpatterns = [
    path('', PostCreateListView.as_view()),
    path('<str:post_uid>/', PostDetailView.as_view()),
    path('<str:post_uid>/edit/', EditPostView.as_view()),
    path('<str:post_uid>/delete/', DeletePostView.as_view()),
    path('<str:post_uid>/visibility/', UpdateVisibilityView.as_view()),
    path('<str:post_uid>/media/', PostMediaView.as_view()),
    path('<str:post_uid>/poll/', PollDetailView.as_view()),
    path('<str:post_uid>/poll/vote/', PollVoteView.as_view()),
    path('<str:post_uid>/stats/', PostStatsView.as_view()),
    path('<str:post_uid>/report/', ReportPostView.as_view()),
]
