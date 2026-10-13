from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from app.core.config import settings
from app.api.v1.router import api_router
from app.db.session import engine, Base

# Create tables automatically on startup (for quick local setup & SQLite dev)
Base.metadata.create_all(bind=engine)

# Ensure roll_number column exists in users table for SQLite dev
from sqlalchemy import text, inspect
try:
    with engine.connect() as conn:
        inspector = inspect(engine)
        if "users" in inspector.get_table_names():
            columns = [col["name"] for col in inspector.get_columns("users")]
            if "roll_number" not in columns:
                conn.execute(text("ALTER TABLE users ADD COLUMN roll_number VARCHAR(50)"))
                conn.commit()
                print("✓ Added roll_number column to users table.")
        if "events" in inspector.get_table_names():
            ev_columns = [col["name"] for col in inspector.get_columns("events")]
            if "google_form_url" not in ev_columns:
                conn.execute(text("ALTER TABLE events ADD COLUMN google_form_url VARCHAR(500)"))
                conn.commit()
                print("✓ Added google_form_url column to events table.")
except Exception as e:
    print(f"Notice: SQLite column check: {e}")

# Seed initial admin user if not exists
from app.db.session import SessionLocal
from app.db.init_db import init_db

try:
    with SessionLocal() as db_session:
        init_db(db_session)
except Exception as e:
    print(f"Warning: Failed to seed admin user on startup: {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Format Pydantic validation errors nicely for frontend consumption.
    """
    errors = []
    for err in exc.errors():
        field = " -> ".join([str(loc) for loc in err["loc"] if loc != "body"])
        errors.append({
            "field": field,
            "message": err["msg"]
        })
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "detail": "Validation error occurred.",
            "errors": errors
        }
    )


@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "online",
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION
    }


# Include API v1 router under /api
app.include_router(api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
