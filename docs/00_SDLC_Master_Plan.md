# Master Plan del Proyecto AI Chat Box (SDLC)

Este documento define la metodología profesional, ágil y en cascada (fases estructuradas con iteraciones ágiles) con la que estamos construyendo el AI Chat Box. Cada decisión, configuración y línea de código se conecta con esta visión general.

## 🌟 IDEA GENERAL DEL PROYECTO (VISIÓN)
**¿Qué es?** Un Chat Box inteligente en tiempo real, respaldado por un modelo de Inteligencia Artificial (Groq), diseñado para escalar a cientos de miles de usuarios.
**¿Para qué sirve?** Para que empresas o usuarios finales tengan una interfaz de comunicación instantánea, fluida y con capacidades de asistencia de IA, integrable en cualquier plataforma web.
**¿Cómo se conecta con el código?** 
- *Frontend (React/Vite):* Es la "cara", donde el usuario escribe. Debe ser rápido y estético.
- *Backend (FastAPI/Python):* Es el "cerebro", que procesa los mensajes, valida quién entra (Seguridad JWT) y se comunica con la IA.
- *Base de Datos (PostgreSQL/SQLite):* Es la "memoria", donde guardamos los chats y usuarios.
- *Docker/CI-CD:* Es la "fábrica", que empaqueta y distribuye la app para que funcione igual en cualquier computadora o en la nube.

---

## 🏗️ LAS 14 FASES DEL DESARROLLO PROFESIONAL (Nuestra Hoja de Ruta)

### FASE 0 — VISIÓN DEL PRODUCTO
- **Objetivo:** Definir el problema, usuario, negocio y valor.
- **Estado:** ✅ Completado (Ver Idea General).

### FASE 1 — REQUERIMIENTOS
- **Objetivo:** Definir Funcionales (Login, Chat) y No Funcionales (Respuesta < 200ms, Uptime 99.9%).
- **Estado:** ✅ Completado.

### FASE 2 — ARQUITECTURA
- **Objetivo:** Definir monolito vs microservicios, bases de datos (PostgreSQL), principios SOLID.
- **Estado:** ✅ Completado (Arquitectura Limpia con FastAPI).

### FASE 3 — DISEÑO TÉCNICO
- **Objetivo:** Estructura de carpetas, Patrones (Repository), DTOs (Pydantic).
- **Estado:** ✅ Completado.

### FASE 4 — DESARROLLO
- **Objetivo:** Código limpio, Linters (Ruff), Git, automatización.
- **Estado:** 🔄 En Progreso (Iterando sobre el código).

### FASE 5 — BASE DE DATOS
- **Objetivo:** Modelos relacionales, migraciones (Alembic), optimización.
- **Estado:** ✅ Completado (SQLAlchemy configurado).

### FASE 6 — TESTING
- **Objetivo:** Unit testing, E2E, asegurar calidad (pytest).
- **Estado:** 🔄 En Progreso (Tests unitarios del backend pasando).

### FASE 7 — CIBERSEGURIDAD (DEVSECOPS)
- **Objetivo:** Seguridad en todo. JWT, contraseñas encriptadas (Argon2), CORS.
- **Estado:** ✅ Completado (Módulo de seguridad implementado).

### FASE 8 — DOCKER Y CONTAINERS
- **Objetivo:** Empaquetar la app. "Funciona en mi máquina" no sirve. Todo reproducible.
- **Estado:** 🔄 En Progreso (Dockerfiles listos, a punto de probar `docker-compose`).

### FASE 9 — CI/CD
- **Objetivo:** Pipelines en GitHub Actions para test y despliegue automático.
- **Estado:** 🔄 En Progreso (Archivo `ci.yml` creado).

### FASE 10 — CLOUD
- **Objetivo:** Infraestructura en la nube (AWS, GCP, Azure).
- **Estado:** ⏳ Pendiente.

### FASE 11 — OBSERVABILIDAD
- **Objetivo:** Monitoreo, Logs, Métricas (Prometheus, Grafana).
- **Estado:** ⏳ Pendiente.

### FASE 12 — ESCALABILIDAD
- **Objetivo:** Load Balancing, Caching (Redis), escalado horizontal.
- **Estado:** ⏳ Pendiente.

### FASE 13 — MANTENIMIENTO Y EVOLUCIÓN
- **Objetivo:** Refactoring, Technical Debt, Feature Flags.
- **Estado:** ⏳ Pendiente.

---
*Este documento servirá como bitácora principal del proyecto. Ningún cambio se hará sin tener en mente en qué fase estamos.*
