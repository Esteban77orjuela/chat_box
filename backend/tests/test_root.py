import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    """Comprueba que la ruta raíz devuelve el mensaje de bienvenida."""
    response = client.get("/")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data.get("message") == "Welcome to AI Chat API"
    assert json_data.get("status") == "online"
