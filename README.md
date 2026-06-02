# AI Chat Real-Time

Este es un proyecto profesional de Chat con IA en tiempo real utilizando el stack **FastAPI + React + WebSockets**. Ideal para portafolio y para demostrar habilidades de arquitectura full-stack.

## 🚀 Características
- 💬 **Chat en Tiempo Real**: Comunicación bidireccional mediante WebSockets (Socket.IO).
- 🧠 **IA Open-Source**: Integración con modelos potentes como Mistral-7B vía HuggingFace Inference API.
- 🔐 **Autenticación**: Sistema de login y registro con JWT.
- 🎨 **UI Moderna**: Interfaz dark-mode elegante con TailwindCSS y Lucide Icons.
- 🐳 **Docker Ready**: Configuración completa para desplegar con un solo comando.

## 🛠️ Stack Tecnológico
**Backend:**
- Python 3.11
- FastAPI
- Socket.IO (python-socketio)
- SQLAlchemy (PostgreSQL)
- JWT (python-jose)

**Frontend:**
- React (Vite) + TypeScript
- TailwindCSS
- Zustand (Estado Global)
- Socket.IO Client

## 📦 Instalación y Uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/ai-chat-box.git
cd ai-chat-box
```

### 2. Configuración de IA (Groq - GRATIS)
1. Ve a [Groq Cloud Console](https://console.groq.com/keys).
2. Crea una **API Key** (es instantáneo y gratuito).
3. Crea un archivo `.env` en la carpeta `backend/` y añade tu token:
```env
GROQ_API_KEY=gsk_tu_token_aqui
```

### 3. Correr con Docker (Recomendado)
```bash
docker-compose up --build
```
La aplicación estará disponible en `http://localhost:3000`.

### 4. Alternativa: Correr Localmente
**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # o venv\Scripts\activate en Windows
pip install -r requirements.txt
python app/main.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 📜 Estructura del Proyecto
```text
.
├── backend/app        # Lógica de FastAPI, servicios y modelos
├── frontend/src       # Componentes de React, hooks y estados
├── docker-compose.yml # Orquestación de servicios
└── README.md          # Documentación
```

## 🛤️ Roadmap
- [ ] Implementar streaming de respuestas (SSE) para que la IA escriba letra a letra.
- [ ] Soporte para múltiples salas de chat privadas.
- [ ] Soporte para modelos locales con Ollama.

---
Proyecto desarrollado por [Tu Nombre] - 2026.
