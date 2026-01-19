from django.urls import path
from api.v1.search.views import (
    GlobalSearchView,
    UserSearchView,
    PostSearchView,
    SearchSuggestionsView,
)

urlpatterns = [
    path('', GlobalSearchView.as_view()),
    path('users/', UserSearchView.as_view()),
    path('posts/', PostSearchView.as_view()),
    path('suggestions/', SearchSuggestionsView.as_view()),
]
