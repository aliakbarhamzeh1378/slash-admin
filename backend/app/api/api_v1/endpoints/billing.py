from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_db
from app.models.billing import BillingPlan, BillingHistory, UserSubscription, UsageStats
from app.models.user import User
from app.schemas.billing import (
    BillingPlanCreate, BillingPlanResponse, BillingPlanUpdate,
    BillingHistoryCreate, BillingHistoryResponse,
    UserSubscriptionCreate, UserSubscriptionResponse, UserSubscriptionUpdate,
    UsageStatsCreate, UsageStatsResponse, UsageStatsUpdate,
    CurrentPlanResponse
)

router = APIRouter()


@router.get("/plans", response_model=List[BillingPlanResponse])
def get_billing_plans(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
):
    """
    Retrieve all billing plans.
    """
    plans = db.query(BillingPlan).offset(skip).limit(limit).all()
    return plans


@router.get("/plans/{plan_id}", response_model=BillingPlanResponse)
def get_billing_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Retrieve a specific billing plan by ID.
    """
    plan = db.query(BillingPlan).filter(BillingPlan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Billing plan not found")
    return plan


@router.post("/plans", response_model=BillingPlanResponse)
def create_billing_plan(
    plan_in: BillingPlanCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Create a new billing plan.
    """
    plan = BillingPlan(**plan_in.dict())
    db.add(plan)
    db.commit()
    db.refresh(plan)
    return plan


@router.put("/plans/{plan_id}", response_model=BillingPlanResponse)
def update_billing_plan(
    plan_id: int,
    plan_in: BillingPlanUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Update a billing plan.
    """
    plan = db.query(BillingPlan).filter(BillingPlan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Billing plan not found")
    
    for field, value in plan_in.dict(exclude_unset=True).items():
        setattr(plan, field, value)
    
    db.commit()
    db.refresh(plan)
    return plan


@router.get("/current-plan", response_model=CurrentPlanResponse)
def get_current_plan(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Get the current user's subscription plan, subscription details, and usage stats.
    """
    subscription = db.query(UserSubscription).filter(
        UserSubscription.user_id == current_user.id,
        UserSubscription.status == "active"
    ).first()
    
    if not subscription:
        raise HTTPException(status_code=404, detail="No active subscription found")
    
    plan = db.query(BillingPlan).filter(BillingPlan.id == subscription.plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Billing plan not found")
    
    usage_stats = db.query(UsageStats).filter(
        UsageStats.user_id == current_user.id
    ).first()
    
    if not usage_stats:
        raise HTTPException(status_code=404, detail="Usage stats not found")
    
    return {
        "plan": plan,
        "subscription": subscription,
        "usage_stats": usage_stats
    }


@router.post("/subscribe/{plan_id}", response_model=UserSubscriptionResponse)
def subscribe_to_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Subscribe to a billing plan.
    """
    plan = db.query(BillingPlan).filter(BillingPlan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Billing plan not found")
    
    # Check if user already has an active subscription
    existing_subscription = db.query(UserSubscription).filter(
        UserSubscription.user_id == current_user.id,
        UserSubscription.status == "active"
    ).first()
    
    if existing_subscription:
        # Update existing subscription
        existing_subscription.status = "canceled"
        existing_subscription.end_date = datetime.utcnow()
        db.commit()
    
    # Create new subscription
    start_date = datetime.utcnow()
    end_date = start_date + timedelta(days=30)  # 30-day subscription
    
    subscription = UserSubscription(
        user_id=current_user.id,
        plan_id=plan_id,
        status="active",
        start_date=start_date,
        end_date=end_date
    )
    
    db.add(subscription)
    db.commit()
    db.refresh(subscription)
    
    # Create or update usage stats
    usage_stats = db.query(UsageStats).filter(
        UsageStats.user_id == current_user.id
    ).first()
    
    if not usage_stats:
        usage_stats = UsageStats(
            user_id=current_user.id,
            api_calls_limit=100000,  # Default limits based on plan
            storage_limit=100,  # 100 MB
            team_members_limit=10
        )
        db.add(usage_stats)
    else:
        # Update limits based on new plan
        usage_stats.api_calls_limit = 100000
        usage_stats.storage_limit = 100
        usage_stats.team_members_limit = 10
    
    db.commit()
    
    return subscription


@router.get("/history", response_model=List[BillingHistoryResponse])
def get_billing_history(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
):
    """
    Get the user's billing history.
    """
    history = db.query(BillingHistory).filter(
        BillingHistory.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    return history


@router.post("/history", response_model=BillingHistoryResponse)
def create_billing_history(
    history_in: BillingHistoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Create a new billing history entry.
    """
    history = BillingHistory(**history_in.dict())
    db.add(history)
    db.commit()
    db.refresh(history)
    return history


@router.get("/usage", response_model=UsageStatsResponse)
def get_usage_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Get the user's usage statistics.
    """
    usage_stats = db.query(UsageStats).filter(
        UsageStats.user_id == current_user.id
    ).first()
    
    if not usage_stats:
        raise HTTPException(status_code=404, detail="Usage stats not found")
    
    return usage_stats


@router.put("/usage", response_model=UsageStatsResponse)
def update_usage_stats(
    usage_in: UsageStatsUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Update the user's usage statistics.
    """
    usage_stats = db.query(UsageStats).filter(
        UsageStats.user_id == current_user.id
    ).first()
    
    if not usage_stats:
        raise HTTPException(status_code=404, detail="Usage stats not found")
    
    for field, value in usage_in.dict(exclude_unset=True).items():
        setattr(usage_stats, field, value)
    
    db.commit()
    db.refresh(usage_stats)
    return usage_stats 