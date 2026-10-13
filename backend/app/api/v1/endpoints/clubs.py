from typing import List, Optional
import uuid
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User, UserRole
from app.models.club import Club
from app.schemas.club import (
    ClubCreate, ClubUpdate, ClubOut, ClubMemberOut, ClubJoinInput,
    ClubMemberDetailOut, MemberRoleUpdate, ClubApplyInput
)
from app.schemas.chat import ChatMessageCreate, ChatMessageResponse
from app.repositories.club_repository import club_repository
from app.repositories.chat_repository import chat_repository
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
    club = None
    try:
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
    existing_slug = club_repository.get_by_slug(db=db, slug=club_in.slug)
    if existing_slug:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A club with this slug already exists."
        )
    return club_repository.create(db=db, club_in=club_in)


@router.post(
    "/{club_id}/apply",
    response_model=ClubMemberOut,
    status_code=status.HTTP_200_OK,
    summary="Apply to join a club (pending Club Head approval)"
)
def apply_to_club(
    club_id: str,
    apply_in: Optional[ClubApplyInput] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        c_uuid = uuid.UUID(club_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid club ID format.")

    club = club_repository.get_by_id(db=db, club_id=c_uuid)
    if not club:
        raise HTTPException(status_code=404, detail="Club not found.")

    return club_repository.apply_to_club(db=db, user_id=current_user.id, club_id=c_uuid)


@router.post(
    "/{club_id}/join",
    response_model=ClubMemberOut,
    status_code=status.HTTP_200_OK,
    summary="Join a club directly (or submit application)"
)
def join_club(
    club_id: str,
    join_input: Optional[ClubJoinInput] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
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


@router.get(
    "/{club_id}/members",
    response_model=List[ClubMemberDetailOut],
    status_code=status.HTTP_200_OK,
    summary="Get active members in a club"
)
def get_club_members(
    club_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        c_uuid = uuid.UUID(club_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid club ID format.")
    return club_repository.get_club_members(db=db, club_id=c_uuid)


@router.get(
    "/{club_id}/applications",
    response_model=List[ClubMemberDetailOut],
    status_code=status.HTTP_200_OK,
    summary="Get pending applications for a club (Club Head / Admin)"
)
def get_pending_applications(
    club_id: str,
    current_user: User = Depends(require_role([UserRole.ADMIN, UserRole.CLUB_HEAD, UserRole.EXECUTIVE])),
    db: Session = Depends(get_db)
):
    try:
        c_uuid = uuid.UUID(club_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid club ID format.")
    return club_repository.get_pending_applications(db=db, club_id=c_uuid)


@router.post(
    "/{club_id}/applications/{member_id}/accept",
    response_model=ClubMemberOut,
    status_code=status.HTTP_200_OK,
    summary="Accept pending club application"
)
def accept_application(
    club_id: str,
    member_id: str,
    current_user: User = Depends(require_role([UserRole.ADMIN, UserRole.CLUB_HEAD])),
    db: Session = Depends(get_db)
):
    try:
        m_uuid = uuid.UUID(member_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid member ID.")
    accepted = club_repository.accept_application(db=db, member_id=m_uuid)
    if not accepted:
        raise HTTPException(status_code=404, detail="Application not found.")
    return accepted


@router.post(
    "/{club_id}/applications/{member_id}/reject",
    response_model=ClubMemberOut,
    status_code=status.HTTP_200_OK,
    summary="Decline pending club application"
)
def reject_application(
    club_id: str,
    member_id: str,
    current_user: User = Depends(require_role([UserRole.ADMIN, UserRole.CLUB_HEAD])),
    db: Session = Depends(get_db)
):
    try:
        m_uuid = uuid.UUID(member_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid member ID.")
    rejected = club_repository.reject_application(db=db, member_id=m_uuid)
    if not rejected:
        raise HTTPException(status_code=404, detail="Application not found.")
    return rejected


@router.put(
    "/{club_id}/members/{user_id}/role",
    response_model=ClubMemberOut,
    status_code=status.HTTP_200_OK,
    summary="Promote or demote club member role"
)
def update_member_role(
    club_id: str,
    user_id: str,
    role_in: MemberRoleUpdate,
    current_user: User = Depends(require_role([UserRole.ADMIN, UserRole.CLUB_HEAD])),
    db: Session = Depends(get_db)
):
    try:
        c_uuid = uuid.UUID(club_id)
        u_uuid = uuid.UUID(user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid ID format.")
    updated = club_repository.update_member_role(db=db, club_id=c_uuid, user_id=u_uuid, new_role=role_in.role)
    if not updated:
        raise HTTPException(status_code=404, detail="Club member not found.")
    return updated


@router.delete(
    "/{club_id}/members/{user_id}",
    status_code=status.HTTP_200_OK,
    summary="Remove member from club"
)
def remove_member(
    club_id: str,
    user_id: str,
    current_user: User = Depends(require_role([UserRole.ADMIN, UserRole.CLUB_HEAD])),
    db: Session = Depends(get_db)
):
    try:
        c_uuid = uuid.UUID(club_id)
        u_uuid = uuid.UUID(user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid ID format.")
    removed = club_repository.remove_member(db=db, club_id=c_uuid, user_id=u_uuid)
    if not removed:
        raise HTTPException(status_code=404, detail="Club member not found.")
    return {"message": "Member removed successfully"}


def resolve_club_uuid(db: Session, club_id: str) -> uuid.UUID:
    """
    Resolve club ID to a canonical UUID, handling direct UUIDs, database slugs,
    and common aliases (e.g. acm_student_chapter -> acm_chapter).
    """
    try:
        return uuid.UUID(club_id)
    except ValueError:
        pass

    cleaned = club_id.lower().strip()
    canonical_slug = cleaned
    if "acm" in cleaned:
        canonical_slug = "acm_chapter"
    elif "csi" in cleaned:
        canonical_slug = "csi_chapter"

    club = club_repository.get_by_slug(db=db, slug=canonical_slug)
    if not club and canonical_slug != cleaned:
        club = club_repository.get_by_slug(db=db, slug=cleaned)

    if club:
        return club.id
    return uuid.uuid5(uuid.NAMESPACE_DNS, canonical_slug)


@router.get(
    "/{club_id}/messages",
    response_model=List[ChatMessageResponse],
    status_code=status.HTTP_200_OK,
    summary="Get club chat message history"
)
def get_club_messages(
    club_id: str,
    channel: str = Query("general", description="Channel name (e.g. general, announcements, events-team)"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    c_uuid = resolve_club_uuid(db=db, club_id=club_id)

    messages = chat_repository.get_messages(db=db, club_id=c_uuid, channel=channel)
    res = []
    for m in messages:
        sender_name = m.user.full_name if m.user else "Club Member"
        sender_role = m.user.role.value if m.user else "MEMBER"
        res.append(
            ChatMessageResponse(
                id=m.id,
                club_id=m.club_id,
                sender_id=m.sender_id,
                sender_name=sender_name,
                sender_role=sender_role,
                content=m.content,
                channel=m.channel,
                created_at=m.created_at
            )
        )
    return res


@router.post(
    "/{club_id}/messages",
    response_model=ChatMessageResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Post a message to club chat"
)
def create_club_message(
    club_id: str,
    msg_in: ChatMessageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    c_uuid = resolve_club_uuid(db=db, club_id=club_id)

    from app.repositories.chat_repository import chat_repository
    msg = chat_repository.create_message(db=db, club_id=c_uuid, sender_id=current_user.id, msg_in=msg_in)
    return ChatMessageResponse(
        id=msg.id,
        club_id=msg.club_id,
        sender_id=msg.sender_id,
        sender_name=current_user.full_name,
        sender_role=current_user.role.value,
        content=msg.content,
        channel=msg.channel,
        created_at=msg.created_at
    )
