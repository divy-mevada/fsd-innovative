import uuid
import random
from typing import List, Optional
from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.models.event import Event
from app.models.event_registration import EventRegistration, RegistrationStatus
from app.schemas.event import EventCreate


class EventRepository:
    @staticmethod
    def get_all(db: Session, category: Optional[str] = None, search: Optional[str] = None) -> List[Event]:
        query = db.query(Event).filter(Event.is_active == True)
        if category and category.lower() != 'all':
            query = query.filter(Event.category.ilike(f"%{category}%"))
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    Event.title.ilike(search_term),
                    Event.description.ilike(search_term),
                    Event.venue.ilike(search_term)
                )
            )
        return query.order_by(Event.start_time.asc()).all()

    @staticmethod
    def get_by_id(db: Session, event_id: uuid.UUID) -> Optional[Event]:
        return db.query(Event).filter(Event.id == event_id).first()

    @staticmethod
    def get_by_slug(db: Session, slug: str) -> Optional[Event]:
        return db.query(Event).filter(Event.slug == slug.lower().strip()).first()

    @staticmethod
    def create(db: Session, event_in: EventCreate) -> Event:
        db_event = Event(
            title=event_in.title.strip(),
            slug=event_in.slug.lower().strip(),
            club_id=event_in.club_id,
            category=event_in.category.strip(),
            description=event_in.description.strip(),
            venue=event_in.venue.strip(),
            start_time=event_in.start_time,
            end_time=event_in.end_time,
            banner_url=event_in.banner_url,
            capacity=event_in.capacity,
            is_free=event_in.is_free,
            ticket_price=event_in.ticket_price,
            is_active=True
        )
        db.add(db_event)
        db.commit()
        db.refresh(db_event)
        return db_event

    @staticmethod
    def get_user_registrations(db: Session, user_id: uuid.UUID) -> List[EventRegistration]:
        return db.query(EventRegistration).filter(
            EventRegistration.user_id == user_id,
            EventRegistration.status == RegistrationStatus.CONFIRMED
        ).all()

    @staticmethod
    def get_user_events(db: Session, user_id: uuid.UUID) -> List[Event]:
        registrations = db.query(EventRegistration).filter(
            EventRegistration.user_id == user_id,
            EventRegistration.status == RegistrationStatus.CONFIRMED
        ).all()
        event_ids = [r.event_id for r in registrations]
        if not event_ids:
            return []
        return db.query(Event).filter(Event.id.in_(event_ids), Event.is_active == True).all()

    @staticmethod
    def register_user_for_event(db: Session, user_id: uuid.UUID, event_id: uuid.UUID) -> EventRegistration:
        existing = db.query(EventRegistration).filter(
            EventRegistration.user_id == user_id,
            EventRegistration.event_id == event_id
        ).first()

        if existing:
            return existing

        code_rand = random.randint(10000, 99999)
        ticket_code = f"#CC-EV-{code_rand}"

        registration = EventRegistration(
            user_id=user_id,
            event_id=event_id,
            ticket_code=ticket_code,
            seat_zone="Zone A",
            status=RegistrationStatus.CONFIRMED
        )
        db.add(registration)

        # Increment event registered count
        event = db.query(Event).filter(Event.id == event_id).first()
        if event:
            event.registered_count += 1
            db.add(event)

        db.commit()
        db.refresh(registration)
        return registration


event_repository = EventRepository()
