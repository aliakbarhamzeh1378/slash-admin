from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from datetime import datetime, timedelta
import random

from app.core.auth import get_current_user
from app.schemas.user import User

router = APIRouter()

def generate_date_range(start_date: Optional[datetime], end_date: Optional[datetime], days: int = 30):
    end = end_date or datetime.now()
    start = start_date or (end - timedelta(days=days))
    return start, end

@router.get("/product")
async def get_product_engagement_trends(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    current_user: User = Depends(get_current_user)
):
    """
    Get product engagement trends data
    """
    start, end = generate_date_range(start_date, end_date)
    
    # Generate sample data for the last 30 days
    dates = [(start + timedelta(days=x)) for x in range((end - start).days + 1)]
    trends = [
        {
            "date": date.strftime("%Y-%m-%d"),
            "views": random.randint(100, 1000),
            "clicks": random.randint(50, 500),
            "conversions": random.randint(10, 100),
            "engagement_rate": round(random.uniform(0.1, 0.5), 2)
        }
        for date in dates
    ]
    
    return {
        "trends": trends,
        "period": {
            "start": start.isoformat(),
            "end": end.isoformat()
        }
    }

@router.get("/sales")
async def get_sales_performance(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    current_user: User = Depends(get_current_user)
):
    """
    Get sales performance data
    """
    start, end = generate_date_range(start_date, end_date)
    
    # Generate sample sales data
    performance = [
        {
            "date": (start + timedelta(days=x)).strftime("%Y-%m-%d"),
            "revenue": round(random.uniform(1000, 10000), 2),
            "orders": random.randint(10, 100),
            "average_order_value": round(random.uniform(50, 200), 2),
            "growth_rate": round(random.uniform(-0.1, 0.3), 2)
        }
        for x in range((end - start).days + 1)
    ]
    
    return {
        "performance": performance,
        "period": {
            "start": start.isoformat(),
            "end": end.isoformat()
        }
    }

@router.get("/intent")
async def get_intent_query_trends(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    current_user: User = Depends(get_current_user)
):
    """
    Get intent query trends data
    """
    start, end = generate_date_range(start_date, end_date)
    
    # Sample intent categories
    intent_categories = ["purchase", "information", "support", "comparison", "review"]
    
    trends = [
        {
            "date": (start + timedelta(days=x)).strftime("%Y-%m-%d"),
            "intents": {
                category: random.randint(10, 100)
                for category in intent_categories
            },
            "total_queries": random.randint(50, 500)
        }
        for x in range((end - start).days + 1)
    ]
    
    return {
        "trends": trends,
        "period": {
            "start": start.isoformat(),
            "end": end.isoformat()
        }
    }

@router.get("/user-segmentation")
async def get_user_segmentation(
    current_user: User = Depends(get_current_user)
):
    """
    Get user segmentation data
    """
    # Sample user segments
    segments = [
        {
            "name": "Power Users",
            "count": random.randint(100, 1000),
            "percentage": round(random.uniform(0.1, 0.3), 2),
            "avg_session_duration": random.randint(10, 60),
            "features_used": random.randint(5, 15)
        },
        {
            "name": "Regular Users",
            "count": random.randint(500, 2000),
            "percentage": round(random.uniform(0.3, 0.5), 2),
            "avg_session_duration": random.randint(5, 30),
            "features_used": random.randint(3, 8)
        },
        {
            "name": "Occasional Users",
            "count": random.randint(200, 800),
            "percentage": round(random.uniform(0.1, 0.2), 2),
            "avg_session_duration": random.randint(1, 15),
            "features_used": random.randint(1, 4)
        },
        {
            "name": "New Users",
            "count": random.randint(50, 300),
            "percentage": round(random.uniform(0.05, 0.15), 2),
            "avg_session_duration": random.randint(1, 10),
            "features_used": random.randint(1, 3)
        }
    ]
    
    return {
        "segments": segments,
        "total_users": sum(segment["count"] for segment in segments)
    }

@router.get("/system")
async def get_system_performance(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    current_user: User = Depends(get_current_user)
):
    """
    Get system performance data
    """
    start, end = generate_date_range(start_date, end_date)
    
    # Generate sample system metrics
    metrics = [
        {
            "date": (start + timedelta(days=x)).strftime("%Y-%m-%d"),
            "response_time": round(random.uniform(100, 500), 2),
            "error_rate": round(random.uniform(0.001, 0.05), 4),
            "cpu_usage": round(random.uniform(20, 80), 2),
            "memory_usage": round(random.uniform(30, 90), 2),
            "active_users": random.randint(100, 1000)
        }
        for x in range((end - start).days + 1)
    ]
    
    return {
        "metrics": metrics,
        "period": {
            "start": start.isoformat(),
            "end": end.isoformat()
        }
    }

@router.get("/mentions")
async def get_most_mentioned_products(
    limit: int = 10,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    current_user: User = Depends(get_current_user)
):
    """
    Get most mentioned products data
    """
    start, end = generate_date_range(start_date, end_date)
    
    # Sample product names
    product_names = [
        "iPhone 15 Pro", "MacBook Pro M3", "iPad Air", "Apple Watch Series 9",
        "AirPods Pro", "Apple Vision Pro", "iMac 24-inch", "Mac Studio",
        "Apple TV 4K", "HomePod mini", "Magic Keyboard", "Magic Mouse",
        "AirTag", "Apple Pencil", "Studio Display"
    ]
    
    # Generate sample mention data
    products = [
        {
            "name": name,
            "mentions": random.randint(50, 500),
            "sentiment_score": round(random.uniform(-1, 1), 2),
            "trend": random.choice(["up", "down", "stable"]),
            "growth_rate": round(random.uniform(-0.2, 0.4), 2)
        }
        for name in product_names[:limit]
    ]
    
    # Sort by mentions
    products.sort(key=lambda x: x["mentions"], reverse=True)
    
    return {
        "products": products,
        "period": {
            "start": start.isoformat(),
            "end": end.isoformat()
        }
    } 