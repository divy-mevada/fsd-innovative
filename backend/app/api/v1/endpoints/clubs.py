from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User, UserRole
from app.models.club import Club
from app.schemas.club import ClubCreate, ClubUpdate, ClubOut, ClubMemberOut, ClubJoinInput
from app.repositories.club_repository import club_repository
from app.api.deps import get_current_user, require_role

router = APIRouter()


@router.get(
    "/",
    response_model=List[ClubOut],
    status_code=status.HTTP_200_OK,
    summary="List all active clubs with optional category & search filters"
)
def list_clubs(
    category: Optional[str] = Query(None, description="Filter by category (e.g., Technical, Cultural, Sports)"),
    search: Optional[str] = Query(None, description="Search query by name, description, or department"),
    db: Session = Depends(get_db)
):
    """
    Returns list of active clubs. Supports category filtering and keyword search.
    """
    return club_repository.get_all(db=db, category=category, search=search)


@router.get(
    "/{club_identifier}",
    response_model=ClubOut,
    status_code=status.HTTP_200_OK,
    summary="Get club by ID or Slug"
)
def get_club(
    club_identifier: str,
    db: Session = Depends(get_db)
):
    """
    Fetch single club details by UUID ID or URL slug.
    """
    club = None
    try:
        import uuid
        club_uuid = uuid.UUID(club_identifier)
        club = club_repository.get_by_id(db=db, club_id=club_uuid)
    except ValueError:
        club = club_repository.get_by_slug(db=db, slug=club_identifier)

    if not club:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Club not found."
        )
    return club


@router.post(
    "/",
    response_model=ClubOut,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new club (Admin / Club Head only)"
)
def create_club(
    club_in: ClubCreate,
    current_user: User = Depends(require_role([UserRole.ADMIN, UserRole.CLUB_HEAD])),
    db: Session = Depends(get_db)
):
    """
    Allows Admin or Club Head users to create a new chartered club.
    """
    existing_slug = club_repository.get_by_slug(db=db, slug=club_in.slug)
    if existing_slug:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A club with this slug already exists."
        )
    return club_repository.create(db=db, club_in=club_in)


@router.post(
    "/{club_id}/join",
    response_model=ClubMemberOut,
    status_code=status.HTTP_200_OK,
    summary="Join a club"
)
def join_club(
    club_id: str,
    join_input: Optional[ClubJoinInput] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Join a club as an active member.
    """
    import uuid
    try:
        c_uuid = uuid.UUID(club_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid club ID format.")

    club = club_repository.get_by_id(db=db, club_id=c_uuid)
    if not club:
        raise HTTPException(status_code=404, detail="Club not found.")

    requested_role = join_input.role if join_input and join_input.role else None
    role_to_assign = requested_role if requested_role else None
    if not role_to_assign:
        from app.models.club_member import ClubMemberRole
        role_to_assign = ClubMemberRole.MEMBER

    return club_repository.join_club(db=db, user_id=current_user.id, club_id=c_uuid, role=role_to_assign)
