"""
LinkedUp - Core Security Module
Centralized security utilities (JWT, hashing, authentication)
"""

from core.security.jwt import create_access_token, decode_token
from core.security.hashing import hash_password, verify_password
from core.security.authentication import (
    get_authenticated_user,
    extract_bearer_token,
    verify_jwt_token,
    AuthenticatedUser,
    RequestContext,
    require_auth,
)

__all__ = [
    # JWT
    "create_access_token",
    "decode_token",
    # Hashing
    "hash_password",
    "verify_password",
    # Authentication
    "get_authenticated_user",
    "extract_bearer_token",
    "verify_jwt_token",
    "AuthenticatedUser",
    "RequestContext",
    "require_auth",
]
