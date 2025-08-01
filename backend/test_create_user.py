from db.session import SessionLocal
from models.models import User
import uuid
from datetime import datetime

def test_create_user():
    db = SessionLocal()
    try:
        new_user = User(
            id=uuid.uuid4(),
            email="test@example.com",
            password="testpassword",
            user_type="user",
            created_at=datetime.utcnow()
        )
        db.add(new_user)
        db.commit()
        print("User created:", new_user.email)
    except Exception as e:
        print("Error:", e)
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    test_create_user()
