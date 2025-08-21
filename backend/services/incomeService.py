from sqlalchemy.orm import Session
from models.models import Income
from datetime import date
from uuid import UUID
from sqlalchemy import func

def month_range(year: int, month: int) -> tuple[date, date]:
    start = date(year, month, 1)
    # first day of next month
    end = date(year + (month == 12), 1 if month == 12 else month + 1, 1)
    return start, end

# Get all income for a given month
def get_incomes(db: Session, user_id: UUID, year: int, month: int):
    start, end = month_range(year, month)
    return (
        db.query(Income)
        .filter(
            Income.user_id == user_id,
            Income.received_at >= start,
            Income.received_at < end,
        )
        .order_by(Income.received_at.desc())
        .all()
    )

# Get income total for a given month
def get_income_total(db: Session, user_id: UUID, year: int, month: int) -> float:
    start, end = month_range(year, month)
    total = (
        db.query(func.coalesce(func.sum(Income.amount), 0.0))
        .filter(
            Income.user_id == user_id,
            Income.received_at >= start,
            Income.received_at < end,
        )
        .scalar()
    )
    return float(total or 0.0)