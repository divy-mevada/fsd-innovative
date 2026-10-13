import uuid
from typing import Tuple, Optional
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserRegister, UserLogin, ChangePassword
from app.repositories.user_repository import user_repository
from app.core import security
from app.core.config import settings


class AuthService:
    @staticmethod
    def register_user(db: Session, user_in: UserRegister) -> User:
        # Check unique email
        existing_email = user_repository.get_by_email(db, email=user_in.email)
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A user with this email address already exists. Please login instead."
            )

        # Check unique roll number if provided
        if user_in.roll_number:
            clean_roll = user_in.roll_number.upper().strip()
            existing_roll = user_repository.get_by_roll_number(db, roll_number=clean_roll)
            if existing_roll:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail=f"A user with roll number '{clean_roll}' is already registered."
                )

        # Check unique username, auto-resolve collision if username is taken
        base_username = (user_in.username or user_in.email.split("@")[0]).lower().strip()
        final_username = base_username
        while user_repository.get_by_username(db, username=final_username):
            final_username = f"{base_username}_{uuid.uuid4().hex[:4]}"

        user_in.username = final_username

        hashed_pwd = security.hash_password(user_in.password)
        db_user = user_repository.create(db, user_in=user_in, hashed_password=hashed_pwd)
        return db_user

    @staticmethod
    def authenticate_user(db: Session, login_data: UserLogin) -> Tuple[User, str, str]:
        user = user_repository.get_by_identifier(db, identifier=login_data.identifier)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username/email or password.",
                headers={"WWW-Authenticate": "Bearer"},
            )

        if not security.verify_password(login_data.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username/email or password.",
                headers={"WWW-Authenticate": "Bearer"},
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is inactive."
            )

        access_token = security.create_access_token(subject=user.id, role=user.role.value)
        refresh_token = security.create_refresh_token(subject=user.id)

        return user, access_token, refresh_token

    @staticmethod
    def refresh_user_tokens(db: Session, refresh_token: str) -> Tuple[User, str, str]:
        payload = security.decode_token(refresh_token, settings.JWT_REFRESH_SECRET_KEY)
        if not payload or payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired refresh token."
            )

        sub = payload.get("sub")
        if not sub:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token payload."
            )

        try:
            user_id = uuid.UUID(sub)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token subject identifier."
            )

        user = user_repository.get_by_id(db, user_id=user_id)
        if not user or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User no longer exists or is inactive."
            )

        new_access_token = security.create_access_token(subject=user.id, role=user.role.value)
        new_refresh_token = security.create_refresh_token(subject=user.id)

        return user, new_access_token, new_refresh_token

    @staticmethod
    def change_password(db: Session, user: User, data: ChangePassword) -> User:
        if not security.verify_password(data.current_password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Current password is incorrect."
            )

        hashed_pwd = security.hash_password(data.new_password)
        updated_user = user_repository.update_password(db, user=user, hashed_password=hashed_pwd)
        return updated_user


auth_service = AuthService()
