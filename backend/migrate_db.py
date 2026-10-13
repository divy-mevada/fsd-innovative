import sqlite3
import os
from app.db.session import engine, Base
import app.models  # load all models so Base has metadata for chat_messages etc.

def migrate():
    db_path = os.path.join(os.path.dirname(__file__), "campusclub.db")
    print(f"Connecting to database at {db_path}...")
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check users table columns
    cursor.execute("PRAGMA table_info(users)")
    columns = [row[1] for row in cursor.fetchall()]
    print(f"Current columns in 'users' table: {columns}")
    
    if "roll_number" not in columns:
        print("Adding missing 'roll_number' column to 'users' table...")
        cursor.execute("ALTER TABLE users ADD COLUMN roll_number VARCHAR(50)")
        cursor.execute("CREATE UNIQUE INDEX IF NOT EXISTS ix_users_roll_number ON users (roll_number)")
        conn.commit()
        print("Column 'roll_number' added successfully.")
    else:
        print("Column 'roll_number' already exists.")
        
    conn.close()

    # Create all tables (e.g. chat_messages) if they don't exist yet
    print("Ensuring all SQLAlchemy metadata tables are created...")
    Base.metadata.create_all(bind=engine)
    print("Database migration completed successfully!")

if __name__ == "__main__":
    migrate()
