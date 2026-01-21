"""
LinkedUp - Authentication Middleware
JWT token verification and user authentication
"""

from typing import Optional, Dict, Any
from core.security.jwt import decode_token
from core.exceptions import (
    TokenExpiredException, 
    InvalidTokenException,
    AuthenticationException,
)


class AuthenticatedUser:
    """Represents an authenticated user"""
    def __init__(self, user_id: int, username: str, token_version: int):
        self.user_id = user_id
        self.username = username
        self.token_version = token_version


def extract_bearer_token(authorization_header: str) -> str:
    """
    Extract JWT token from Authorization header
    Expected format: "Bearer <token>"
    
    Raises AuthenticationException if format is invalid
    """
    if not authorization_header:
        raise AuthenticationException("Missing authorization header")
    
    parts = authorization_header.split()
    
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise AuthenticationException("Invalid authorization header format")
    
    return parts[1]


def verify_jwt_token(token: str) -> Optional[AuthenticatedUser]:
    """
    Verify JWT token and extract user information
    
    Returns AuthenticatedUser if valid
    Raises TokenExpiredException or InvalidTokenException if invalid
    
    NOTE: Does NOT expose password or sensitive information in errors
    """
    try:
        payload = decode_token(token)
        
        user_id = payload.get("sub")
        username = payload.get("username")
        token_version = payload.get("tv", 1)
        
        if not user_id or not username:
            raise InvalidTokenException()
        
        return AuthenticatedUser(
            user_id=user_id,
            username=username,
            token_version=token_version,
        )
        
    except PermissionError as e:
        # decode_token raises PermissionError for expired/invalid tokens
        if "expired" in str(e).lower():
            raise TokenExpiredException()
        raise InvalidTokenException()
    except Exception:
        # Generic catch for any other JWT errors
        raise InvalidTokenException()


def get_authenticated_user(authorization_header: Optional[str]) -> AuthenticatedUser:
    """
    Complete authentication flow:
    1. Extract bearer token from header
    2. Verify JWT token
    3. Return authenticated user
    
    Raises AuthenticationException, TokenExpiredException, or InvalidTokenException
    """
    token = extract_bearer_token(authorization_header)
    user = verify_jwt_token(token)
    return user


# ==================== Request Context Manager ====================

class RequestContext:
    """
    Request context to store authenticated user
    Thread-safe per-request context
    """
    def __init__(self):
        self.user: Optional[AuthenticatedUser] = None
        self.is_authenticated: bool = False
    
    def set_user(self, user: AuthenticatedUser) -> None:
        """Set authenticated user"""
        self.user = user
        self.is_authenticated = True
    
    def clear(self) -> None:
        """Clear context"""
        self.user = None
        self.is_authenticated = False
    
    def to_dict(self) -> Dict[str, Any]:
        """Get context as dictionary"""
        if not self.is_authenticated or not self.user:
            return {
                "is_authenticated": False,
                "user": None,
            }
        
        return {
            "is_authenticated": True,
            "user": {
                "user_id": self.user.user_id,
                "username": self.user.username,
            }
        }


# ==================== Middleware Decorator ====================

def require_auth(func):
    """
    Decorator for endpoints that require authentication
    
    Usage:
        @require_auth
        def protected_endpoint(request, context):
            # context.user is now available
            pass
    """
    def wrapper(request, context: RequestContext = None, *args, **kwargs):
        if context is None:
            context = RequestContext()
        
        try:
            auth_header = request.headers.get("Authorization")
            user = get_authenticated_user(auth_header)
            context.set_user(user)
        except (AuthenticationException, TokenExpiredException, InvalidTokenException) as e:
            # Return error response without exposing sensitive details
            return {
                "error": True,
                "message": e.message,
                "status_code": e.status_code,
            }
        
        return func(request, context, *args, **kwargs)
    
    return wrapper
