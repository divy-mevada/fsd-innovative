"""
Standalone Verification Script for CampusClub Backend (Auth, Dashboard, Clubs, Events).
Run this script to verify DB creation, user roles (including ADMIN), FastAPI endpoints,
and integration between frontend schemas and backend ORM models.
"""
import sys
import os
import asyncio
import httpx

# Ensure backend root is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.main import app
from app.db.session import engine, Base

async def run_backend_verification():
    print("==================================================")
    print("STARTING CAMPUSCLUB FULL BACKEND & DB VERIFICATION")
    print("==================================================")

    # Initialize tables
    Base.metadata.drop_all(bind=engine)  # Fresh test run
    Base.metadata.create_all(bind=engine)

    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver", follow_redirects=True) as client:
        test_username = "alex_chen"
        test_email = "alex.chen@university.edu"
        test_password = "SecurePassword123"

        admin_username = "admin_head"
        admin_email = "admin@university.edu"

        # 1. Register Student User
        print("\n[1/8] Testing Student Registration (POST /api/auth/register)...")
        reg_payload = {
            "username": test_username,
            "full_name": "Alex Chen",
            "email": test_email,
            "password": test_password,
            "department": "Computer Science & Engineering",
            "year": 3,
            "role": "STUDENT"
        }
        response = await client.post("/api/auth/register", json=reg_payload)
        assert response.status_code == 201, f"Student registration failed: {response.text}"
        student_data = response.json()
        print("  [OK] SUCCESS: Student registered!")
        print(f"    User ID: {student_data['id']} | Username: {student_data['username']} | Role: {student_data['role']}")

        # 2. Register Admin User
        print("\n[2/8] Testing Admin Registration (POST /api/auth/register)...")
        admin_payload = {
            "username": admin_username,
            "full_name": "System Administrator",
            "email": admin_email,
            "password": test_password,
            "department": "Dean of Student Affairs",
            "role": "ADMIN"
        }
        response = await client.post("/api/auth/register", json=admin_payload)
        assert response.status_code == 201, f"Admin registration failed: {response.text}"
        admin_data = response.json()
        print("  [OK] SUCCESS: Admin user registered with ADMIN role!")
        print(f"    Admin User ID: {admin_data['id']} | Role: {admin_data['role']}")

        # 3. Login User with Identifier (Username or Email)
        print("\n[3/8] Testing Login with Username Identifier (POST /api/auth/login)...")
        login_payload = {
            "identifier": test_username,
            "password": test_password
        }
        response = await client.post("/api/auth/login", json=login_payload)
        assert response.status_code == 200, f"Login failed: {response.text}"
        login_data = response.json()
        student_token = login_data["access_token"]
        print("  [OK] SUCCESS: Logged in using username!")

        # Login Admin
        admin_login_resp = await client.post("/api/auth/login", json={"identifier": admin_email, "password": test_password})
        assert admin_login_resp.status_code == 200, f"Admin login failed: {admin_login_resp.text}"
        admin_token = admin_login_resp.json()["access_token"]

        # 4. Create Club as Admin
        print("\n[4/8] Testing Club Creation by Admin (POST /api/clubs)...")
        admin_headers = {"Authorization": f"Bearer {admin_token}"}
        club_payload = {
            "name": "ACM Student Chapter",
            "slug": "acm-student-chapter",
            "category": "Technical",
            "description": "Premier coding and algorithmic society hosting annual hackathons.",
            "department": "Dept. of Computer Science",
            "badge_text": "Top 1% Chapter"
        }
        club_resp = await client.post("/api/clubs", json=club_payload, headers=admin_headers)
        if club_resp.status_code != 201:
            print(f"  [ERROR] Create club status code: {club_resp.status_code}, Body: {club_resp.text}")
        assert club_resp.status_code == 201, f"Create club failed: {club_resp.text}"
        club_data = club_resp.json()
        club_id = club_data["id"]
        print(f"  [OK] SUCCESS: Created Club '{club_data['name']}' (ID: {club_id})!")

        # 5. Join Club as Student
        print("\n[5/8] Testing Student Join Club (POST /api/clubs/{id}/join)...")
        student_headers = {"Authorization": f"Bearer {student_token}"}
        join_resp = await client.post(f"/api/clubs/{club_id}/join", json={"role": "MEMBER"}, headers=student_headers)
        assert join_resp.status_code == 200, f"Join club failed: {join_resp.text}"
        print("  [OK] SUCCESS: Student joined ACM Student Chapter!")

        # 6. Create Event as Admin
        print("\n[6/8] Testing Event Creation by Admin (POST /api/events)...")
        event_payload = {
            "title": "Annual AI & Cloud Summit 2025",
            "slug": "annual-ai-cloud-summit-2025",
            "club_id": club_id,
            "category": "Technical",
            "description": "Keynotes, hands-on cloud labs, and networking sessions.",
            "venue": "Turing Hall, Campus Tech Hub 3F",
            "start_time": "2025-11-14T10:00:00Z",
            "capacity": 200,
            "is_free": True,
            "ticket_price": "Free"
        }
        event_resp = await client.post("/api/events", json=event_payload, headers=admin_headers)
        assert event_resp.status_code == 201, f"Create event failed: {event_resp.text}"
        event_data = event_resp.json()
        event_id = event_data["id"]
        print(f"  [OK] SUCCESS: Created Event '{event_data['title']}' (ID: {event_id})!")

        # 7. Register Student for Event
        print("\n[7/8] Testing Student Event Registration (POST /api/events/{id}/register)...")
        reg_resp = await client.post(f"/api/events/{event_id}/register", headers=student_headers)
        assert reg_resp.status_code == 200, f"Event registration failed: {reg_resp.text}"
        ticket_data = reg_resp.json()
        print(f"  [OK] SUCCESS: Student registered for Event! Issued Ticket: {ticket_data['ticket_code']}")

        # 8. Fetch Dashboard Summary
        print("\n[8/8] Testing Unified Dashboard Summary (GET /api/dashboard/summary)...")
        dash_resp = await client.get("/api/dashboard/summary", headers=student_headers)
        assert dash_resp.status_code == 200, f"Dashboard fetch failed: {dash_resp.text}"
        dash_data = dash_resp.json()
        print("  [OK] SUCCESS: Retrieved unified dashboard state!")
        print(f"    User: {dash_data['user']['full_name']} (@{dash_data['user']['username']})")
        print(f"    Total Joined Clubs: {dash_data['metrics']['total_joined_clubs']}")
        print(f"    Upcoming Events Registered: {dash_data['metrics']['upcoming_events_registered']}")
        print(f"    Schedule Items: {len(dash_data['schedule'])}")

        print("\n==================================================")
        print("ALL BACKEND & DATABASE INTEGRATION TESTS PASSED!")
        print("==================================================")

if __name__ == "__main__":
    asyncio.run(run_backend_verification())
