from sqlalchemy.orm import Session
from models.models import Budget
import uuid

def get_budgets(db: Session, user_id: uuid.UUID):
    budgets = (
        db.query(Budget)
        .filter(Budget.user_id == user_id)
        .all()
    )
    return budgets