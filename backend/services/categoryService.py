from sqlalchemy.orm import Session
from models.models import Category
import uuid

def get_categories(db: Session, user_id: uuid.UUID):
    categories = (db.query(Category).filter(Category.user_id == user_id).all())
    return categories