from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    has_submitted_website = Column(Boolean, default=False, nullable=False)
    
    # Relationship with SdkWizardData
    sdk_wizard_data = relationship("SdkWizardData", back_populates="user", uselist=False)
    
    # Relationships with billing models
    subscription = relationship("UserSubscription", back_populates="user", uselist=False)
    billing_history = relationship("BillingHistory", back_populates="user")
    usage_stats = relationship("UsageStats", back_populates="user", uselist=False) 