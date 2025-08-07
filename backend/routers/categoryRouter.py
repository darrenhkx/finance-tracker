from fastapi import APIRouter, Depends, HTTPException, status, Query, Path
from sqlalchemy.orm import Session
from schemas.categorySchema import CategoryOut
from services.categoryService import get_categories
from deps import get_db
from models.models import User, Category
from middleware.auth import get_current_user
from typing import List

router = APIRouter(prefix="/category", tags=["Category"])

@router.get("/", response_model=List[CategoryOut])
def get_category(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_categories(db, current_user.id)