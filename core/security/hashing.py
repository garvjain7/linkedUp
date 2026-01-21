"""
LinkedUp - Password Hashing & Verification
Centralized password security utilities
"""

import os
from passlib.hash import bcrypt
from dotenv import load_dotenv

load_dotenv()

PASSWORD_HASH_ROUNDS = int(os.getenv('PASSWORD_HASH_ROUNDS', '12'))


def hash_password(password: str) -> str:
    """
    Hash a plaintext password using bcrypt
    
    Args:
        password: Plaintext password string
    
    Returns:
        str: Hashed password
    """
    return bcrypt.hash(password, rounds=PASSWORD_HASH_ROUNDS)


def verify_password(password: str, password_hash: str) -> bool:
    """
    Verify a plaintext password against a hash
    
    Args:
        password: Plaintext password to verify
        password_hash: Hashed password from database
    
    Returns:
        bool: True if password matches, False otherwise
    """
    try:
        return bcrypt.verify(password, password_hash)
    except Exception:
        # If verification fails for any reason, return False
        return False
