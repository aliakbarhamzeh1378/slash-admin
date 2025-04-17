from typing import Optional
from pydantic import BaseModel

class OrganizationBase(BaseModel):
    name: str
    description: Optional[str] = None

class OrganizationCreate(OrganizationBase):
    pass

class OrganizationUpdate(OrganizationBase):
    name: Optional[str] = None
    description: Optional[str] = None

class Organization(OrganizationBase):
    id: int

    class Config:
        from_attributes = True 