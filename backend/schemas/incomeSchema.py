from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum
from datetime import datetime, date
from uuid import UUID

class getIncome(BaseModel):
    id: UUID
    user_id: UUID
    amount: float
    name: str
    received_at: date

# setIncome

# updateIncome

# deleteIncome
