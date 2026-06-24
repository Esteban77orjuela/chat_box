import os
import httpx
from sqlalchemy.orm import Session
from app.models.chat import Conversation, Message, SenderType
from app.core.config import settings

class ChatService:
    @staticmethod
    def create_conversation(db: Session, user_id: int, title: str = "Nueva Conversación"):
        db_conversation = Conversation(user_id=user_id, title=title)
        db.add(db_conversation)
        db.commit()
        db.refresh(db_conversation)
        return db_conversation

    @staticmethod
    def get_user_conversations(db: Session, user_id: int):
        return db.query(Conversation).filter(Conversation.user_id == user_id).all()

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
    def get_conversation_messages(db: Session, conversation_id: int):
        return db.query(Message).filter(Message.conversation_id == conversation_id).order_by(Message.timestamp.asc()).all()

    @staticmethod
    async def generate_ai_response(history: list[Message], new_message: str) -> str:
        api_key = settings.GROQ_API_KEY
        if not api_key:
            return "Error: GROQ_API_KEY no está configurada en el servidor."

        # Construir el contexto para la IA
        messages = [{"role": "system", "content": "Eres un asistente de IA muy inteligente y servicial llamado Chat Box."}]
        
        for msg in history:
            role = "user" if msg.sender_type == SenderType.USER else "assistant"
            messages.append({"role": role, "content": msg.content})
            
        messages.append({"role": "user", "content": new_message})

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": "llama3-8b-8192",  # Modelo rápido por defecto en Groq
                        "messages": messages,
                        "temperature": 0.7,
                        "max_tokens": 1024
                    },
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return data["choices"][0]["message"]["content"]
                else:
                    return f"Error de la IA: {response.status_code} - {response.text}"
        except Exception as e:
            return f"Excepción al conectar con Groq: {str(e)}"

chat_service = ChatService()
