from apps.auth.models import AccountStatusEnum


def ensure_active_user(user):
    if user.account_status != AccountStatusEnum.ACTIVE:
        raise PermissionError("User is not active")
