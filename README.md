# Chat Box — Chat con IA

Chatbot full-stack con **FastAPI + React** que conversa con un LLM de [Groq](https://console.groq.com) (`llama-3.1-8b-instant`). Incluye autenticación JWT, acceso invitado anónimo, historial de conversaciones por usuario y una UI dark moderna.

![CI](https://github.com/Esteban77orjuela/chat_box/actions/workflows/ci.yml/badge.svg)

## Características

- 🔐 **Autenticación JWT**: registro, login y acceso **invitado** (sesión anónima única, con rate limiting de 10 intentos/min por IP).
- 💬 **Historial de conversaciones**: cada usuario conserva sus chats y mensajes; los recursos ajenos devuelven 404.
- 🧠 **IA con Groq**: integración REST con la API de Groq, modelo configurable vía `GROQ_MODEL`.
- 🎨 **UI moderna**: dark mode, TailwindCSS 4, Zustand, Framer Motion y Lucide Icons.
- 🛡️ **Seguridad básica**: contraseñas con Argon2, headers de seguridad (CSP, HSTS, X-Frame-Options), tokens con expiración.
- 🧪 **Tests automatizados**: 13 tests de backend (pytest) y 8 de frontend (Vitest), ejecutados por CI en cada push/PR.
- 🐳 **Docker**: imágenes backend/frontend y `docker compose` opcional con PostgreSQL.

## Stack tecnológico

| Capa | Tecnologías |
|---|---|
| Backend | Python 3.11+, FastAPI, SQLAlchemy, Pydantic v2, JWT (python-jose), Passlib/Argon2, pytest |
| Base de datos | SQLite por defecto · PostgreSQL 15 (via `DATABASE_URL`) |
| Frontend | React 19, Vite, TypeScript, TailwindCSS 4, Zustand, Framer Motion, Vitest + Testing Library |
| IA | Groq API (llama-3.1-8b-instant) |
| CI/CD | GitHub Actions (lint, formato, tests, build) |

## Arquitectura

```
┌──────────────┐   REST (JSON)   ┌───────────────────┐   SQLAlchemy   ┌───────────────┐
│  React (Vite)│ ──────────────► │  FastAPI + JWT    │ ─────────────► │ SQLite / Postgres│
└──────────────┘                 └─────────┬─────────┘                └───────────────┘
                                           │ HTTP (Groq API)
                                           ▼
                                    ┌───────────────┐
                                    │  Groq (LLM)   │
                                    └───────────────┘
```

La comunicación es **REST** (sin WebSockets). El backend conserva un scaffold de Socket.IO sin uso en la UI; está pendiente de eliminar.

## Requisitos

- Python 3.11+ (probado con 3.14)
- Node.js 20+ y npm
- Una API key gratuita de [Groq](https://console.groq.com/keys)

## Instalación y uso (desarrollo)

### 1. Clonar

```bash
git clone https://github.com/Esteban77orjuela/chat_box.git
cd chat_box
```

### 2. Configurar el backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Linux/macOS
pip install -r requirements.txt
```

Copia `.env.example` a `.env` y pega tu API key:

```env
GROQ_API_KEY=gsk_xxxxxxxx
```

### 3. Levantar el backend

```bash
python -m app.main
# o: uvicorn app.main:socket_app --host 0.0.0.0 --port 8000
```

La API queda en `http://localhost:8000` (Swagger UI en `/docs`, OpenAPI en `/api/v1/openapi.json`).

### 4. Levantar el frontend

```bash
cd frontend
npm install
npm run dev
```

La UI queda en `http://localhost:5173` y llama al backend en `http://127.0.0.1:8000` (el frontend usa un service de login automático como invitado si no hay sesión).

## Docker

```bash
docker compose up --build
```

- Frontend (nginx): `http://localhost`
- Backend: `http://localhost:8000`

> **Nota:** compose lee `backend/.env.example`; reemplaza el placeholder de `GROQ_API_KEY` en ese archivo o apunta `env_file` a `backend/.env` con tu key real. Para usar PostgreSQL en vez de SQLite, define `DATABASE_URL=postgresql+psycopg2://chat_user:chat_pass@db:5432/chat_db` en el entorno del backend.

## Tests

```bash
# Backend
cd backend
python -m pytest -q        # 13 tests

# Frontend
cd frontend
npm test                   # 8 tests (Vitest)

# Lint y formato
python -m ruff check app/ tests/
python -m ruff format --check app/ tests/
```

## API

Todas las rutas bajo `/api/v1` (requieren header `Authorization: Bearer <token>` salvo las de auth):

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/register` | Registrar usuario |
| POST | `/auth/login` | Iniciar sesión (devuelve JWT) |
| POST | `/auth/guest` | Sesión invitada anónima |
| GET | `/auth/me` | Datos del usuario actual |
| POST | `/chat/conversations` | Crear conversación |
| GET | `/chat/conversations` | Listar conversaciones del usuario |
| GET | `/chat/conversations/{id}/messages` | Historial de mensajes |
| POST | `/chat/conversations/{id}/messages` | Enviar mensaje y obtener respuesta de la IA |

## Estructura del proyecto

```text
├── backend/
│   ├── app/
│   │   ├── api/v1/        # Routers: auth, chat
│   │   ├── core/          # Configuración (settings), seguridad (JWT)
│   │   ├── db/            # Motor y sesión SQLAlchemy
│   │   ├── models/        # Modelos ORM (User, Conversation, Message)
│   │   ├── schemas/       # Schemas Pydantic
│   │   └── services/      # Lógica de negocio (chat_service, Groq)
│   ├── tests/             # pytest (13 tests)
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/    # UI (Sidebar, ChatWindow, ChatMessage, ...)
│   │   ├── store/         # Zustand (auth, chat)
│   │   ├── services/      # Cliente API
│   │   └── test/          # Setup de Vitest
│   ├── Dockerfile
│   └── package.json
├── .github/workflows/     # CI: lint, formato, tests, build, Docker
└── docker-compose.yml
```

## Roadmap

- [ ] Streaming de respuestas (SSE) para que la IA escriba letra a letra.
- [ ] Múltiples salas de chat privadas.
- [ ] Soporte de modelos locales con Ollama.
- [ ] Usar PostgreSQL en producción (el compose ya lo incluye).
- [ ] Eliminar el scaffold de Socket.IO sin uso.

---

Desarrollado por [Esteban Orjuela](https://github.com/Esteban77orjuela) — 2026.
