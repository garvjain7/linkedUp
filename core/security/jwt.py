"""
LinkedUp - JWT Token Management
Centralized JWT token creation and verification
"""

import jwt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

JWT_ALGORITHM = os.getenv('JWT_ALGORITHM', 'HS256')
JWT_EXPIRATION_HOURS = int(os.getenv('JWT_EXPIRATION_HOURS', '24'))
JWT_EXPIRATION_MINUTES = JWT_EXPIRATION_HOURS * 60
SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')


def create_access_token(user):
    """
    Create JWT access token for user
    
    Args:
        user: User object with user_id, username, token_version
    
    Returns:
        str: Encoded JWT token
    """
    payload = {
        "sub": user.user_id,
        "username": user.username,
        "tv": user.token_version,
        "exp": datetime.utcnow() + timedelta(minutes=JWT_EXPIRATION_MINUTES),
        "iat": datetime.utcnow(),
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=JWT_ALGORITHM,
    )
    return token


def decode_token(token: str) -> dict:
    """
    Decode and verify JWT token
    
    Args:
        token: JWT token string
    
    Returns:
        dict: Token payload
    
    Raises:
        PermissionError: If token is expired or invalid
    """
    try:
        return jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[JWT_ALGORITHM],
        )
    except jwt.ExpiredSignatureError:
        raise PermissionError("Token expired")
    except jwt.InvalidTokenError:
        raise PermissionError("Invalid token")
