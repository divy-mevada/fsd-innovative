import uuid
from typing import Optional
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
    def create(db: Session, user_in: UserRegister, hashed_password: str) -> User:
        db_user = User(
            full_name=user_in.full_name.strip(),
            email=user_in.email.lower().strip(),
            password_hash=hashed_password,
            department=user_in.department,
            year=user_in.year,
            role=UserRole.STUDENT,
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
