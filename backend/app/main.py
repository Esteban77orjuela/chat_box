from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from jose import jwt, JWTError
import socketio
import time
from collections import defaultdict
from app.core.config import settings
from app.api.v1 import auth, chat
from app.services.chat_service import chat_service
from app.db.session import SessionLocal, engine
from app.models import chat as models

models.Base.metadata.create_all(bind=engine)

# In-memory rate limiter (guest endpoint: 10/min per IP)
_rate_limit_store: dict[str, list[float]] = defaultdict(list)
RATE_LIMIT_WINDOW = 60
RATE_LIMIT_MAX = 10

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

@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com"
    return response

@app.middleware("http")
async def rate_limit_guest(request: Request, call_next):
    if request.url.path == "/api/v1/auth/guest" and request.method == "POST":
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()
        timestamps = _rate_limit_store[client_ip]
        cutoff = now - RATE_LIMIT_WINDOW
        _rate_limit_store[client_ip] = [t for t in timestamps if t > cutoff]
        if len(_rate_limit_store[client_ip]) >= RATE_LIMIT_MAX:
            return JSONResponse(
                status_code=429,
                content={"detail": "Too many guest login attempts. Try again later."}
            )
        _rate_limit_store[client_ip].append(now)
    return await call_next(request)

app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(chat.router, prefix=f"{settings.API_V1_STR}/chat", tags=["chat"])

sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*'
)
socket_app = socketio.ASGIApp(sio, app)

@app.get("/")
def read_root():
    return {"message": "Welcome to Chat Box API", "status": "online"}

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
    response_text = await chat_service.generate_response(content, history)
    await sio.emit("receive_message", {
        "content": response_text,
        "sender_type": "bot"
    }, to=sid)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(socket_app, host="0.0.0.0", port=8000)
