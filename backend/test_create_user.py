from db.session import SessionLocal
from models.models import User, Category, Budget, Expense, Income, CategoryType
import uuid
from datetime import datetime, date, timedelta
import random

def test_create_user():
    db = SessionLocal()
    try:
        new_user = User(
            id=uuid.uuid4(),
            email="test@example.com",
            password="testpassword",
            user_type="user",
            created_at=datetime.utcnow()
        )
        db.add(new_user)
        db.commit()
        print("User created:", new_user.email)
    except Exception as e:
        print("Error:", e)
        db.rollback()
    finally:
        db.close()

EXISTING_USER_EMAIL = "test@example.com"

def seed_for_existing_user():
    db = SessionLocal()
    try:
        # 1. Get existing user
        user = db.query(User).filter(User.email == EXISTING_USER_EMAIL).first()
        if not user:
            print("❌ No user found with that email.")
            return

        # 2. Create categories
        categories = ["Food", "Transport", "Utilities", "Entertainment", "Others"]
        category_objs = []
        for name in categories:
            cat = Category(
                id=uuid.uuid4(),
                user_id=user.id,
                name=name,
                type=CategoryType.both,
                created_at=datetime.utcnow()
            )
            db.add(cat)
            category_objs.append(cat)
        db.commit()

        # 3. Create budgets
        budgets = [
            ("Food", 500),
            ("Transport", 400),
            ("Utilities", 350),
            ("Entertainment", 200),
            ("Others", 950),
        ]
        for name, amount in budgets:
            category = next(c for c in category_objs if c.name == name)
            budget = Budget(
                id=uuid.uuid4(),
                user_id=user.id,
                category_id=category.id,
                amount=amount,
                created_at=datetime.utcnow()
            )
            db.add(budget)
        db.commit()

        # 4. Create expenses
        for _ in range(10):
            category = random.choice(category_objs)
            expense = Expense(
                id=uuid.uuid4(),
                user_id=user.id,
                name=f"{category.name} expense",
                category_id=category.id,
                amount=random.randint(50, 200),
                date=date.today() - timedelta(days=random.randint(0, 30)),
                created_at=datetime.utcnow()
            )
            db.add(expense)
        db.commit()

        # 5. Create income
        for i in range(2):
            income = Income(
                id=uuid.uuid4(),
                user_id=user.id,
                amount=3000,
                name="Monthly Salary",
                received_at=date.today() - timedelta(days=30 * i),
                created_at=datetime.utcnow()
            )
            db.add(income)
        db.commit()

        print(f"✅ Database seeded with demo data for {user.email}")

    except Exception as e:
        print("❌ Error:", e)
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    #test_create_user()
    seed_for_existing_user()