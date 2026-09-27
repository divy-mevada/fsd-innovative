from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User, UserRole
from app.models.event import Event
from app.schemas.event import EventCreate, EventUpdate, EventOut, EventRegistrationOut
from app.repositories.event_repository import event_repository
from app.api.deps import get_current_user, require_role

router = APIRouter()


@router.get(
    "/",
    response_model=List[EventOut],
    status_code=status.HTTP_200_OK,
    summary="List all upcoming events"
)
def list_events(
    category: Optional[str] = Query(None, description="Filter by category"),
    search: Optional[str] = Query(None, description="Search by title, description, or venue"),
    db: Session = Depends(get_db)
):
    """
    Returns list of upcoming events. Supports category and search filters.
    """
    return event_repository.get_all(db=db, category=category, search=search)


@router.get(
    "/{event_identifier}",
    response_model=EventOut,
    status_code=status.HTTP_200_OK,
    summary="Get event by ID or Slug"
)
def get_event(
    event_identifier: str,
    db: Session = Depends(get_db)
):
    """
    Fetch single event details by UUID or URL slug.
    """
    event = None
    try:
        import uuid
        e_uuid = uuid.UUID(event_identifier)
        event = event_repository.get_by_id(db=db, event_id=e_uuid)
    except ValueError:
        event = event_repository.get_by_slug(db=db, slug=event_identifier)

    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found."
        )
    return event


@router.post(
    "/",
    response_model=EventOut,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new event (Admin / Club Head / Executive)"
)
def create_event(
    event_in: EventCreate,
    current_user: User = Depends(require_role([UserRole.ADMIN, UserRole.CLUB_HEAD, UserRole.EXECUTIVE])),
    db: Session = Depends(get_db)
):
    """
    Allows Admin, Club Head, or Executive users to create a new event.
    """
    existing_slug = event_repository.get_by_slug(db=db, slug=event_in.slug)
    if existing_slug:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An event with this slug already exists."
        )
    return event_repository.create(db=db, event_in=event_in)


@router.post(
    "/{event_id}/register",
    response_model=EventRegistrationOut,
    status_code=status.HTTP_200_OK,
    summary="Register for an event and receive ticket code"
)
def register_for_event(
    event_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Registers authenticated user for an event and issues ticket pass.
    """
    import uuid
    try:
        e_uuid = uuid.UUID(event_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid event ID format.")

    event = event_repository.get_by_id(db=db, event_id=e_uuid)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found.")

    return event_repository.register_user_for_event(db=db, user_id=current_user.id, event_id=e_uuid)
