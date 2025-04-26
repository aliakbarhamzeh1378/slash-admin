from fastapi import APIRouter, Depends
from typing import List, Dict, Any, Optional

from app.api.deps import get_current_user

router = APIRouter()

@router.get("/stats", response_model=Dict[str, Any])
def get_dashboard_stats(current_user: Any = Depends(get_current_user)):
    """
    Get dashboard statistics for the workbench page.
    """
    return {
        "weekly_sales": "714k",
        "new_users": "1.35m",
        "new_orders": "1.72m",
        "bug_reports": "234"
    }

@router.get("/intent-usage-area", response_model=Dict[str, Any])
def get_intent_usage_area(current_user: Any = Depends(get_current_user)):
    """
    Get intent usage area chart data.
    """
    return {
        "2022": [
            {
                "name": "Product Deep Dive",
                "data": [450, 520, 580, 620, 680, 750, 820, 890, 950, 1020, 1080, 1150],
            },
            {
                "name": "Product Search",
                "data": [320, 380, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960],
            },
            {
                "name": "Product Discovery",
                "data": [280, 340, 400, 460, 520, 580, 640, 700, 760, 820, 880, 940],
            },
            {
                "name": "Question About Store",
                "data": [150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480],
            },
            {
                "name": "Normal Conversation",
                "data": [200, 240, 280, 320, 360, 400, 440, 480, 520, 560, 600, 640],
            },
        ]
    }

@router.get("/intent-usage", response_model=Dict[str, Any])
def get_intent_usage(current_user: Any = Depends(get_current_user)):
    """
    Get intent usage donut chart data.
    """
    return {
        "series": [44, 55, 13, 43, 22],
        "labels": ["Product Deep Dive", "Product Search", "Product Discovery", "Question About Store", "Normal Conversation"]
    }

@router.get("/top-products", response_model=List[Dict[str, Any]])
def get_top_products(current_user: Any = Depends(get_current_user)):
    """
    Get top products data.
    """
    return [
        {
            "key": "1",
            "id": "INV-1990",
            "category": "Android",
            "price": "$83.74",
            "status": "Paid",
        },
        {
            "key": "2",
            "id": "INV-1991",
            "category": "Mac",
            "price": "$97.14",
            "status": "Out of Date",
        },
        {
            "key": "3",
            "id": "INV-1992",
            "category": "Windows",
            "price": "$68.71",
            "status": "Progress",
        },
        {
            "key": "4",
            "id": "INV-1993",
            "category": "Android",
            "price": "$85.21",
            "status": "Paid",
        },
        {
            "key": "5",
            "id": "INV-1994",
            "category": "Mac",
            "price": "$53.17",
            "status": "Paid",
        },
    ]

@router.get("/top-brands", response_model=List[Dict[str, Any]])
def get_top_brands(current_user: Any = Depends(get_current_user)):
    """
    Get top brands data.
    """
    return [
        {
            "logo": "logos:chrome",
            "title": "Chrome",
            "platform": "Mac",
            "type": "free",
            "star": 4,
            "reviews": "9.91k",
        },
        {
            "logo": "logos:google-drive",
            "title": "Drive",
            "platform": "Mac",
            "type": "free",
            "star": 3.5,
            "reviews": "1.95k",
        },
        {
            "logo": "logos:dropbox",
            "title": "Dropbox",
            "platform": "Windows",
            "type": "$66.71",
            "star": 4.5,
            "reviews": "9.12k",
        },
        {
            "logo": "logos:slack-icon",
            "title": "Slack",
            "platform": "Mac",
            "type": "free",
            "star": 3.5,
            "reviews": "6.98k",
        },
        {
            "logo": "logos:discord-icon",
            "title": "Discord",
            "platform": "Windows",
            "type": "$52.17",
            "star": 0.5,
            "reviews": "8.49k",
        },
    ]

@router.get("/top-installed-countries", response_model=List[Dict[str, Any]])
def get_top_installed_countries(current_user: Any = Depends(get_current_user)):
    """
    Get top installed countries data.
    """
    return [
        {
            "country": "Germany",
            "coordinates": [10.4515, 51.1657],
            "android": "9.91k",
            "windows": "1.95k",
            "ios": "1.95k",
        },
        {
            "country": "China",
            "coordinates": [104.1954, 35.8617],
            "android": "1.95k",
            "windows": "9.25k",
            "ios": "7.95k",
        },
        {
            "country": "Australia",
            "coordinates": [133.7751, -25.2744],
            "android": "3.91k",
            "windows": "2.95k",
            "ios": "4.95k",
        },
        {
            "country": "France",
            "coordinates": [2.3522, 48.8566],
            "android": "3.28k",
            "windows": "2.29k",
            "ios": "8.95k",
        },
        {
            "country": "USA",
            "coordinates": [-95.7129, 37.0902],
            "android": "8.81k",
            "windows": "7.05k",
            "ios": "4.35k",
        },
    ] 