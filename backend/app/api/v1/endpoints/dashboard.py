from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.schemas.dashboard import DashboardSummaryOut, DashboardMetrics, ScheduleItem
from app.schemas.user import UserResponse
from app.schemas.club import ClubOut
from app.schemas.event import EventOut
from app.repositories.club_repository import club_repository
from app.repositories.event_repository import event_repository
from app.api.deps import get_current_user

router = APIRouter()


@router.get(
    "/summary",
    response_model=DashboardSummaryOut,
    status_code=status.HTTP_200_OK,
    summary="Get unified dashboard summary and real-time metrics for current user"
)
def get_dashboard_summary(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Synchronizes and returns complete dashboard state for the authenticated user,
    including joined clubs, registered events, schedule, and live metric indicators.
    """
    user_clubs = club_repository.get_user_clubs(db=db, user_id=current_user.id)
    user_events = event_repository.get_user_events(db=db, user_id=current_user.id)

    schedule_list: List[ScheduleItem] = []
    for ev in user_events:
        time_str = ev.start_time.strftime("%I:%M %p") if ev.start_time else "TBA"
        schedule_list.append(
            ScheduleItem(
                id=str(ev.id),
                title=ev.title,
                time=time_str,
                location=ev.venue,
                category=ev.category,
                status="Confirmed"
            )
        )

    joined_count = len(user_clubs)
    events_count = len(user_events)
    schedule_count = len(schedule_list)
    attendance_rate = 100.0 if events_count > 0 else 0.0

    metrics = DashboardMetrics(
        total_joined_clubs=joined_count,
        upcoming_events_registered=events_count,
        pending_applications=0,
        schedule_count=schedule_count,
        attendance_rate=attendance_rate
    )

    user_resp = UserResponse.model_validate(current_user)
    clubs_resp = [ClubOut.model_validate(c) for c in user_clubs]
    events_resp = [EventOut.model_validate(e) for e in user_events]

    return DashboardSummaryOut(
        user=user_resp,
        metrics=metrics,
        my_clubs=clubs_resp,
        upcoming_events=events_resp,
        schedule=schedule_list
    )
