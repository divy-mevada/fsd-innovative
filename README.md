# CampusClub — College Club Management System

**CampusClub** is a full-stack university club management platform designed for students, club members, executives, and club heads. It allows students to discover clubs and events, register for campus activities, participate in private club features (chat, tasks, announcements, resources), and manage club operations.

This repository implements **Phase 1: Monorepo Architecture & Production-Quality Authentication Foundation** built with **FastAPI**, **SQLAlchemy**, **PostgreSQL**, **Alembic**, **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🎨 Brand Design System & Color Palette

The user interface strictly adheres to the CampusClub corporate brand palette:

| Token | Color Hex | Visual Description | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `#0D47A1` | Deep Royal Navy | Navigation header, primary action buttons, main card headers |
| **Secondary** | `#2196F3` | Vibrant Electric Blue | Interactive elements, badges, focus rings, highlights |
| **Tertiary** | `#90CAF9` | Soft Sky Blue | Icons, accent borders, subtext highlights |
| **Supporting** | `#E3F2FD` | Ice Tint | Container backgrounds, subtle card fills, subtle hover states |
| **White** | `#FFFFFF` | Crisp White | Base card surfaces & clean structural components |

---

## 🏗 System Architecture & Monorepo Structure

```
campus-club/
│
├── frontend/                     # Next.js (App Router, TypeScript, Tailwind CSS)
│   ├── app/                      # Next.js App Router pages & layouts
│   │   ├── layout.tsx            # Root layout wrapped with AuthProvider, Navbar & Footer
│   │   ├── page.tsx              # Landing page showcasing platform highlights
│   │   ├── globals.css           # Design tokens, CSS variables & glassmorphism utilities
│   │   ├── login/page.tsx        # Login page with field validation & error handling
│   │   ├── register/page.tsx     # Registration page with email & password strength check
│   │   ├── dashboard/page.tsx    # Protected dashboard displaying user profile & role capabilities
│   │   ├── profile/page.tsx      # Protected account settings & change password form
│   │   ├── clubs/page.tsx        # Showcase directory of university clubs
│   │   └── events/page.tsx       # Showcase list of upcoming campus events
│   │
│   ├── components/               # Reusable UI & Layout Components
│   │   ├── Navbar.tsx            # Sticky top bar with reactive auth state & role badge
│   │   ├── Footer.tsx            # Persistent application footer
│   │   ├── ProtectedRoute.tsx    # Higher-Order Guard Component for protected pages
│   │   └── ui/                   # Modular UI components (shadcn/ui style)
│   │       ├── button.tsx        # Primary, secondary, outline, ghost & danger buttons
│   │       ├── input.tsx         # Accessible input control with inline error message
│   │       ├── label.tsx         # Form label component
│   │       ├── card.tsx          # Card container, header, title, description & content
│   │       └── badge.tsx         # Role-specific badge indicator (STUDENT, EXECUTIVE, etc.)
│   │
│   ├── lib/                      # State & API Configuration
│   │   ├── api.ts                # Axios instance with credentials & auto-refresh interceptor
│   │   ├── utils.ts              # Class name merging utility (clsx + tailwind-merge)
│   │   └── auth-context.tsx      # React Context providing global user auth state
│   │
│   ├── hooks/
│   │   └── useAuth.ts            # Custom hook exporting authentication actions & state
│   │
│   ├── services/
│   │   └── authService.ts        # API client wrapper for auth endpoints
│   │
│   ├── types/
│   │   └── auth.ts               # TypeScript types for User, Roles, Tokens & Payloads
│   │
│   ├── package.json              # Frontend dependencies & scripts
│   ├── tsconfig.json             # TypeScript configuration
│   ├── tailwind.config.js        # Brand color palette configuration
│   ├── postcss.config.js         # PostCSS plugins
│   ├── next.config.js            # Next.js configuration
│   └── .env.example              # Frontend environment variables template
│
├── backend/                      # FastAPI (Python 3.10+, SQLAlchemy 2.0, Alembic)
│   ├── app/
│   │   ├── api/                  # API endpoints & dependency injection
│   │   │   ├── deps.py           # Reusable auth & RBAC dependencies (get_current_user, require_role)
│   │   │   └── v1/
│   │   │       ├── router.py     # API v1 router aggregator
│   │   │       └── endpoints/
│   │   │           └── auth.py   # Auth endpoints (register, login, refresh, logout, me, change-password)
│   │   │
│   │   ├── core/                 # Core security & environment configuration
│   │   │   ├── config.py         # Pydantic BaseSettings loading from environment variables
│   │   │   └── security.py       # bcrypt hashing, JWT encoding/decoding & token utilities
│   │   │
│   │   ├── db/
│   │   │   └── session.py        # SQLAlchemy engine, declarative base & DB session generator
│   │   │
│   │   ├── models/
│   │   │   └── user.py           # User database model & UserRole enum definition
│   │   │
│   │   ├── schemas/
│   │   │   └── user.py           # Pydantic v2 schemas for registration, login, response & tokens
│   │   │
│   │   ├── repositories/
│   │   │   └── user_repository.py# Repository pattern for database query abstraction
│   │   │
│   │   ├── services/
│   │   │   └── auth_service.py   # Business logic for authentication, password hashing & tokens
│   │   │
│   │   └── main.py               # FastAPI initialization, CORS middleware & error handlers
│   │
│   ├── alembic/                  # Database migration management
│   │   ├── env.py                # Alembic migration environment config
│   │   └── versions/
│   │       └── 001_initial_user_table.py # Revision script for users table & enum
│   │
│   ├── alembic.ini               # Alembic database configuration
│   ├── requirements.txt          # Python dependencies
│   ├── test_auth_flow.py         # Standalone test suite verifying full auth pipeline
│   └── .env.example              # Backend environment variables template
│
├── README.md                     # Project documentation
└── .gitignore                    # Git ignore definitions
```

