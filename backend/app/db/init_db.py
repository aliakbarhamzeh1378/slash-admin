from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app import schemas
from app.core import security
from app.models.user import User
from app.models.billing import BillingPlan, UserSubscription, UsageStats, BillingHistory

def init_db(db: Session) -> None:
    # Create default admin user
    user = db.query(User).filter(User.username == "admin").first()
    if not user:
        user_in = schemas.UserCreate(
            username="admin",
            email="admin@example.com",
            password="demo1234"
        )
        user = User(
            username=user_in.username,
            email=user_in.email,
            hashed_password=security.get_password_hash(user_in.password),
            is_active=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # Create default billing plans if they don't exist
    default_plans = [
        {
            "name": "Free",
            "description": "Basic plan for individual users",
            "price": 0.0,
            "features": ["Basic API access", "1GB storage", "1 team member"],
            "is_active": True
        },
        {
            "name": "Pro",
            "description": "Professional plan for small teams",
            "price": 29.99,
            "features": ["Advanced API access", "10GB storage", "5 team members", "Priority support"],
            "is_active": True
        },
        {
            "name": "Enterprise",
            "description": "Enterprise plan for large organizations",
            "price": 99.99,
            "features": ["Unlimited API access", "100GB storage", "Unlimited team members", "24/7 support", "Custom features"],
            "is_active": True
        }
    ]

    for plan_data in default_plans:
        plan = db.query(BillingPlan).filter(BillingPlan.name == plan_data["name"]).first()
        if not plan:
            plan = BillingPlan(**plan_data)
            db.add(plan)
    db.commit()

    # Create a subscription for the admin user if they don't have one
    subscription = db.query(UserSubscription).filter(UserSubscription.user_id == user.id).first()
    if not subscription:
        pro_plan = db.query(BillingPlan).filter(BillingPlan.name == "Pro").first()
        if pro_plan:
            subscription = UserSubscription(
                user_id=user.id,
                plan_id=pro_plan.id,
                status="active",
                start_date=datetime.utcnow(),
                end_date=datetime.utcnow() + timedelta(days=30)
            )
            db.add(subscription)
            db.commit()

    # Create usage stats for the admin user if they don't have one
    usage_stats = db.query(UsageStats).filter(UsageStats.user_id == user.id).first()
    if not usage_stats:
        usage_stats = UsageStats(
            user_id=user.id,
            api_calls_limit=1000,
            storage_limit=10240,  # 10GB in MB
            team_members_limit=5
        )
        db.add(usage_stats)
        db.commit()

    # Create billing history for the admin user
    pro_plan = db.query(BillingPlan).filter(BillingPlan.name == "Pro").first()
    if pro_plan:
        # Check if billing history exists
        existing_history = db.query(BillingHistory).filter(BillingHistory.user_id == user.id).first()
        if not existing_history:
            # Create sample billing history entries
            history_entries = [
                {
                    "user_id": user.id,
                    "plan_id": pro_plan.id,
                    "amount": pro_plan.price,
                    "status": "paid",
                    "payment_date": datetime.utcnow() - timedelta(days=30)
                },
                {
                    "user_id": user.id,
                    "plan_id": pro_plan.id,
                    "amount": pro_plan.price,
                    "status": "paid",
                    "payment_date": datetime.utcnow() - timedelta(days=60)
                },
                {
                    "user_id": user.id,
                    "plan_id": pro_plan.id,
                    "amount": pro_plan.price,
                    "status": "paid",
                    "payment_date": datetime.utcnow() - timedelta(days=90)
                }
            ]
            
            for entry in history_entries:
                history = BillingHistory(**entry)
                db.add(history)
            db.commit() 