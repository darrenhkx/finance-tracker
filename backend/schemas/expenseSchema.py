from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum
from datetime import datetime, date
from uuid import UUID

class ExpenseOut(BaseModel):
    id: UUID
    name: str
    amount: float
    date: date
    category_id: UUID

    class Config:
        orm_mode = True

class ExpenseTotalOut(BaseModel):
    total: float