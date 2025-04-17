from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import schemas
from app.db.database import get_db
from app.models.organization import Organization

router = APIRouter()

@router.get("/", response_model=List[schemas.Organization])
def get_organizations(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    organizations = db.query(Organization).offset(skip).limit(limit).all()
    return organizations 