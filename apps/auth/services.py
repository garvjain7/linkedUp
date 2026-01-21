from sqlalchemy.orm import Session
from datetime import datetime

from apps.auth.models import User, AccountStatusEnum
from core.security import hash_password, verify_password, create_access_token


# ---------------------------
# Auth Services
# ---------------------------

def register_user(db: Session, username: str, email: str, password: str) -> User:
    existing = (
        db.query(User)
        .filter((User.username == username) | (User.email == email))
        .first()
    )
    if existing:
        raise ValueError("Username or email already exists")

    user = User(
        username=username,
        email=email,
        password_hash=hash_password(password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, identifier: str, password: str):
    """
    identifier = username OR email
    """
    user = (
        db.query(User)
        .filter((User.username == identifier) | (User.email == identifier))
        .first()
    )

    if not user:
        raise ValueError("Invalid credentials")

    if user.account_status != AccountStatusEnum.ACTIVE:
        raise PermissionError("Account is not active")

    if not verify_password(password, user.password_hash):
        raise ValueError("Invalid credentials")

    user.last_login_at = datetime.utcnow()
    db.commit()

    token = create_access_token(user)

    return {
        "access_token": token,
        "user_id": user.user_id,
        "username": user.username,
    }