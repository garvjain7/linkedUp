from django.urls import path
from api.v1.comments.views import (
    CommentCreateListView,
    CommentDetailView,
    DeleteCommentView,
    CommentRepliesView,
)

urlpatterns = [
    path('', CommentCreateListView.as_view()),
    path('<str:comment_uid>/', CommentDetailView.as_view()),
    path('<str:comment_uid>/delete/', DeleteCommentView.as_view()),
    path('<str:comment_uid>/replies/', CommentRepliesView.as_view()),
]
