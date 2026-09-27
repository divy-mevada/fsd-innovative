import enum
import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, Enum as SQLEnum
from app.db.session import Base
from app.models.user import GUID


class ClubMemberRole(str, enum.Enum):
    MEMBER = "MEMBER"
    EXECUTIVE = "EXECUTIVE"
    CLUB_HEAD = "CLUB_HEAD"


class ClubMemberStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    PENDING = "PENDING"
    REJECTED = "REJECTED"


class ClubMember(Base):
    __tablename__ = "club_members"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    user_id = Column(GUID(), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    club_id = Column(GUID(), ForeignKey("clubs.id", ondelete="CASCADE"), nullable=False, index=True)
    role = Column(SQLEnum(ClubMemberRole), nullable=False, default=ClubMemberRole.MEMBER)
    status = Column(SQLEnum(ClubMemberStatus), nullable=False, default=ClubMemberStatus.ACTIVE)
    joined_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f"<ClubMember(user_id={self.user_id}, club_id={self.club_id}, role='{self.role}')>"
