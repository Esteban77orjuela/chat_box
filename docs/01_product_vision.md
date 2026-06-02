# Visión del Producto: AI Chat Box

## 1. ¿Qué problema resuelve?
Permite a los usuarios tener conversaciones fluidas y de baja latencia con modelos de Inteligencia Artificial (ej. Mistral) en tiempo real, guardando el contexto de la conversación (historial) de manera segura.

## 2. Usuarios Objetivo
*   **Usuarios Finales:** Personas buscando un asistente de IA rápido y con interfaz limpia.
*   **Desarrolladores/Reclutadores:** Evaluadores técnicos que revisan el portafolio para comprobar habilidades en tiempo real, websockets y clean architecture.

## 3. Valor Entregado
*   **Velocidad:** Comunicación asíncrona bidireccional (WebSockets).
*   **Persistencia:** Los chats no se pierden al recargar la página.
*   **Privacidad:** Cada usuario tiene su propia cuenta y sus propios chats aislados (Multi-tenant básico).

## 4. Historias de Usuario (Épicas Principales)

### Épica 1: Gestión de Cuenta
*   **US1 (Registro):** Como usuario, quiero poder registrarme con correo y contraseña para tener mi propia cuenta aislada.
*   **US2 (Login):** Como usuario, quiero poder iniciar sesión para acceder a mi historial de chats.

### Épica 2: Chat con IA en Tiempo Real
*   **US3 (Enviar Mensaje):** Como usuario, quiero enviar un mensaje de texto a la IA y recibir una respuesta instantánea.
*   **US4 (Historial):** Como usuario, quiero ver los mensajes anteriores de mi sesión actual al entrar a la sala de chat.

### Épica 3: Interfaz de Usuario
*   **US5 (Modo Oscuro):** Como usuario, quiero una interfaz moderna en modo oscuro para reducir la fatiga visual.
