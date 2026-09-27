import uuid
from typing import Optional
from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.models.user import User, UserRole
from app.schemas.user import UserRegister


class UserRepository:
    @staticmethod
    def get_by_id(db: Session, user_id: uuid.UUID) -> Optional[User]:
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def get_by_email(db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email.lower().strip()).first()

    @staticmethod
    def get_by_username(db: Session, username: str) -> Optional[User]:
        return db.query(User).filter(User.username == username.lower().strip()).first()

    @staticmethod
    def get_by_identifier(db: Session, identifier: str) -> Optional[User]:
        clean_id = identifier.lower().strip()
        return db.query(User).filter(
            or_(User.email == clean_id, User.username == clean_id)
        ).first()

    @staticmethod
    def create(db: Session, user_in: UserRegister, hashed_password: str) -> User:
        user_role = user_in.role if user_in.role else UserRole.STUDENT
        db_user = User(
            username=user_in.username.lower().strip(),
            full_name=user_in.full_name.strip(),
            email=user_in.email.lower().strip(),
            password_hash=hashed_password,
            department=user_in.department,
            year=user_in.year,
            role=user_role,
            is_active=True
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def update_password(db: Session, user: User, hashed_password: str) -> User:
        user.password_hash = hashed_password
        db.add(user)
        db.commit()
        db.refresh(user)
        return user


user_repository = UserRepository()
