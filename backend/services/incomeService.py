from sqlalchemy.orm import Session
from models.models import Income
import uuid

def get_latest_income(db: Session, user_id: uuid.UUID) -> float:
    latest_income = (
        db.query(Income)
        .filter(Income.user_id == user_id)
        .order_by(Income.received_at.desc())
        .first()
    )
    return float(latest_income.amount) if latest_income else 0.00