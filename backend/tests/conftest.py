import sys
import os
from pathlib import Path

# Ensure the backend package is importable
root = Path(__file__).resolve().parents[1]
sys.path.append(str(root))

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.db.session import engine, Base

# Create a fresh in‑memory SQLite database for each test session
# (override the default file‑based DB)
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

@pytest.fixture
def client():
    """Fixture that provides a FastAPI test client.
    The database is already reset before any test runs.
    """
    with TestClient(app) as c:
        yield c
