from sqlalchemy import (
    Column, Integer, String, Text, Enum, TIMESTAMP
)
from sqlalchemy.sql import func
from core.database.base import Base
import enum


class AccountStatusEnum(str, enum.Enum):
    ACTIVE = "ACTIVE"
    BLOCKED = "BLOCKED"
    BANNED = "BANNED"
    DELETED = "DELETED"


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)

    account_status = Column(
        Enum(AccountStatusEnum, name="account_status_enum"),
        default=AccountStatusEnum.ACTIVE,
        nullable=False,
    )

    token_version = Column(Integer, default=1, nullable=False)
    last_login_at = Column(TIMESTAMP)

    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())