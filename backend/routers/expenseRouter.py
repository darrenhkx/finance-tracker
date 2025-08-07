from fastapi import APIRouter, Depends, HTTPException, status, Query, Path
from sqlalchemy.orm import Session
from schemas.expenseSchema import ExpenseOut, ExpenseTotalOut
from services.expenseService import get_month_expenses, get_month_expenses_total
from deps import get_db
from models.models import Expense, User
from middleware.auth import get_current_user
from typing import List

router = APIRouter(prefix="/expense", tags=["Expense"])

@router.get("/{year}/{month}", response_model=List[ExpenseOut])
def get_expenses_by_month(
    year: int, 
    month: int = Path(..., ge=1, le=12), 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_month_expenses(db, current_user.id, month, year)

@router.get("/{year}/{month}/total", response_model=ExpenseTotalOut)
def get_expense_total_for_month(
    year: int, 
    month: int = Path(..., ge=1, le=12), 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    """Get total expenses for a given month/year"""
    return {"total": get_month_expenses_total(db, current_user.id, month, year)}