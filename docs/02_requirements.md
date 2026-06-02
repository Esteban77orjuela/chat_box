# Requerimientos del Sistema: AI Chat Box

## 1. Requerimientos Funcionales (Lo que la app debe HACER)
1.  **Autenticación:** El sistema debe permitir registro y login usando JWT (JSON Web Tokens).
2.  **WebSockets:** El sistema debe mantener una conexión Socket.IO para enviar/recibir mensajes sin HTTP Polling.
3.  **Persistencia:** Los mensajes de chat deben guardarse en una base de datos relacional (PostgreSQL).
4.  **Integración AI:** El backend debe comunicarse con la API de Groq para obtener respuestas del modelo LLM.

## 2. Requerimientos No Funcionales (CÓMO debe comportarse)
1.  **Rendimiento:** El tiempo de respuesta del websocket (ida y vuelta al backend) no debe exceder los 200ms (sin contar el tiempo de generación de la IA).
2.  **Disponibilidad:** El sistema debe estar diseñado para ser dockerizado y desplegable en cualquier proveedor cloud (AWS/Render) buscando alta disponibilidad.
3.  **Escalabilidad:** El backend debe ser *Stateless* en lo posible. (Nota: Para escalar websockets a futuro se requerirá un adaptador Redis).

## 3. Requerimientos de Seguridad
1.  **Contraseñas:** Deben almacenarse encriptadas usando el algoritmo Bcrypt.
2.  **JWT:** Los tokens deben tener un tiempo de expiración (ej. 1 hora).
3.  **CORS:** Cross-Origin Resource Sharing debe estar configurado para permitir solo las URLs del Frontend en producción.
4.  **Inyección SQL:** Prevenida obligatoriamente usando un ORM (SQLAlchemy).
