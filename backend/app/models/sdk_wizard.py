from sqlalchemy import Boolean, Column, Integer, String, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class SdkWizardData(Base):
    __tablename__ = "sdk_wizard_data"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    platform = Column(String, nullable=False)
    store_url = Column(String, nullable=False)
    database_access = Column(String, nullable=False)
    field_mappings = Column(JSON, nullable=True)
    woo_commerce_secret_key = Column(String, nullable=True)
    woo_commerce_client_key = Column(String, nullable=True)
    is_data_extracted = Column(Boolean, default=False)
    fields = Column(JSON, nullable=True)
    
    # Relationship with User model
    user = relationship("User", back_populates="sdk_wizard_data") 