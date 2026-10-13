import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class ChatMessageCreate(BaseModel):
    content: str = Field(..., min_length=1, max_length=2000, description="Chat message text")
    channel: Optional[str] = Field("general", max_length=50, description="Channel identifier e.g. general, announcements, events-team")


class ChatMessageResponse(BaseModel):
    id: uuid.UUID
    club_id: uuid.UUID
    sender_id: uuid.UUID
    sender_name: str
    sender_role: str
    content: str
    channel: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }
