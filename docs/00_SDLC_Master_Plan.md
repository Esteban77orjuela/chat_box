# Master Plan del Proyecto AI Chat Box (SDLC)

Este documento define la metodología profesional con la que estamos construyendo el AI Chat Box.
Cada decisión, configuración y línea de código se conecta con esta visión general.

---

## 🌟 IDEA GENERAL DEL PROYECTO

**¿Qué es?** Un Chat Box inteligente en tiempo real, respaldado por un modelo de Inteligencia Artificial (Groq), diseñado para escalar a cientos de miles de usuarios.

**¿Para qué sirve?** Para que empresas o usuarios finales tengan una interfaz de comunicación instantánea, fluida y con capacidades de asistencia de IA, integrable en cualquier plataforma web.

**¿Cómo se conecta con el código?**
- *Frontend (React/Vite):* Es la "cara", donde el usuario escribe. Debe ser rápido y estético.
- *Backend (FastAPI/Python):* Es el "cerebro", que procesa mensajes, valida quién entra (JWT) y se comunica con la IA.
- *Base de Datos (PostgreSQL/SQLite):* Es la "memoria", donde guardamos chats y usuarios.
- *Docker/CI-CD:* Es la "fábrica", que empaqueta y distribuye la app para que funcione igual en cualquier máquina.

---

## 🏗️ LAS 14 FASES DEL DESARROLLO PROFESIONAL

### FASE 0 — VISIÓN DEL PRODUCTO
- **Objetivo:** Definir el problema, usuario, negocio y valor.
- **Preguntas:** ¿Qué problema resuelve? ¿Quién lo usará? ¿Cuál es el objetivo de negocio? ¿Qué valor entrega? ¿Cómo monetiza? ¿Qué riesgos existen?
- **Herramientas:** Product Thinking, UX, User Stories, BPMN, Domain Modeling
- **Roles:** Product Manager, Business Analyst, Software Architect
- **Estado del proyecto:** ✅ Completado (Ver `01_product_vision.md`)

### FASE 1 — REQUERIMIENTOS
- **Objetivo:** Definir Funcionales, No Funcionales, Seguridad, Escalabilidad, Rendimiento, Disponibilidad
- **Ejemplo:** Login, Roles, JWT, 99.9% uptime, Respuesta < 200ms
- **Artefactos:** Historias de usuario, Casos de uso, Épicas, Backlog Agile
- **Estado del proyecto:** ✅ Completado (Ver `02_requirements.md`)

### FASE 2 — ARQUITECTURA
- **Objetivo:** Definir el estilo arquitectónico (Monolito Modular con Clean Architecture)
- **Decisiones:** FastAPI + React, PostgreSQL, REST + WebSockets, principios SOLID
- **Diagramas:** C4 Model, UML, ERD
- **Estado del proyecto:** ✅ Completado (Ver `03_architecture.md`)

### FASE 3 — DISEÑO TÉCNICO
- **Objetivo:** Estructura de carpetas, patrones (Repository, DI), DTOs (Pydantic), contratos API
- **Estado del proyecto:** ✅ Completado (Ver `04_api_contracts.md` y `05_technical_design.md`)

### FASE 4 — DESARROLLO
- **Objetivo:** Código limpio, estándares, linters, formateo, control de versiones, automatización
- **Herramientas:** Ruff, Prettier, Husky, Git, GitFlow
- **Estado del proyecto:** 🔄 En progreso (Sprint 1 — saneamiento y corrección de bugs)

### FASE 5 — BASE DE DATOS
- **Objetivo:** Modelo relacional, índices, optimización, normalización, migraciones, transacciones
- **Tecnologías:** PostgreSQL, SQLAlchemy, Alembic
- **Estado del proyecto:** 🔄 SQLite temporal, pendiente migrar a PostgreSQL con Alembic

### FASE 6 — TESTING
- **Objetivo:** Unit Testing, Integration Testing, E2E, Performance Testing
- **Herramientas:** pytest, Jest, Playwright
- **Estado del proyecto:** 🔄 Tests básicos de backend existentes, faltan tests de frontend

### FASE 7 — CIBERSEGURIDAD (DEVSECOPS)
- **Objetivo:** Seguridad en todo el ciclo de vida. SAST, DAST, Dependency Scanning, Secret Scanning
- **Implementación:** JWT, Argon2, CORS, OWASP, Rate Limiting
- **Estado del proyecto:** 🔄 Autenticación JWT implementada, pendiente hardening

### FASE 8 — DOCKER Y CONTAINERS
- **Objetivo:** Empaquetar la aplicación para que sea reproducible
- **Conceptos:** Dockerfile, Images, Containers, Docker Compose
- **Estado del proyecto:** 🔄 Dockerfiles creados con bugs por corregir

### FASE 9 — CI/CD
- **Objetivo:** Integración y despliegue continuo
- **Pipeline:** Push → Tests → Security → Build Docker → Deploy → Monitor
- **Herramientas:** GitHub Actions
- **Estado del proyecto:** 🔄 Pipeline creado, pendiente depuración

### FASE 10 — CLOUD
- **Objetivo:** Infraestructura en la nube (AWS, GCP, Azure, Render, Railway)
- **Servicios:** EC2, S3, RDS, Lambda
- **Estado del proyecto:** ⏳ Pendiente

### FASE 11 — OBSERVABILIDAD
- **Objetivo:** Monitoreo en producción: Logs, Metrics, Traces, Errors
- **Stack:** Prometheus, Grafana, ELK, OpenTelemetry
- **Estado del proyecto:** ⏳ Pendiente

### FASE 12 — ESCALABILIDAD
- **Objetivo:** Load Balancing, Caching (Redis), CDN, Horizontal Scaling, Event Driven, Queues
- **Estado del proyecto:** ⏳ Pendiente

### FASE 13 — MANTENIMIENTO Y EVOLUCIÓN
- **Objetivo:** Refactoring, Technical Debt, Feature Flags, Versioning, Incident Response
- **Estado del proyecto:** ⏳ Pendiente

---

## 📋 SPRINTS (Metodología Agile)

| Sprint | Foco | Fases |
|--------|------|-------|
| Sprint 1 | Sanear y estabilizar | 4, 5, 7, 8 |
| Sprint 2 | Conectar frontend con backend real | 4 |
| Sprint 3 | Testing profesional | 6 |
| Sprint 4 | CI/CD funcional + Git | 9 |
| Sprint 5 | Cloud + Docker producción | 8, 10 |
| Sprint 6 | Observabilidad | 11 |
| Sprint 7 | Escalabilidad | 12 |

---

*Este documento se actualiza con cada sprint. Ningún cambio se hace sin tener en mente en qué fase estamos.*
