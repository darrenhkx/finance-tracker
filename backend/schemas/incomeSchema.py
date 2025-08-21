from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum
from datetime import datetime, date
from uuid import UUID

class IncomeOut(BaseModel):
    id: UUID
    name: str
    amount: float
    received_at: date
    category_id: UUID | None = None

    class Config:
        orm_mode = True

class TotalOut(BaseModel):
    total: float

# updateIncome

# deleteIncome
