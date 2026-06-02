# Diseño Técnico (Technical Design): AI Chat Box

## 1. Estructura del Backend (FastAPI Clean Architecture)

Hemos organizado el código para separar las responsabilidades:
*   `app/api/`: Contiene los "Routers" o controladores. Su único trabajo es recibir la petición web y devolver la respuesta. NO tienen lógica de negocio.
*   `app/services/`: Lógica de negocio (ej. `ai_service.py` habla con Groq).
*   `app/db/`: Conexión a Base de datos y Repositorios.
*   `app/models/`: Tablas de SQLAlchemy (Base de datos).
*   `app/schemas/`: Modelos de Pydantic (Validación de entrada y salida JSON).

**Patrón: Inyección de Dependencias (DI)**
En FastAPI, inyectaremos la base de datos usando `Depends(get_db)`. Esto hace que el código sea testeable (Fase 6), ya que en las pruebas podemos inyectar una base de datos en memoria en lugar de la real.

## 2. Estructura del Frontend (React + Vite)

El archivo `App.tsx` actual es monolítico (tiene la UI principal, el drawer del chat y la barra de navegación todo junto).

**Refactorización Planificada:**
Dividiremos `App.tsx` en pequeños componentes dentro de `src/components/`:
1.  `layout/BottomNavigation.tsx`: Barra de navegación inferior.
2.  `views/WelcomeView.tsx`: La pantalla inicial con el saludo y opciones.
3.  `chat/ChatDrawer.tsx`: El panel que emerge sobre la pantalla para chatear.

**Patrón: Zustand para Estado Global**
Usaremos el store `chatStore.ts` (ya existente) para evitar hacer "Prop Drilling" (pasar variables de componente en componente). El ChatDrawer leerá directamente los `messages` del store global.

## 3. WebSockets

El `main.py` contiene la lógica inicial de Socket.IO. Para un diseño más limpio a futuro (Fase 12 - Escalabilidad), los manejadores de eventos se abstraerán en un `socket_handlers.py` independiente, permitiendo escalar el servidor HTTP y el de WebSockets por separado si es necesario.
