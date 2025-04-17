from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.user import UserLogin, UserCreate
from app.schemas.token import Token
from app.core import security
from app.core.config import settings
from app.db.database import get_db
from app.models.user import User

router = APIRouter()

@router.post("/signin", response_model=Token)
def signin(
    *,
    db: Session = Depends(get_db),
    user_in: UserLogin,
) -> Any:
    user = db.query(User).filter(User.username == user_in.username).first()
    if not user or not security.verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    # Create user data dictionary
    user_data = {
        "id": str(user.id) if hasattr(user, 'id') else "1",  # Ensure id is a string
        "username": user.username,
        "email": user.email,
        "permissions": [],  # Add any permissions if you have them
        "has_submitted_website": bool(getattr(user, 'has_submitted_website', False))  # Ensure it's a boolean
    }
    
    return {
        "access_token": security.create_access_token(
            user.username, expires_delta=access_token_expires
        ),
        "refresh_token": security.create_refresh_token(
            user.username, expires_delta=refresh_token_expires
        ),
        "token_type": "bearer",
        "user": user_data
    }

@router.post("/signup", response_model=Token)
def signup(
    *,
    db: Session = Depends(get_db),
    user_in: UserCreate,
) -> Any:
    user = db.query(User).filter(User.username == user_in.username).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="Username already registered",
        )
    user = User(
        username=user_in.username,
        email=user_in.email,
        hashed_password=security.get_password_hash(user_in.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    # Create user data dictionary
    user_data = {
        "id": str(user.id) if hasattr(user, 'id') else "1",  # Ensure id is a string
        "username": user.username,
        "email": user.email,
        "permissions": [],  # Add any permissions if you have them
        "has_submitted_website": bool(getattr(user, 'has_submitted_website', False))  # Ensure it's a boolean
    }
    
    return {
        "access_token": security.create_access_token(
            user.username, expires_delta=access_token_expires
        ),
        "refresh_token": security.create_refresh_token(
            user.username, expires_delta=refresh_token_expires
        ),
        "token_type": "bearer",
        "user": user_data
    }

@router.post("/logout")
def logout() -> Any:
    return {"msg": "Successfully logged out"} 