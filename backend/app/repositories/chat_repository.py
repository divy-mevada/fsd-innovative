import uuid
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.chat_message import ChatMessage
from app.schemas.chat import ChatMessageCreate


class ChatRepository:
    @staticmethod
    def get_messages(db: Session, club_id: uuid.UUID, channel: str = "general", limit: int = 50) -> List[ChatMessage]:
        return db.query(ChatMessage).filter(
            ChatMessage.club_id == club_id,
            ChatMessage.channel == channel
        ).order_by(ChatMessage.created_at.asc()).limit(limit).all()

    @staticmethod
    def create_message(db: Session, club_id: uuid.UUID, sender_id: uuid.UUID, msg_in: ChatMessageCreate) -> ChatMessage:
        msg = ChatMessage(
            club_id=club_id,
            sender_id=sender_id,
            content=msg_in.content.strip(),
            channel=msg_in.channel.strip() if msg_in.channel else "general"
        )
        db.add(msg)
        db.commit()
        db.refresh(msg)
        return msg


chat_repository = ChatRepository()
