import re
import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator
from app.models.user import UserRole


class UserRegister(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, description="Unique username")
    full_name: str = Field(..., min_length=2, max_length=100, description="Full name of the user")
    email: EmailStr = Field(..., description="University or personal email address")
    roll_number: Optional[str] = Field(None, max_length=50, description="University roll number or student ID")
    password: str = Field(..., min_length=8, description="Password must be at least 8 characters long")
    department: Optional[str] = Field(None, max_length=100)
    year: Optional[int] = Field(None, ge=1, le=6, description="Academic year (1-6)")
    role: Optional[UserRole] = Field(UserRole.STUDENT, description="User role (STUDENT, CLUB_MEMBER, EXECUTIVE, CLUB_HEAD, ADMIN)")

    @field_validator("username")
    @classmethod
    def validate_username(cls, v: str) -> str:
        clean = v.strip()
        if not re.match(r"^[a-zA-Z0-9_.]+$", clean):
            raise ValueError("Username can only contain letters, numbers, underscores, and dots.")
        return clean.lower()

    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        if not re.search(r"[A-Za-z]", v):
            raise ValueError("Password must contain at least one letter.")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one number.")
        return v


class UserLogin(BaseModel):
    identifier: str = Field(..., description="Username or Email address")
    password: str = Field(..., description="User password")


class UserResponse(BaseModel):
    id: uuid.UUID
    username: str
    full_name: str
    email: EmailStr
    roll_number: Optional[str] = None
    profile_image: Optional[str] = None
    department: Optional[str] = None
    year: Optional[int] = None
    role: UserRole
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }


class ChangePassword(BaseModel):
    current_password: str
    new_password: str = Field(..., min_length=8)

    @field_validator("new_password")
    @classmethod
    def validate_new_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("New password must be at least 8 characters long.")
        if not re.search(r"[A-Za-z]", v):
            raise ValueError("New password must contain at least one letter.")
        if not re.search(r"\d", v):
            raise ValueError("New password must contain at least one number.")
        return v


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class RefreshTokenInput(BaseModel):
    refresh_token: Optional[str] = None


class MessageResponse(BaseModel):
    message: str


class UserRoleUpdate(BaseModel):
    role: UserRole
