from typing import Optional
from fastapi import APIRouter, Depends, Response, Request, status, Cookie
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import (
    UserRegister,
    UserLogin,
    UserResponse,
    TokenResponse,
    ChangePassword,
    RefreshTokenInput,
    MessageResponse
)
from app.services.auth_service import auth_service
from app.api.deps import get_current_user
from app.core.config import settings

router = APIRouter()

COOKIE_NAME = "refresh_token"


def set_refresh_cookie(response: Response, refresh_token: str) -> None:
    is_secure = settings.FRONTEND_URL.startswith("https://")
    response.set_cookie(
        key=COOKIE_NAME,
        value=refresh_token,
        httponly=True,
        samesite="lax",
        secure=is_secure,
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400,
        path="/api/auth"
    )


def clear_refresh_cookie(response: Response) -> None:
    response.delete_cookie(
        key=COOKIE_NAME,
        path="/api/auth"
    )


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user"
)
def register(
    user_in: UserRegister,
    db: Session = Depends(get_db)
):
    """
    Registers a new student user with validated email and password.
    Returns safe user object excluding sensitive password hash.
    """
    new_user = auth_service.register_user(db=db, user_in=user_in)
    return new_user


@router.post(
    "/login",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Authenticate user and receive tokens"
)
def login(
    login_data: UserLogin,
    response: Response,
    db: Session = Depends(get_db)
):
    """
    Authenticates user credentials. Returns JWT access token and sets secure HTTP-only refresh cookie.
    """
    user, access_token, refresh_token = auth_service.authenticate_user(db=db, login_data=login_data)
    set_refresh_cookie(response, refresh_token)
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.model_validate(user)
    )


@router.post(
    "/refresh",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Refresh access token"
)
def refresh_token(
    response: Response,
    request: Request,
    body: Optional[RefreshTokenInput] = None,
    refresh_cookie: Optional[str] = Cookie(None, alias=COOKIE_NAME),
    db: Session = Depends(get_db)
):
    """
    Generates a new access token using a valid HTTP-only refresh token cookie or request body payload.
    """
    token_str = refresh_cookie
    if not token_str and body and body.refresh_token:
        token_str = body.refresh_token

    if not token_str:
        from fastapi import HTTPException
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token missing from cookie or request body."
        )

    user, new_access_token, new_refresh_token = auth_service.refresh_user_tokens(db=db, refresh_token=token_str)
    set_refresh_cookie(response, new_refresh_token)

    return TokenResponse(
        access_token=new_access_token,
        token_type="bearer",
        user=UserResponse.model_validate(user)
    )


@router.post(
    "/logout",
    response_model=MessageResponse,
    status_code=status.HTTP_200_OK,
    summary="Logout user and clear refresh cookie"
)
def logout(response: Response):
    """
    Logs out user by invalidating and deleting HTTP-only refresh cookie.
    """
    clear_refresh_cookie(response)
    return MessageResponse(message="Successfully logged out.")


@router.get(
    "/me",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
    summary="Get current authenticated user profile"
)
def get_me(current_user: User = Depends(get_current_user)):
    """
    Returns authenticated user's profile information.
    """
    return current_user


@router.post(
    "/change-password",
    response_model=MessageResponse,
    status_code=status.HTTP_200_OK,
    summary="Change user password"
)
def change_password(
    data: ChangePassword,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Changes the authenticated user's password after verifying current password.
    """
    auth_service.change_password(db=db, user=current_user, data=data)
    return MessageResponse(message="Password successfully updated.")