---

## 🔒 Authentication & Authorization Security Flow

### 1. Token Architecture
- **Access Token**: Short-lived JWT (30 minutes). Transmitted via standard `Authorization: Bearer <token>` header. Contains `sub` (User ID), `role` (`UserRole`), `type` (`"access"`), and `exp`.
- **Refresh Token**: Long-lived JWT (7 days). Stored in an **HTTP-only, SameSite=Lax, Secure** cookie (`refresh_token`). Contains `sub` (User ID), `type` (`"refresh"`), and `exp`.

### 2. Password Security
- Passwords are salted and hashed using **bcrypt** before database persistence.
- Plain-text passwords and `password_hash` are **never** exposed in API responses or response schemas (`UserResponse` excludes `password_hash`).

### 3. Role-Based Access Control (RBAC) Architecture
- **Global User Roles**: `STUDENT`, `CLUB_MEMBER`, `EXECUTIVE`, `CLUB_HEAD` defined as an Enum.
- **FastAPI Reusable Dependencies**:
  - `get_current_user`: Decodes bearer token, verifies type is `"access"`, retrieves active user from DB.
  - `require_authenticated_user`: Ensures user is logged in and active.
  - `require_role([UserRole.EXECUTIVE, UserRole.CLUB_HEAD])`: Mandates global role permissions.
  - `require_club_role(allowed_club_roles)`: Modular dependency architecture hook built for Phase 2 to query club-level join tables (`ClubMember`) without altering user model.

---

## 📡 Authentication API Endpoints

| Endpoint | Method | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Public | Registers a new user. Accepts `full_name`, `email`, `password`, `department`, `year`. |
| `/api/auth/login` | `POST` | Public | Authenticates credentials. Returns access token in body & sets HTTP-only refresh cookie. |
| `/api/auth/refresh` | `POST` | Cookie / Body | Generates new access token & rotates refresh token cookie. |
| `/api/auth/logout` | `POST` | Public | Clears the HTTP-only refresh token cookie. |
| `/api/auth/me` | `GET` | Bearer Token | Returns current authenticated user profile. |
| `/api/auth/change-password` | `POST` | Bearer Token | Updates user password after verifying current password. |

---

## 🚀 Environment Setup & Installation Guide

### Prerequisites
- **Python 3.10+**
- **Node.js 18+** & **npm 9+**
- **PostgreSQL 14+** (or SQLite for local zero-config development)

---

### Step 1: Database Setup

#### Option A: PostgreSQL Setup (Production & Standard Local)
1. Open PostgreSQL prompt or pgAdmin and create a database:
   ```sql
   CREATE DATABASE campusclub_db;
   ```
2. Set your environment variable in `backend/.env`:
   ```env
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/campusclub_db
   ```

#### Option B: SQLite Setup (Development / Test)
If PostgreSQL is not installed locally, `backend/app/core/config.py` automatically falls back to:
```env
DATABASE_URL=sqlite:///./campusclub.db
```

---

### Step 2: Backend Setup & Execution

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   # On Windows
   python -m venv venv
   .\venv\Scripts\activate

   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Create `.env` file from template:
   ```bash
   cp .env.example .env
   ```

5. Run Alembic Database Migrations:
   ```bash
   alembic upgrade head
   ```

6. Start FastAPI Development Server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   - Interactive OpenAPI Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)
   - Alternative ReDoc Documentation: [http://localhost:8000/redoc](http://localhost:8000/redoc)

7. *(Optional)* Run Standalone Authentication Test Verification:
   ```bash
   python test_auth_flow.py
   ```

---

### Step 3: Frontend Setup & Execution

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```

4. Start Next.js Development Server:
   ```bash
   npm run dev
   ```
   - Frontend Application: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing the Complete Authentication Flow

You can test the entire registration and authentication cycle:

1. **Register**: Visit [http://localhost:3000/register](http://localhost:3000/register)
   - Fill in Full Name, University Email (`student@university.edu`), Password (`SecurePassword123`), Department, and Year.
   - Click **Register Account**. The account is created and auto-logged in.

2. **Dashboard Redirect**: You will be redirected to [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
   - Verify that your user profile details, email, and role badge (`STUDENT`) are displayed correctly.

3. **Protected Route Verification**:
   - Open a private/incognito window and navigate directly to `/dashboard` or `/profile`.
   - You will be automatically redirected to `/login`.

4. **Change Password**: Visit [http://localhost:3000/profile](http://localhost:3000/profile)
   - Enter your current password and a new password (`NewPassword456`).
   - Click **Update Password**.

5. **Logout**: Click **Logout** in the top navigation bar.
   - Your session token is removed and the HTTP-only refresh cookie is cleared.

---

## 🔮 Phase 2 Roadmap & Future Extensibility

The modular architecture built in Phase 1 allows adding future modules without restructuring the repository:

- 🏛 **Clubs Module**: Club creation, approval workflows, and categories.
- 👥 **Club Membership**: Joining requests, executive roles per club, and role-based permissions (`require_club_role`).
- 📅 **Events & QR Attendance**: Event scheduling, ticket generation, and QR code check-in scanner.
- 📋 **Tasks & Kanban**: Club task assignment, progress boards, and executive tracking.
- 💬 **Real-time Chat & WebSockets**: Private club channels, announcements, and direct messaging.
- 🔔 **Notifications & Analytics**: In-app push notifications and club engagement analytics dashboard.
