import pytest
from fastapi.testclient import TestClient
from app.main import socket_app

client = TestClient(socket_app)

@pytest.fixture(scope="module")
def test_user_data():
    return {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "StrongP@ssw0rd"
    }

def test_register_user(test_user_data):
    response = client.post("/api/v1/auth/register", json=test_user_data)
    assert response.status_code == 200, response.text
    data = response.json()
    assert data["username"] == test_user_data["username"]
    assert data["email"] == test_user_data["email"]
    # password should not be returned
    assert "hashed_password" not in data

def test_login_user(test_user_data):
    # Ensure the user is registered (idempotent)
    client.post("/api/v1/auth/register", json=test_user_data)
    login_data = {"username": test_user_data["username"], "password": test_user_data["password"]}
    response = client.post("/api/v1/auth/login", data=login_data)
    assert response.status_code == 200, response.text
    token_data = response.json()
    assert "access_token" in token_data
    assert token_data["token_type"] == "bearer"
