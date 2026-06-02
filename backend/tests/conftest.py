import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture
def client():
    """
    Fixture que provee un cliente de pruebas para nuestra app FastAPI.
    Esto simula un navegador o cliente web sin tener que prender el servidor real.
    """
    with TestClient(app) as c:
        yield c
