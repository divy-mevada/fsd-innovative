import uuid
from typing import List, Optional
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
    def get_by_roll_number(db: Session, roll_number: str) -> Optional[User]:
        return db.query(User).filter(User.roll_number == roll_number.upper().strip()).first()

    @staticmethod
    def get_by_identifier(db: Session, identifier: str) -> Optional[User]:
        clean_id = identifier.strip()
        clean_lower = clean_id.lower()
        clean_upper = clean_id.upper()
        return db.query(User).filter(
            or_(
                User.email == clean_lower,
                User.username == clean_lower,
                User.roll_number == clean_upper
            )
        ).first()

    @staticmethod
    def get_all(db: Session, search: Optional[str] = None) -> List[User]:
        query = db.query(User)
        if search:
            q = f"%{search.strip()}%"
            query = query.filter(
                or_(
                    User.full_name.ilike(q),
                    User.email.ilike(q),
                    User.username.ilike(q),
                    User.roll_number.ilike(q),
                    User.department.ilike(q)
                )
            )
        return query.order_by(User.created_at.desc()).all()

    @staticmethod
    def create(db: Session, user_in: UserRegister, hashed_password: str) -> User:
        user_role = user_in.role if user_in.role else UserRole.STUDENT
        roll_num = user_in.roll_number.upper().strip() if user_in.roll_number else None
        db_user = User(
            username=user_in.username.lower().strip(),
            full_name=user_in.full_name.strip(),
            email=user_in.email.lower().strip(),
            roll_number=roll_num,
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

    @staticmethod
    def update_role(db: Session, user: User, role: UserRole) -> User:
        user.role = role
        db.add(user)
        db.commit()
        db.refresh(user)
        return user


user_repository = UserRepository()
