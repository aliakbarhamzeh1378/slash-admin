from typing import Optional, Dict, Any, List
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
    documentation_links: Optional[List[str]] = None
    documentation_files: Optional[List[Dict[str, Any]]] = None

class SdkWizardDataCreate(SdkWizardDataBase):
    pass

class SdkWizardDataUpdate(SdkWizardDataBase):
    pass

class SdkWizardDataInDB(SdkWizardDataBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True 