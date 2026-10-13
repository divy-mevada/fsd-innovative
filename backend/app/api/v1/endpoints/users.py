import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User, UserRole
from app.schemas.user import UserResponse, UserRoleUpdate
from app.repositories.user_repository import user_repository
from app.api.deps import require_role

router = APIRouter()


@router.get(
    "",
    response_model=List[UserResponse],
    status_code=status.HTTP_200_OK,
    summary="List and search users by Roll Number, Email, Name, or Department (Admin only)"
)
@router.get(
    "/",
    response_model=List[UserResponse],
    status_code=status.HTTP_200_OK,
    include_in_schema=False
)
def list_users(
    search: Optional[str] = Query(None, description="Search query for Roll Number, Email, Name, or Department"),
    current_user: User = Depends(require_role([UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    """
    Returns list of registered users. Supports keyword search by roll number, email, or name.
    """
    return user_repository.get_all(db=db, search=search)


@router.patch(
    "/{user_id}/role",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
    summary="Update user global role (Admin only)"
)
def update_user_role(
    user_id: uuid.UUID,
    role_body: Optional[UserRoleUpdate] = None,
    role: Optional[UserRole] = Query(None, description="New role to assign via query param"),
    current_user: User = Depends(require_role([UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    """
    Updates the system role of a specified user. Accepts role in JSON payload or query param.
    """
    assigned_role = role_body.role if role_body and role_body.role else role
    if not assigned_role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role must be specified in request body or query parameter."
        )

    target_user = user_repository.get_by_id(db=db, user_id=user_id)
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )

    return user_repository.update_role(db=db, user=target_user, role=assigned_role)
