def test_read_root(client):
    """
    Test Unitario: Verifica que la API responda correctamente en su ruta raíz.
    """
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to AI Chat API", "status": "online"}

def test_auth_register_tdd():
    """
    Test Unitario (TDD - Test Driven Development):
    Aquí definimos cómo debe comportarse el registro ANTES de programarlo.
    """
    # response = client.post("/api/v1/auth/register", json={"email": "test@test.com", "password": "123"})
    # assert response.status_code == 201
    pass
