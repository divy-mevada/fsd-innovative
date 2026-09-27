from sqlalchemy.orm import Session
from app.models.user import User, UserRole
from app.core.security import hash_password


def init_db(db: Session) -> None:
    """
    Seeds initial system accounts such as the default Admin user.
    """
    admin_email = "admin@university.edu"
    admin_username = "admin"

    existing_admin = db.query(User).filter(
        (User.email == admin_email) | (User.username == admin_username)
    ).first()

    if not existing_admin:
        admin_user = User(
            username=admin_username,
            full_name="System Administrator",
            email=admin_email,
            password_hash=hash_password("AdminSecret123"),
            department="University Governance",
            role=UserRole.ADMIN,
            is_active=True
        )
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        print("✓ Initial Admin user seeded: admin@university.edu / admin (Password: AdminSecret123)")
    else:
        # Ensure role is set to ADMIN
        if existing_admin.role != UserRole.ADMIN:
            existing_admin.role = UserRole.ADMIN
            db.commit()
