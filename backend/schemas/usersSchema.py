from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum
from datetime import datetime

class UserRole(str, Enum):
    user = "user"
    admin = "admin"

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: str 
    password: str

class UserOut(BaseModel):
    id: str
    email: EmailStr
    user_type: UserRole
    created_at: datetime

    class Config:
        orm_mode = True

class UserGoalOut(BaseModel):
    id: str
    goals : float