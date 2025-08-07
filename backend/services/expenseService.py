from sqlalchemy.orm import Session
from sqlalchemy import extract, func
from models.models import Expense
import uuid
from datetime import datetime

# get all expenses for a given month
def get_month_expenses(
    db: Session, 
    user_id: uuid.UUID, 
    month: int, 
    year: int
):
    expenses = (
        db.query(Expense)
        .filter(
            Expense.user_id == user_id,
            extract('month', Expense.date) == month,
            extract('year', Expense.date) == year
        )
        .order_by(Expense.date.desc())
        .all()
    )
    return expenses

# sum of all expenses in a given month
def get_month_expenses_total(
    db: Session, 
    user_id: uuid.UUID, 
    month: int, 
    year: int
) -> float:
    total = (
        db.query(func.coalesce(func.sum(Expense.amount), 0))
        .filter(
            Expense.user_id == user_id,
            extract('month', Expense.date) == month,
            extract('year', Expense.date) == year
        )
        .scalar()
    )
    return float(total)