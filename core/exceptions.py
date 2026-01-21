"""
LinkedUp - Custom Exceptions
Secure exception handling without leaking sensitive information
"""


class LinkedUpException(Exception):
    """Base exception for LinkedUp"""
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class AuthenticationException(LinkedUpException):
    """Authentication failed - Generic message"""
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(message, status_code=401)


class TokenExpiredException(LinkedUpException):
    """JWT token has expired"""
    def __init__(self):
        super().__init__("Token expired or invalid", status_code=401)


class InvalidTokenException(LinkedUpException):
    """JWT token is invalid"""
    def __init__(self):
        super().__init__("Token expired or invalid", status_code=401)


class UnauthorizedException(LinkedUpException):
    """User not authorized for this action"""
    def __init__(self, message: str = "Not authorized"):
        super().__init__(message, status_code=403)


class ValidationException(LinkedUpException):
    """Input validation failed"""
    def __init__(self, message: str = "Invalid input"):
        super().__init__(message, status_code=400)


class ResourceNotFoundException(LinkedUpException):
    """Resource not found"""
    def __init__(self, resource: str = "Resource"):
        super().__init__(f"{resource} not found", status_code=404)


class ConflictException(LinkedUpException):
    """Conflict - Resource already exists"""
    def __init__(self, message: str = "Resource already exists"):
        super().__init__(message, status_code=409)


class InternalServerException(LinkedUpException):
    """Internal server error - Generic message"""
    def __init__(self, message: str = "Internal server error"):
        # Log actual error internally, but return generic message to client
        super().__init__(message, status_code=500)


# ==================== Exception Response Helper ====================

def format_exception_response(exception: LinkedUpException) -> dict:
    """
    Format exception into API response
    Ensures no sensitive data is leaked
    """
    return {
        "error": True,
        "message": exception.message,
        "status_code": exception.status_code,
    }
