import httpx
from typing import Optional
from sqlalchemy.orm import Session
from app.models.chat import Conversation, Message, SenderType
from app.core.config import settings


class ChatService:
    @staticmethod
    def create_conversation(db: Session, user_id: int, title: str = "Nueva Conversacion"):
        db_conversation = Conversation(user_id=user_id, title=title)
        db.add(db_conversation)
        db.commit()
        db.refresh(db_conversation)
        return db_conversation

    @staticmethod
    def get_user_conversations(db: Session, user_id: int):
        return db.query(Conversation).filter(Conversation.user_id == user_id).order_by(Conversation.created_at.desc()).all()

    @staticmethod
    def add_message(db: Session, conversation_id: int, content: str, sender_type: SenderType):
        db_message = Message(
            conversation_id=conversation_id,
            content=content,
            sender_type=sender_type
        )
        db.add(db_message)
        db.commit()
        db.refresh(db_message)
        return db_message

    @staticmethod
    def get_conversation_messages(db: Session, conversation_id: int, user_id: Optional[int] = None):
        query = db.query(Message).join(Conversation).filter(Message.conversation_id == conversation_id)
        if user_id is not None:
            query = query.filter(Conversation.user_id == user_id)
        return query.order_by(Message.timestamp.asc()).all()

    @staticmethod
    async def _call_groq_api(messages: list) -> str:
        api_key = settings.GROQ_API_KEY
        if not api_key:
            return "Error: GROQ_API_KEY is not configured on the server."

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": settings.GROQ_MODEL,
                        "messages": messages,
                        "temperature": 0.7,
                        "max_tokens": 1024
                    },
                    timeout=30.0
                )

                if response.status_code == 200:
                    data = response.json()
                    return data["choices"][0]["message"]["content"]
                return f"Groq API error: {response.status_code} - {response.text}"
        except Exception as e:
            return f"Connection error: {str(e)}"

    @staticmethod
    async def generate_response(content: str, history: list[dict] = None) -> str:
        messages = [
            {
                "role": "system",
                "content": (
                    "Eres Chat Box, un asistente util, claro y amable. "
                    "Responde siempre en espanol, salvo que el usuario pida otro idioma. "
                    "Responde directo y con contexto."
                ),
            }
        ]

        if history:
            for msg in history[-10:]:
                role = "assistant" if msg.get("sender_type") == "bot" else "user"
                messages.append({"role": role, "content": msg.get("content", "")})

        messages.append({"role": "user", "content": content})
        return await ChatService._call_groq_api(messages)

    @staticmethod
    async def generate_ai_response(history: list[Message], new_message: str) -> str:
        messages = [
            {
                "role": "system",
                "content": (
                    "Eres Chat Box, un asistente util, claro y amable. "
                    "Responde siempre en espanol, salvo que el usuario pida otro idioma. "
                    "Responde directo y con contexto."
                ),
            }
        ]

        for msg in history:
            role = "user" if msg.sender_type == SenderType.USER else "assistant"
            messages.append({"role": role, "content": msg.content})

        messages.append({"role": "user", "content": new_message})
        return await ChatService._call_groq_api(messages)


chat_service = ChatService()
