# Bitácora de Desarrollo y Cambios (Changelog)

Esta bitácora documenta los pasos, pruebas y cambios realizados en el proyecto bajo metodologías ágiles, asegurando trazabilidad total.

## [Versión Actual] - Fase de Pruebas Manuales (Local)

### 📌 Lo que hemos logrado
1. **Ejecución Exitosa del Frontend:**
   - La interfaz en React/Vite arranca correctamente.
   - El diseño muestra la pantalla principal ("Ready to explore with your AI Agent?").
2. **Ejecución Exitosa del Backend (API):**
   - El servidor FastAPI (`uvicorn`) arranca sin errores de dependencias.
   - La documentación automática (Swagger/OpenAPI) está sirviendo correctamente todos los endpoints:
     - `Auth`: `/register`, `/login`
     - `Chat`: `/chat/`, `/chat/{id}/messages`

### 🔧 Decisiones Técnicas Tomadas
- Se utilizó **SQLite** temporalmente (mediante `chat.db` en el entorno virtual) para permitir un despliegue manual rápido sin necesidad de tener Docker instalado de antemano en Windows.
- Se verificaron los módulos de seguridad (Argon2 para hashing y JWT para tokens), superando las advertencias de versiones obsoletas de Pydantic y SQLAlchemy que teníamos en sesiones pasadas.

### 🚀 Próximos Pasos (Agile)
- Empaquetar todo el código estable y subirlo a GitHub.
- Conectar el Frontend con el Backend (consumir las APIs que vimos en Swagger desde la pantalla de React).
