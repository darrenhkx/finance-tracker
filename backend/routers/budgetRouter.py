from fastapi import APIRouter, Depends, HTTPException, status, Query, Path
from sqlalchemy.orm import Session
from schemas.budgetSchema import BudgetOut
from services.budgetService import get_budgets
from deps import get_db
from models.models import Budget, User
from middleware.auth import get_current_user
from typing import List

router = APIRouter(prefix="/budget", tags=["Budget"])

@router.get("/", response_model=List[BudgetOut])
def get_user_budgets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_budgets(db, current_user.id)