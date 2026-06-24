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

---

## [Versión Actual] - Sprint de Integración (Auth Frontend-Backend)

### 📌 Lo que hemos logrado
1. **Creación del Cliente API:**
   - Se creó `frontend/src/services/api.ts` utilizando la API nativa `fetch`.
   - Se configuró la inyección automática del token JWT guardado en `zustand` para todas las peticiones futuras.
2. **Modal de Autenticación (UI/UX):**
   - Se creó `AuthModal.tsx`, una interfaz con diseño *glassmorphism* que incluye Login y Registro.
   - Envía los datos directamente a los endpoints `/auth/register` y `/auth/login` de FastAPI.
3. **Control de Acceso (Guards):**
   - Se modificó `App.tsx` para interceptar a los usuarios. Si no existe un usuario en el estado global (`useAuthStore`), la pantalla se bloquea obligándolos a registrarse o iniciar sesión.

### 🔧 Decisiones Técnicas Tomadas
- Se utilizó `fetch` en lugar de instalar librerías externas pesadas como `axios` para mantener el *bundle* (tamaño) del frontend ligero y optimizado.
- El envío de datos en el Login requiere `application/x-www-form-urlencoded` porque FastAPI usa OAuth2 por defecto. Esto se configuró explícitamente en el frontend.

### 🚀 Próximos Pasos (Agile)
- Prueba manual por parte del usuario: Registrar un correo y comprobar que se le da acceso a la vista principal. (Completado)
- Subir los cambios a GitHub iterativamente. (Pendiente)

---

## [Versión Actual] - Sprint 2: Core Chat & Inteligencia Artificial

### 📌 Lo que hemos logrado
1. **Validación Segura (Backend):**
   - Se creó `backend/app/api/deps.py` con una dependencia de FastAPI para interceptar el Token JWT, descifrarlo de manera segura usando `python-jose` y extraer la identidad del usuario actual (`get_current_user`).
   - Los endpoints del Chat ahora están restringidos solo a usuarios verificados.
2. **Integración con Groq AI:**
   - Se modificó `backend/app/services/chat_service.py` introduciendo la función asíncrona `generate_ai_response`.
   - Utilizamos `httpx` para comunicarnos con el modelo `llama3-8b-8192` ultra-rápido de Groq, inyectándole todo el historial de la conversación.
3. **Conexión UI de Chat (Frontend):**
   - Se rediseñó el `handleSendMessage` en `ChatDrawer.tsx` para usar nuestra nueva API REST (`apiFetch`) en lugar de depender temporalmente de WebSockets, que aún no están montados en el Backend.
   - El Chat muestra un estado de "Cargando" optimista mientras espera a que Groq responda.

### 🔧 Decisiones Técnicas Tomadas
- Se aplicó una táctica de "autocreación" en la base de datos: si el Frontend envía un mensaje a la Conversación #1 y esta no existe, el Backend la crea silenciosamente para evitar errores de restricción de llaves foráneas (`Foreign Key Constraint`). Esto mejora la experiencia del usuario (UX) en la primera prueba.
- Se implementaron actualizaciones optimistas (Optimistic UI) en el Frontend: el mensaje del usuario aparece inmediatamente en pantalla, sin esperar a que el servidor de confirmación.

### 🚀 Próximos Pasos (Agile)
- Prueba Manual: El usuario ingresará a su entorno, enviará un mensaje y confirmará que Groq responde correctamente.
- Sincronización en GitHub con el prefijo de commit `feat: add AI chat and groq integration`.

---

## Sprint 1 — Sanear y Estabilizar (Fases 4, 5, 7, 8)

### 📌 Lo que logramos
1. **Master Plan actualizado**: Se documentaron las 14 fases completas del SDLC profesional en `docs/00_SDLC_Master_Plan.md`.
2. **Seguridad crítica corregida**: Se limpió la API key de Groq que estaba visible en `.env.example`.
3. **Dependencias alineadas**: Cambiamos `passlib[bcrypt]` → `passlib[argon2]` en `requirements.txt`. Eliminamos `cors>=1.0.1` (paquete incorrecto).
4. **Dockerfiles arreglados**: Las rutas `COPY backend/...` y `COPY frontend/...` estaban mal; se eliminaron referencias a `alembic/` que no existe.
5. **Bug de frontend corregido**: `useSocket.ts` usaba `print()` → cambiado a `console.log()`.
6. **CI/CD preparado**: Se agregó script `"test"` a `package.json`.
7. **Tests verificados**: 5/5 pruebas de backend pasan correctamente.

### 🔧 Decisiones Técnicas
- Se mantiene SQLite para desarrollo local; PostgreSQL se usará en producción vía Docker.
- Los Dockerfiles ahora usan multi-stage build correctamente con las rutas ajustadas.

### 🚀 Próximos Pasos (Sprint 2)
- Crear endpoint `/api/v1/auth/me` para usuario real post-login.
- Reemplazar usuario simulado en frontend por datos reales.
- Implementar Socket.IO con autenticación JWT.
- Parametrizar nombre de usuario hardcodeado en `WelcomeView.tsx`.
