# core/database/session.py

from sqlalchemy.orm import sessionmaker
from core.database.base import engine

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False,
    future=True,
)

def get_db_session():
    """
    Yields a database session.
    Caller MUST handle commit/rollback.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
