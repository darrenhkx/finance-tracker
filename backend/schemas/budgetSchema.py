from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum
from datetime import datetime, date
from uuid import UUID

class BudgetOut(BaseModel):
    id: UUID
    amount: float
    category_id: UUID

    class Config:
        orm_mode = True