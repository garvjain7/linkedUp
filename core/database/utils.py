# core/database/utils.py

from sqlalchemy.exc import NoResultFound

def get_one_or_none(query):
    try:
        return query.one()
    except NoResultFound:
        return None
