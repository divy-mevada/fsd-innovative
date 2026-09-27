import uuid
from typing import Callable, List, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User, UserRole
from app.core import security
from app.core.config import settings
from app.repositories.user_repository import user_repository

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login", auto_error=False)


def get_current_user(
    db: Session = Depends(get_db),
    token: Optional[str] = Depends(oauth2_scheme)
) -> User:
    """
    Validates access token from Bearer header and retrieves authenticated active user.
    """
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication credentials were not provided.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = security.decode_token(token, settings.JWT_SECRET_KEY)
    if not payload or payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials or token has expired.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id_str: str = payload.get("sub")
    if not user_id_str:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        user_id = uuid.UUID(user_id_str)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token subject formatting.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = user_repository.get_by_id(db, user_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user account."
        )

    return user


def require_authenticated_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Explicit dependency ensuring user is authenticated and active.
    """
    return current_user


def require_role(allowed_roles: List[UserRole]) -> Callable:
    """
    Dependency factory returning a validator for global user roles.
    Example: Depends(require_role([UserRole.EXECUTIVE, UserRole.CLUB_HEAD]))
    """
    def role_checker(current_user: User = Depends(get_current_user)) -> User:
        user_role_val = current_user.role.value if hasattr(current_user.role, "value") else str(current_user.role)
        allowed_vals = [r.value if hasattr(r, "value") else str(r) for r in allowed_roles]
        if user_role_val not in allowed_vals:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operation not permitted. Required role: {allowed_vals}."
            )
        return current_user

    return role_checker


def require_club_role(allowed_club_roles: List[str]) -> Callable:
    """
    Architecture placeholder dependency for Phase 2 club-level authorization.
    In future phases, this will query the ClubMember join table for (user_id, club_id, club_role).
    """
    def club_role_checker(
        club_id: str,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
    ) -> User:
        # Global super-users / club heads bypass or check ClubMember repository
        if current_user.role == UserRole.CLUB_HEAD:
            return current_user

        # Architectural hook for future ClubMember relationship check:
        # member = club_member_repository.get(db, user_id=current_user.id, club_id=club_id)
        # if not member or member.role not in allowed_club_roles:
        #     raise HTTPException(status_code=403, detail="Forbidden club permission")
        
        return current_user

    return club_role_checker
