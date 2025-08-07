from pydantic import BaseModel
from uuid import UUID

class CategoryOut(BaseModel):
    id: UUID
    name: str

    class Config:
        orm_mode = True