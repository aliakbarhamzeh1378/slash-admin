from typing import Optional, Dict, Any
from pydantic import BaseModel

class SdkWizardDataBase(BaseModel):
    platform: str
    store_url: str
    database_access: str
    field_mappings: Optional[Dict[str, str]] = None
    woo_commerce_secret_key: Optional[str] = None
    woo_commerce_client_key: Optional[str] = None
    is_data_extracted: bool = False
    fields: Optional[Dict[str, Any]] = None

class SdkWizardDataCreate(SdkWizardDataBase):
    pass

class SdkWizardDataUpdate(BaseModel):
    platform: Optional[str] = None
    store_url: Optional[str] = None
    database_access: Optional[str] = None
    field_mappings: Optional[Dict[str, str]] = None
    woo_commerce_secret_key: Optional[str] = None
    woo_commerce_client_key: Optional[str] = None
    is_data_extracted: Optional[bool] = None
    fields: Optional[Dict[str, Any]] = None

class SdkWizardDataInDB(SdkWizardDataBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True 