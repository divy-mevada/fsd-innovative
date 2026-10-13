import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey
from app.db.session import Base
from app.models.user import GUID


class Event(Base):
    __tablename__ = "events"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    club_id = Column(GUID(), ForeignKey("clubs.id", ondelete="SET NULL"), nullable=True, index=True)
    category = Column(String(100), nullable=False, index=True)
    description = Column(String(1000), nullable=False)
    venue = Column(String(255), nullable=False)
    start_time = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True), nullable=True)
    banner_url = Column(String(500), nullable=True)
    capacity = Column(Integer, nullable=False, default=100)
    registered_count = Column(Integer, nullable=False, default=0)
    is_free = Column(Boolean, nullable=False, default=True)
    ticket_price = Column(String(50), nullable=True, default="Free")
    google_form_url = Column(String(500), nullable=True)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    def __repr__(self):
        return f"<Event(id={self.id}, title='{self.title}', venue='{self.venue}')>"
