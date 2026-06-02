from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.services.chat_service import chat_service
from app.schemas.chat import ConversationResponse, ConversationBase, MessageResponse

router = APIRouter()

# En un sistema real, usaríamos una dependencia para obtener el current_user del token JWT
# Por ahora usaremos un mock user_id=1 para agilizar la implementación base

@router.post("/", response_model=ConversationResponse)
def create_conversation(conv_in: ConversationBase, db: Session = Depends(get_db)):
    # user_id fijo para demo
    return chat_service.create_conversation(db, user_id=1, title=conv_in.title)

@router.get("/", response_model=List[ConversationResponse])
def get_conversations(db: Session = Depends(get_db)):
    return chat_service.get_user_conversations(db, user_id=1)

@router.get("/{conversation_id}/messages", response_model=List[MessageResponse])
def get_messages(conversation_id: int, db: Session = Depends(get_db)):
    return chat_service.get_conversation_messages(db, conversation_id)
