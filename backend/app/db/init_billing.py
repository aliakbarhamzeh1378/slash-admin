from sqlalchemy.orm import Session

from app.models.billing import BillingPlan


def init_billing_plans(db: Session) -> None:
    """Initialize billing plans if they don't exist."""
    # Check if we already have billing plans
    existing_plans = db.query(BillingPlan).all()
    if existing_plans:
        return

    # Create default billing plans
    plans = [
        BillingPlan(
            name="Basic Plan",
            description="Perfect for individuals and small projects",
            price=9.99,
            features=[
                "Up to 50,000 API calls/month",
                "50 MB storage",
                "5 team members",
                "Basic support",
                "Core features"
            ],
            is_active=True
        ),
        BillingPlan(
            name="Pro Plan",
            description="Best for growing teams and businesses",
            price=29.99,
            features=[
                "Up to 100,000 API calls/month",
                "100 MB storage",
                "10 team members",
                "Priority support",
                "Advanced analytics",
                "Team collaboration",
                "Custom integrations"
            ],
            is_active=True
        ),
        BillingPlan(
            name="Enterprise Plan",
            description="For large organizations with custom needs",
            price=99.99,
            features=[
                "Unlimited API calls",
                "500 MB storage",
                "Unlimited team members",
                "24/7 dedicated support",
                "Advanced security features",
                "Custom deployment options",
                "SLA guarantees",
                "Dedicated account manager"
            ],
            is_active=True
        )
    ]

    for plan in plans:
        db.add(plan)
    
    db.commit() 