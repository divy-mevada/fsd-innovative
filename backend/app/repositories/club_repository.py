import uuid
from typing import List, Optional
from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.models.club import Club
from app.models.club_member import ClubMember, ClubMemberRole, ClubMemberStatus
from app.schemas.club import ClubCreate, ClubUpdate


class ClubRepository:
    @staticmethod
    def get_all(db: Session, category: Optional[str] = None, search: Optional[str] = None) -> List[Club]:
        query = db.query(Club).filter(Club.is_active == True)
        if category and category.lower() != 'all':
            query = query.filter(Club.category.ilike(f"%{category}%"))
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    Club.name.ilike(search_term),
                    Club.description.ilike(search_term),
                    Club.department.ilike(search_term)
                )
            )
        return query.order_by(Club.created_at.desc()).all()

    @staticmethod
    def get_by_id(db: Session, club_id: uuid.UUID) -> Optional[Club]:
        return db.query(Club).filter(Club.id == club_id).first()

    @staticmethod
    def get_by_slug(db: Session, slug: str) -> Optional[Club]:
        return db.query(Club).filter(Club.slug == slug.lower().strip()).first()

    @staticmethod
    def create(db: Session, club_in: ClubCreate) -> Club:
        db_club = Club(
            name=club_in.name.strip(),
            slug=club_in.slug.lower().strip(),
            category=club_in.category.strip(),
            description=club_in.description.strip(),
            department=club_in.department,
            banner_url=club_in.banner_url,
            logo_url=club_in.logo_url,
            badge_text=club_in.badge_text,
            is_active=True
        )
        db.add(db_club)
        db.commit()
        db.refresh(db_club)
        return db_club

    @staticmethod
    def get_user_memberships(db: Session, user_id: uuid.UUID) -> List[ClubMember]:
        return db.query(ClubMember).filter(
            ClubMember.user_id == user_id,
            ClubMember.status == ClubMemberStatus.ACTIVE
        ).all()

    @staticmethod
    def get_user_clubs(db: Session, user_id: uuid.UUID) -> List[Club]:
        memberships = db.query(ClubMember).filter(
            ClubMember.user_id == user_id,
            ClubMember.status == ClubMemberStatus.ACTIVE
        ).all()
        club_ids = [m.club_id for m in memberships]
        if not club_ids:
            return []
        return db.query(Club).filter(Club.id.in_(club_ids), Club.is_active == True).all()

    @staticmethod
    def join_club(db: Session, user_id: uuid.UUID, club_id: uuid.UUID, role: ClubMemberRole = ClubMemberRole.MEMBER) -> ClubMember:
        existing = db.query(ClubMember).filter(
            ClubMember.user_id == user_id,
            ClubMember.club_id == club_id
        ).first()

        if existing:
            return existing

        membership = ClubMember(
            user_id=user_id,
            club_id=club_id,
            role=role,
            status=ClubMemberStatus.ACTIVE
        )
        db.add(membership)
        
        # Increment club member count
        club = db.query(Club).filter(Club.id == club_id).first()
        if club:
            club.member_count += 1
            db.add(club)

        db.commit()
        db.refresh(membership)
        return membership


club_repository = ClubRepository()
