import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.models.event_registration import RegistrationStatus


class EventCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=255)
    slug: str = Field(..., min_length=2, max_length=255)
    club_id: Optional[uuid.UUID] = None
    category: str = Field(..., max_length=100)
    description: str = Field(..., max_length=1000)
    venue: str = Field(..., max_length=255)
    start_time: datetime
    end_time: Optional[datetime] = None
    banner_url: Optional[str] = Field(None, max_length=500)
    capacity: int = Field(100, ge=1)
    is_free: bool = True
    ticket_price: Optional[str] = "Free"
    google_form_url: Optional[str] = Field(None, max_length=500, description="External registration form (e.g. Google Form)")


class EventUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=2, max_length=255)
    category: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = Field(None, max_length=1000)
    venue: Optional[str] = Field(None, max_length=255)
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    banner_url: Optional[str] = Field(None, max_length=500)
    capacity: Optional[int] = Field(None, ge=1)
    is_free: Optional[bool] = None
    ticket_price: Optional[str] = None
    google_form_url: Optional[str] = Field(None, max_length=500)
    is_active: Optional[bool] = None


class EventOut(BaseModel):
    id: uuid.UUID
    title: str
    slug: str
    club_id: Optional[uuid.UUID] = None
    category: str
    description: str
    venue: str
    start_time: datetime
    end_time: Optional[datetime] = None
    banner_url: Optional[str] = None
    capacity: int
    registered_count: int
    is_free: bool
    ticket_price: Optional[str] = "Free"
    google_form_url: Optional[str] = None
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }


class EventRegistrationOut(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    event_id: uuid.UUID
    ticket_code: str
    seat_zone: str
    status: RegistrationStatus
    registered_at: datetime

    model_config = {
        "from_attributes": True
    }
