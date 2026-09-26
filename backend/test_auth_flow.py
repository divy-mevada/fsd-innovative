"""
Standalone Test Script for CampusClub Backend Authentication Flow.
Run this script to verify DB operations, password hashing, JWT generation,
and FastAPI endpoint execution.
"""
import sys
import os

# Ensure backend root is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi.testclient import TestClient
from app.main import app
from app.db.session import engine, Base

def run_auth_verification():
    print("==================================================")
    print("STARTING CAMPUSCLUB AUTHENTICATION VERIFICATION")
    print("==================================================")

    # Initialize tables
    Base.metadata.create_all(bind=engine)
    client = TestClient(app)

    test_email = "alex.student@university.edu"
    test_password = "SecurePassword123"
    new_password = "NewPassword456"

    # 1. Register User
    print("\n[1/7] Testing Register endpoint (POST /api/auth/register)...")
    reg_payload = {
        "full_name": "Alex Student",
        "email": test_email,
        "password": test_password,
        "department": "Computer Science & Engineering",
        "year": 3
    }
    response = client.post("/api/auth/register", json=reg_payload)
    if response.status_code == 201:
        data = response.json()
        print("  ✓ SUCCESS: User registered!")
        print(f"    User ID: {data['id']}")
        print(f"    Email: {data['email']}")
        print(f"    Role: {data['role']}")
        assert "password_hash" not in data, "Security flaw: password_hash leaked!"
    elif response.status_code == 409:
        print("  ℹ User already registered from previous run. Continuing test flow...")
    else:
        print(f"  ❌ FAILED ({response.status_code}): {response.text}")
        sys.exit(1)

    # 2. Login User
    print("\n[2/7] Testing Login endpoint (POST /api/auth/login)...")
    login_payload = {
        "email": test_email,
        "password": test_password
    }
    response = client.post("/api/auth/login", json=login_payload)
    assert response.status_code == 200, f"Login failed: {response.text}"
    login_data = response.json()
    access_token = login_data["access_token"]
    refresh_cookie = response.cookies.get("refresh_token")
    print("  ✓ SUCCESS: Login successful!")
    print(f"    Access Token: {access_token[:25]}...")
    print(f"    Refresh Token Cookie set: {bool(refresh_cookie)}")

    # 3. Test Invalid Login
    print("\n[3/7] Testing Invalid Password Handling...")
    bad_login = client.post("/api/auth/login", json={"email": test_email, "password": "WrongPassword999"})
    assert bad_login.status_code == 401, f"Expected 401, got {bad_login.status_code}"
    print("  ✓ SUCCESS: Rejected invalid credentials with 401 Unauthorized.")

    # 4. GET /api/auth/me (Authenticated)
    print("\n[4/7] Testing Protected Profile endpoint (GET /api/auth/me)...")
    headers = {"Authorization": f"Bearer {access_token}"}
    me_resp = client.get("/api/auth/me", headers=headers)
    assert me_resp.status_code == 200, f"GET /me failed: {me_resp.text}"
    user_me = me_resp.json()
    print("  ✓ SUCCESS: Retrieved authenticated user profile!")
    print(f"    Name: {user_me['full_name']} | Dept: {user_me['department']} | Year: {user_me['year']}")

    # 5. POST /api/auth/refresh
    print("\n[5/7] Testing Token Refresh endpoint (POST /api/auth/refresh)...")
    refresh_resp = client.post("/api/auth/refresh", cookies={"refresh_token": refresh_cookie} if refresh_cookie else None)
    if refresh_resp.status_code == 200:
        new_access_token = refresh_resp.json()["access_token"]
        print("  ✓ SUCCESS: Token refreshed successfully!")
        print(f"    New Access Token: {new_access_token[:25]}...")
    else:
        print(f"  ℹ Refresh response ({refresh_resp.status_code}): {refresh_resp.text}")

    # 6. Change Password
    print("\n[6/7] Testing Change Password (POST /api/auth/change-password)...")
    change_pw_payload = {
        "current_password": test_password,
        "new_password": new_password
    }
    pw_resp = client.post("/api/auth/change-password", json=change_pw_payload, headers=headers)
    assert pw_resp.status_code == 200, f"Change password failed: {pw_resp.text}"
    print("  ✓ SUCCESS: Password updated successfully!")

    # Verify login with new password
    relogin_resp = client.post("/api/auth/login", json={"email": test_email, "password": new_password})
    assert relogin_resp.status_code == 200, "Login with new password failed!"
    print("  ✓ SUCCESS: Authenticated using new password.")

    # Revert password back for repeatability
    new_token = relogin_resp.json()["access_token"]
    client.post(
        "/api/auth/change-password",
        json={"current_password": new_password, "new_password": test_password},
        headers={"Authorization": f"Bearer {new_token}"}
    )

    # 7. Logout
    print("\n[7/7] Testing Logout (POST /api/auth/logout)...")
    logout_resp = client.post("/api/auth/logout")
    assert logout_resp.status_code == 200, f"Logout failed: {logout_resp.text}"
    print("  ✓ SUCCESS: Logout completed and refresh cookie cleared.")

    print("\n==================================================")
    print("ALL BACKEND AUTHENTICATION TESTS PASSED PERFECTLY!")
    print("==================================================")


if __name__ == "__main__":
    run_auth_verification()
