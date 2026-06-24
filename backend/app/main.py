from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt, JWTError
import socketio
from app.core.config import settings
from app.api.v1 import auth, chat
from app.services.ai_service import ai_service
from app.db.session import SessionLocal, engine
from app.models import chat as models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(chat.router, prefix=f"{settings.API_V1_STR}/chat", tags=["chat"])

sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*'
)
socket_app = socketio.ASGIApp(sio, app)

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Chat API", "status": "online"}

@sio.event
async def connect(sid, environ, auth):
    token = None
    if auth and auth.get("token"):
        token = auth["token"]
    if not token:
        raise socketio.exceptions.ConnectionRefusedError("Token requerido")
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise socketio.exceptions.ConnectionRefusedError("Token inválido")
        environ["user_id"] = int(user_id)
    except JWTError:
        raise socketio.exceptions.ConnectionRefusedError("Token inválido o expirado")

@sio.event
async def disconnect(sid):
    pass

@sio.on("send_message")
async def handle_message(sid, data):
    content = data.get("content")
    history = data.get("history", [])
    ai_response = ai_service.generate_response(content, history)
    await sio.emit("receive_message", {
        "content": ai_response,
        "sender_type": "ai"
    }, to=sid)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(socket_app, host="0.0.0.0", port=8000)
