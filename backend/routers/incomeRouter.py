from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.incomeSchema import getIncome
from services.incomeService import get_latest_income
from deps import get_db
from models.models import Income, User
from middleware.auth import get_current_user

router = APIRouter(prefix="/income", tags=["Income"])

@router.get("/latest")
def get_recent_income(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    amount = get_latest_income(db, current_user.id)
    return {"latest_income": amount}