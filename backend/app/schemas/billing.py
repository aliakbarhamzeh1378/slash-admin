from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class BillingPlanBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    features: List[str]
    is_active: bool = True


class BillingPlanCreate(BillingPlanBase):
    pass


class BillingPlanUpdate(BillingPlanBase):
    name: Optional[str] = None
    price: Optional[float] = None
    features: Optional[List[str]] = None
    is_active: Optional[bool] = None


class BillingPlanInDB(BillingPlanBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class BillingPlanResponse(BillingPlanInDB):
    pass


class UserSubscriptionBase(BaseModel):
    user_id: int
    plan_id: int
    status: str = "active"
    start_date: datetime
    end_date: datetime


class UserSubscriptionCreate(UserSubscriptionBase):
    pass


class UserSubscriptionUpdate(BaseModel):
    status: Optional[str] = None
    end_date: Optional[datetime] = None


class UserSubscriptionInDB(UserSubscriptionBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class UserSubscriptionResponse(UserSubscriptionInDB):
    plan: BillingPlanResponse


class BillingHistoryBase(BaseModel):
    user_id: int
    plan_id: int
    amount: float
    status: str
    payment_date: datetime


class BillingHistoryCreate(BillingHistoryBase):
    pass


class BillingHistoryInDB(BillingHistoryBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


class BillingHistoryResponse(BillingHistoryInDB):
    plan: BillingPlanResponse


class UsageStatsBase(BaseModel):
    user_id: int
    api_calls_used: int = 0
    api_calls_limit: int
    storage_used: int = 0
    storage_limit: int
    team_members_used: int = 0
    team_members_limit: int


class UsageStatsCreate(UsageStatsBase):
    pass


class UsageStatsUpdate(BaseModel):
    api_calls_used: Optional[int] = None
    storage_used: Optional[int] = None
    team_members_used: Optional[int] = None


class UsageStatsInDB(UsageStatsBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class UsageStatsResponse(UsageStatsInDB):
    pass


class CurrentPlanResponse(BaseModel):
    plan: BillingPlanResponse
    subscription: UserSubscriptionResponse
    usage_stats: UsageStatsResponse 