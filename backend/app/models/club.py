import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Boolean, DateTime
from app.db.session import Base
from app.models.user import GUID


class Club(Base):
    __tablename__ = "clubs"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    category = Column(String(100), nullable=False, index=True)  # Technical, Cultural, Sports, Entrepreneurship, Arts & Media, Academic
    description = Column(String(1000), nullable=False)
    department = Column(String(100), nullable=True)
    banner_url = Column(String(500), nullable=True)
    logo_url = Column(String(500), nullable=True)
    member_count = Column(Integer, nullable=False, default=0)
    flagship_events_count = Column(Integer, nullable=False, default=0)
    badge_text = Column(String(100), nullable=True)  # e.g., "Top 1% Chapter", "Tier 1 Funded"
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    def __repr__(self):
        return f"<Club(id={self.id}, name='{self.name}', category='{self.category}')>"
