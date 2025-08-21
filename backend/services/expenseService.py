from sqlalchemy.orm import Session
from sqlalchemy import func
from models.models import Expense
import uuid
from datetime import datetime, date

def get_month_expenses(
    db: Session,
    user_id: uuid.UUID,
    month: int,
    year: int
):
    # first day of month
    start_date = date(year, month, 1)
    # last day of month: trick by going to next month minus one day
    if month == 12:
        end_date = date(year + 1, 1, 1)
    else:
        end_date = date(year, month + 1, 1)
    
    expenses = (
        db.query(Expense)
        .filter(
            Expense.user_id == user_id,
            Expense.date >= start_date,
            Expense.date < end_date  # exclusive end
        )
        .order_by(Expense.date.desc())
        .all()
    )
    return expenses


def get_month_expenses_total(
    db: Session,
    user_id: uuid.UUID,
    month: int,
    year: int
) -> float:
    start_date = date(year, month, 1)
    if month == 12:
        end_date = date(year + 1, 1, 1)
    else:
        end_date = date(year, month + 1, 1)
    
    total = (
        db.query(func.coalesce(func.sum(Expense.amount), 0))
        .filter(
            Expense.user_id == user_id,
            Expense.date >= start_date,
            Expense.date < end_date
        )
        .scalar()
    )
    return float(total)