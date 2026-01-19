from django.urls import path
from apps.auth.views import (
    RegisterView,
    LoginView,
    LogoutView,
    RefreshTokenView,
    VerifyEmailView,
    ResendVerificationView,
    PasswordResetView,
    PasswordResetConfirmView,
    PasswordChangeView,
    DeactivateAccountView,
)

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('refresh/', RefreshTokenView.as_view()),
    path('verify-email/', VerifyEmailView.as_view()),
    path('verify-email/resend/', ResendVerificationView.as_view()),
    path('password/reset/', PasswordResetView.as_view()),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view()),
    path('password/change/', PasswordChangeView.as_view()),
    path('deactivate/', DeactivateAccountView.as_view()),
]
