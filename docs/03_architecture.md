# Arquitectura del Sistema: AI Chat Box

## 1. Decisiones de Arquitectura (ADR - Architecture Decision Records)

*   **Estilo Arquitectónico:** Monolito Modular en Backend (con separación por dominios: usuarios, chat, ia) y Single Page Application (SPA) en Frontend.
*   **Protocolos de Comunicación:**
    *   **HTTP/REST:** Para autenticación (Login/Registro) y operaciones estáticas (obtener historial antiguo).
    *   **WebSockets (Socket.IO):** Para la comunicación bidireccional de baja latencia durante el chat en tiempo real.
*   **Base de Datos:** PostgreSQL (Relacional) para garantizar la integridad de las relaciones entre Usuarios y Mensajes.
*   **Integración Externa:** Groq API para LLM inference.

## 2. Diagrama de Contenedores (C4 Model - Nivel 2)

```mermaid
C4Container
    title Diagrama de Contenedores para AI Chat Box

    Person(user, "Usuario", "Un usuario interactuando con la interfaz de chat")

    System_Boundary(c1, "AI Chat Box") {
        Container(spa, "Single Page App", "React, TypeScript, TailwindCSS", "Provee la interfaz gráfica e interactúa vía REST y WebSockets")
        Container(api, "API Application", "Python, FastAPI", "Maneja lógica de negocio, autenticación, y conexiones Socket.IO")
        ContainerDb(db, "Base de Datos", "PostgreSQL", "Almacena credenciales seguras e historial de mensajes")
    }

    System_Ext(groq, "Groq API", "Inferencia de LLMs (Mistral/Llama)")

    Rel(user, spa, "Interactúa usando", "HTTPS")
    Rel(spa, api, "Llama a API REST", "JSON/HTTPS")
    Rel(spa, api, "Abre conexión en tiempo real", "Socket.IO")
    Rel(api, db, "Lee y Escribe", "SQL/TCP")
    Rel(api, groq, "Solicita generación de texto", "JSON/HTTPS")
```

## 3. Patrones de Diseño a utilizar

*   **Repository Pattern:** En el backend, las consultas a base de datos estarán separadas de la lógica de negocio (FastAPI routers).
*   **Dependency Injection (DI):** Usaremos la inyección de dependencias nativa de FastAPI para instanciar repositorios y sesiones de base de datos.
*   **Zustand (State Management):** En el frontend, el estado global (usuario logueado, lista de mensajes actuales) se manejará con stores de Zustand.
