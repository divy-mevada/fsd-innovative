import enum
import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, Enum as SQLEnum
from app.db.session import Base
from app.models.user import GUID


class RegistrationStatus(str, enum.Enum):
    CONFIRMED = "CONFIRMED"
    CANCELLED = "CANCELLED"


class EventRegistration(Base):
    __tablename__ = "event_registrations"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    user_id = Column(GUID(), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    event_id = Column(GUID(), ForeignKey("events.id", ondelete="CASCADE"), nullable=False, index=True)
    ticket_code = Column(String(100), unique=True, nullable=False, index=True)
    seat_zone = Column(String(100), nullable=False, default="Zone A")
    status = Column(SQLEnum(RegistrationStatus), nullable=False, default=RegistrationStatus.CONFIRMED)
    registered_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f"<EventRegistration(user_id={self.user_id}, event_id={self.event_id}, ticket_code='{self.ticket_code}')>"
