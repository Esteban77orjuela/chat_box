from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio
from app.core.config import settings
from app.api.v1 import auth, chat
from app.services.ai_service import ai_service
from app.services.chat_service import chat_service
from app.db.session import SessionLocal, engine
from app.models import chat as models

# Crear tablas al iniciar
models.Base.metadata.create_all(bind=engine)

# 1. Configuración FastAPI
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# 2. Configuración CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(chat.router, prefix=f"{settings.API_V1_STR}/chat", tags=["chat"])

# 3. Configuración Socket.IO
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*' # En prod limitar a FRONTEND_URL
)
socket_app = socketio.ASGIApp(sio, app)

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Chat API", "status": "online"}

# Eventos de Socket.IO iniciales
@sio.event
async def connect(sid, environ):
    print(f"Cliente conectado: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Cliente desconectado: {sid}")

@sio.on("send_message")
async def handle_message(sid, data):
    content = data.get("content")
    history = data.get("history", []) # El cliente puede enviar historial breve
    
    print(f"Mensaje de {sid}: {content}")
    
    # 1. (Opcional) Guardar mensaje del usuario en DB aquí
    
    # 2. Obtener respuesta de IA
    ai_response = ai_service.generate_response(content, history)
    
    # 3. Enviar respuesta al cliente
    await sio.emit("receive_message", {
        "content": ai_response,
        "sender_type": "ai"
    }, to=sid)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(socket_app, host="0.0.0.0", port=8000)
