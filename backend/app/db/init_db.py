# pyrefly: ignore [missing-import]
from sqlalchemy.orm import Session
from app.models.user import User, UserRole
from app.core.security import hash_password


def init_db(db: Session) -> None:
    """
    Seeds initial system accounts such as Admin and default student test accounts.
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
            roll_number="ADM001",
            password_hash=hash_password("AdminSecret123"),
            department="University Governance",
            role=UserRole.ADMIN,
            is_active=True
        )
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        print("Initial Admin user seeded: admin@university.edu / admin (Password: AdminSecret123)")
    else:
        if not existing_admin.roll_number:
            existing_admin.roll_number = "ADM001"
        if existing_admin.role != UserRole.ADMIN:
            existing_admin.role = UserRole.ADMIN
        db.commit()

    # Seed initial test student accounts with roll numbers
    sample_students = [
        {
            "username": "student",
            "full_name": "Standard Student Account",
            "email": "student@university.edu",
            "roll_number": "23BCE001",
            "department": "Computer Science & Engineering",
            "year": 3,
            "role": UserRole.STUDENT,
        },
        {
            "username": "alex_chen",
            "full_name": "Alex Chen",
            "email": "alex.chen@university.edu",
            "roll_number": "22BCE104",
            "department": "Computer Science & Engineering",
            "year": 3,
            "role": UserRole.EXECUTIVE,
        },
        {
            "username": "sarah_j",
            "full_name": "Sarah Jenkins",
            "email": "sarah.j@university.edu",
            "roll_number": "22BIT055",
            "department": "Information Technology",
            "year": 4,
            "role": UserRole.CLUB_MEMBER,
        },
        {
            "username": "rohan_sharma",
            "full_name": "Rohan Sharma",
            "email": "rohan.sharma@university.edu",
            "roll_number": "23BME022",
            "department": "Mechanical Engineering",
            "year": 2,
            "role": UserRole.CLUB_MEMBER,
        },
        {
            "username": "ananya_p",
            "full_name": "Ananya Patel",
            "email": "ananya.p@university.edu",
            "roll_number": "22BEC088",
            "department": "Electronics & Communication",
            "year": 3,
            "role": UserRole.STUDENT,
        },
    ]

    for s in sample_students:
        existing = db.query(User).filter(User.email == s["email"]).first()
        if not existing:
            new_student = User(
                username=s["username"],
                full_name=s["full_name"],
                email=s["email"],
                roll_number=s["roll_number"],
                password_hash=hash_password("SecurePassword123"),
                department=s["department"],
                year=s.get("year", 3),
                role=s.get("role", UserRole.STUDENT),
                is_active=True
            )
            db.add(new_student)
            print(f"Seeded student account: {s['email']} ({s['roll_number']})")
        else:
            if not existing.roll_number:
                existing.roll_number = s["roll_number"]
            db.add(existing)

    db.commit()
