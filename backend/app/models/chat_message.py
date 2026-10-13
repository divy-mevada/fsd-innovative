import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base
from app.models.user import GUID


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    club_id = Column(GUID(), ForeignKey("clubs.id", ondelete="CASCADE"), nullable=False, index=True)
    sender_id = Column(GUID(), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    content = Column(Text, nullable=False)
    channel = Column(String(50), nullable=False, default="general", index=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", foreign_keys=[sender_id])

    def __repr__(self):
        return f"<ChatMessage(id={self.id}, club_id={self.club_id}, sender_id={self.sender_id}, channel='{self.channel}')>"
