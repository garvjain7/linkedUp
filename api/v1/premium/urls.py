from django.urls import path
from apps.premium.views import (
    PremiumStatusView,
    UpgradeToPremiumView,
    CancelPremiumView,
    BillingHistoryView,
)

urlpatterns = [
    path('status/', PremiumStatusView.as_view()),
    path('upgrade/', UpgradeToPremiumView.as_view()),
    path('cancel/', CancelPremiumView.as_view()),
    path('history/', BillingHistoryView.as_view()),
]
