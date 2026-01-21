# core/database/base.py

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv

load_dotenv()

# Build database URL from environment variables
DATABASE_ENGINE = os.getenv('DATABASE_ENGINE', 'postgresql+psycopg2')
DATABASE_USER = os.getenv('DATABASE_USER', 'postgres')
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD', 'postgres')
DATABASE_HOST = os.getenv('DATABASE_HOST', 'localhost')
DATABASE_PORT = os.getenv('DATABASE_PORT', '5432')
DATABASE_NAME = os.getenv('DATABASE_NAME', 'linkedup')

DATABASE_URL = (
    f"{DATABASE_ENGINE}://"
    f"{DATABASE_USER}:{DATABASE_PASSWORD}@"
    f"{DATABASE_HOST}:{DATABASE_PORT}/"
    f"{DATABASE_NAME}"
)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    future=True,
)

Base = declarative_base()
