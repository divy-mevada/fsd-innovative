from typing import List, Optional
from pydantic import BaseModel
from app.schemas.user import UserResponse
from app.schemas.club import ClubOut
from app.schemas.event import EventOut


class DashboardMetrics(BaseModel):
    total_joined_clubs: int = 0
    upcoming_events_registered: int = 0
    pending_applications: int = 0
    schedule_count: int = 0
    attendance_rate: float = 0.0


class ScheduleItem(BaseModel):
    id: str
    title: str
    time: str
    location: str
    category: str
    status: str


class DashboardSummaryOut(BaseModel):
    user: UserResponse
    metrics: DashboardMetrics
    my_clubs: List[ClubOut] = []
    upcoming_events: List[EventOut] = []
    schedule: List[ScheduleItem] = []
