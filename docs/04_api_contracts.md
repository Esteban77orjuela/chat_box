# API First Design & Contracts: AI Chat Box

## 1. Endpoints REST (HTTP)

### 1.1 Autenticación

**`POST /api/auth/register`**
*   **Propósito:** Crear nuevo usuario.
*   **Request Body:**
    ```json
    { "email": "user@example.com", "password": "securepassword123" }
    ```
*   **Response (201 Created):**
    ```json
    { "id": 1, "email": "user@example.com", "created_at": "2026-05-27T10:00:00Z" }
    ```

**`POST /api/auth/login`**
*   **Propósito:** Iniciar sesión y obtener JWT.
*   **Request Body:** (Form-Data o JSON, típicamente OAuth2PasswordRequestForm en FastAPI)
    ```json
    { "username": "user@example.com", "password": "securepassword123" }
    ```
*   **Response (200 OK):**
    ```json
    { "access_token": "eyJhbG...", "token_type": "bearer" }
    ```

### 1.2 Historial de Chat

**`GET /api/chat/history`**
*   **Propósito:** Obtener mensajes pasados del usuario autenticado.
*   **Headers:** `Authorization: Bearer <token>`
*   **Response (200 OK):**
    ```json
    [
      { "id": 1, "role": "user", "content": "Hola IA", "timestamp": "..." },
      { "id": 2, "role": "assistant", "content": "¡Hola! ¿En qué puedo ayudarte?", "timestamp": "..." }
    ]
    ```

## 2. Eventos WebSocket (Socket.IO)

La conexión se establece en `/socket.io/` y requiere autenticación (generalmente enviando el token en el handshake auth).

### 2.1 Eventos Emitidos por el Cliente (Frontend -> Backend)

*   **`send_message`**
    *   **Payload:** `{ "content": "Explícame qué es Socket.IO" }`
    *   **Acción:** El backend recibe, guarda en BD, envía a Groq, espera respuesta y emite de vuelta.

### 2.2 Eventos Emitidos por el Servidor (Backend -> Frontend)

*   **`receive_message`**
    *   **Payload:** `{ "role": "assistant", "content": "Socket.IO es una librería..." }`
    *   **Acción:** El frontend añade este mensaje al store de Zustand y actualiza la UI.
*   **`error_alert`**
    *   **Payload:** `{ "message": "Tu token expiró o falló la IA." }`
