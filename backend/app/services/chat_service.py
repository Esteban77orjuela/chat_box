from sqlalchemy.orm import Session
from app.models.chat import Conversation, Message, SenderType

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

chat_service = ChatService()
