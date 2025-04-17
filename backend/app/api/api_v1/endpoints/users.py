from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import schemas
from app.db.database import get_db
from app.models.user import User

router = APIRouter()

@router.get("/{user_id}", response_model=schemas.User)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
) -> Any:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )
    return user

@router.put("/{user_id}/website-submission", response_model=schemas.User)
def update_website_submission(
    user_id: int,
    db: Session = Depends(get_db),
) -> Any:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )
    
    user.has_submitted_website = True
    db.commit()
    db.refresh(user)
    return user 