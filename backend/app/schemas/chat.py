from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from app.models.chat import SenderType

# User Schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Chat Schemas
class MessageBase(BaseModel):
    content: str
    sender_type: SenderType

class MessageCreate(MessageBase):
    conversation_id: int

class MessageResponse(MessageBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class ConversationBase(BaseModel):
    title: Optional[str] = "Nueva Conversación"

class ConversationResponse(ConversationBase):
    id: int
    user_id: int
    created_at: datetime
    messages: List[MessageResponse] = []

    class Config:
        from_attributes = True
