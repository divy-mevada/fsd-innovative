from fastapi import APIRouter
from app.api.v1.endpoints import auth, dashboard, clubs, events

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(clubs.router, prefix="/clubs", tags=["Clubs"])
api_router.include_router(events.router, prefix="/events", tags=["Events"])
