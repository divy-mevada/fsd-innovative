import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from app.models.club_member import ClubMemberRole, ClubMemberStatus


class ClubCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    slug: str = Field(..., min_length=2, max_length=255)
    category: str = Field(..., max_length=100)
    description: str = Field(..., max_length=1000)
    department: Optional[str] = Field(None, max_length=100)
    banner_url: Optional[str] = Field(None, max_length=500)
    logo_url: Optional[str] = Field(None, max_length=500)
    badge_text: Optional[str] = Field(None, max_length=100)


class ClubUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=255)
    category: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = Field(None, max_length=1000)
    department: Optional[str] = Field(None, max_length=100)
    banner_url: Optional[str] = Field(None, max_length=500)
    logo_url: Optional[str] = Field(None, max_length=500)
    badge_text: Optional[str] = Field(None, max_length=100)
    is_active: Optional[bool] = None


class ClubOut(BaseModel):
    id: uuid.UUID
    name: str
    slug: str
    category: str
    description: str
    department: Optional[str] = None
    banner_url: Optional[str] = None
    logo_url: Optional[str] = None
    member_count: int
    flagship_events_count: int
    badge_text: Optional[str] = None
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }


class ClubJoinInput(BaseModel):
    role: Optional[ClubMemberRole] = ClubMemberRole.MEMBER


class ClubMemberOut(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    club_id: uuid.UUID
    role: ClubMemberRole
    status: ClubMemberStatus
    joined_at: datetime

    model_config = {
        "from_attributes": True
    }


class ClubMemberDetailOut(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    club_id: uuid.UUID
    full_name: str
    email: str
    roll_number: Optional[str] = None
    department: Optional[str] = None
    year: Optional[int] = None
    role: ClubMemberRole
    status: ClubMemberStatus
    joined_at: datetime


class MemberRoleUpdate(BaseModel):
    role: ClubMemberRole


class ClubApplyInput(BaseModel):
    statement: Optional[str] = None

