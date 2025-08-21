from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.incomeSchema import IncomeOut, TotalOut
from services.incomeService import get_incomes, get_income_total
from deps import get_db
from models.models import Income, User
from middleware.auth import get_current_user
from typing import List

router = APIRouter(prefix="/income", tags=["Income"])

@router.get("/{year}/{month}", response_model=List[IncomeOut])
def list_incomes(
    year: int,
    month: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_incomes(db, current_user.id, year, month)

@router.get("/{year}/{month}/total", response_model=TotalOut)
def income_total(
    year: int,
    month: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return {"total": get_income_total(db, current_user.id, year, month)}