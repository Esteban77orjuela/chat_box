from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.chat import User, SenderType, Conversation
from app.services.chat_service import chat_service
from app.schemas.chat import ConversationResponse, ConversationBase, MessageResponse, MessageInput

router = APIRouter()


@router.post("/", response_model=ConversationResponse)
def create_conversation(conv_in: ConversationBase, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return chat_service.create_conversation(db, user_id=current_user.id, title=conv_in.title)


@router.get("/", response_model=List[ConversationResponse])
def get_conversations(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return chat_service.get_user_conversations(db, user_id=current_user.id)


@router.get("/{conversation_id}/messages", response_model=List[MessageResponse])
def get_messages(conversation_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return chat_service.get_conversation_messages(db, conversation_id, user_id=current_user.id)


@router.post("/{conversation_id}/messages", response_model=MessageResponse)
async def send_message(conversation_id: int, msg_in: MessageInput, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    conv = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == current_user.id,
    ).first()
    if not conv:
        conv = chat_service.create_conversation(db, user_id=current_user.id, title="Mi Primer Chat")
        conversation_id = conv.id

    history = chat_service.get_conversation_messages(db, conversation_id, user_id=current_user.id)[-10:]
    chat_service.add_message(db, conversation_id, content=msg_in.content, sender_type=SenderType.USER)

    try:
        ai_response_text = await chat_service.generate_ai_response(history, msg_in.content)
    except Exception as e:
        ai_response_text = f"Error contacting service: {str(e)}"

    return chat_service.add_message(db, conversation_id, content=ai_response_text, sender_type=SenderType.BOT)
