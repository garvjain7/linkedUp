# core/database/transactions.py

from contextlib import contextmanager

@contextmanager
def transactional_session(db):
    try:
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
