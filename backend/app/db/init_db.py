from sqlalchemy.orm import Session

from app import schemas
from app.core import security
from app.models.user import User

def init_db(db: Session) -> None:
    # Create default admin user
    user = db.query(User).filter(User.username == "admin").first()
    if not user:
        user_in = schemas.UserCreate(
            username="admin",
            email="admin@example.com",
            password="demo1234"
        )
        user = User(
            username=user_in.username,
            email=user_in.email,
            hashed_password=security.get_password_hash(user_in.password),
            is_active=True
        )
        db.add(user)
        db.commit()
        db.refresh(user) 