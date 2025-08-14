from sqlalchemy.orm import Session
from models.models import User
from schemas.usersSchema import UserCreate
import uuid
from datetime import datetime

def create_user(db: Session, user_in: UserCreate):
    new_user = User(
        id=uuid.uuid4(),
        email=user_in.email,
        password=user_in.password,  # ideally hash before saving
        created_at=datetime.now(datetime.UTC)()
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def login_user(db: Session, email: str, password: str):
    db_user = db.query(User).filter(User.email == email).first()
    if not db_user or db_user.password != password:
        return None
    return db_user

def get_goal(db: Session, user_id: uuid.UUID) -> float:
    goal= (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )
    return float(goal.goals) if goal else 0.00