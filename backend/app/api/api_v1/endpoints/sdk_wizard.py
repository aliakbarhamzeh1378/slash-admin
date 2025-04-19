from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import requests
from bs4 import BeautifulSoup
import json
from pydantic import BaseModel

from app.db.database import get_db
from app.models.sdk_wizard import SdkWizardData
from app.models.user import User
from app.schemas.sdk_wizard import SdkWizardDataCreate, SdkWizardDataUpdate, SdkWizardDataInDB
from app.core.security import get_current_user

router = APIRouter()

class ConnectionValidationRequest(BaseModel):
    platform: str
    store_url: str
    woo_commerce_secret_key: str | None = None
    woo_commerce_client_key: str | None = None

class ExtractDataRequest(BaseModel):
    store_url: str
    platform: str

class SdkDashboardResponse(BaseModel):
    stats: dict
    recent_activities: list

@router.post("/validate-connection", response_model=dict)
def validate_connection(
    *,
    validation_data: ConnectionValidationRequest,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Validate the connection to the e-commerce platform without creating SDK wizard data.
    """
    try:
        if validation_data.platform.lower() == "shopify":
            # Try to access the store URL
            response = requests.get(validation_data.store_url, timeout=10)
            
            # Check if the response is successful and contains HTML
            if response.status_code == 200 and 'text/html' in response.headers.get('content-type', ''):
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Look for Shopify-specific elements
                shopify_elements = soup.find_all('script', {'src': lambda x: x and 'shopify' in x.lower()})
                if shopify_elements:
                    return {
                        "success": True,
                        "message": "Successfully connected to Shopify store"
                    }
                else:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="The provided URL does not appear to be a Shopify store"
                    )
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Could not access the store URL"
                )
                
        elif validation_data.platform.lower() == "woocommerce":
            # Validate WooCommerce credentials
            if not validation_data.woo_commerce_secret_key or not validation_data.woo_commerce_client_key:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="WooCommerce API keys are required"
                )
                
            # Try to access WooCommerce API
            woo_api_url = f"{validation_data.store_url.rstrip('/')}/wp-json/wc/v3/products"
            auth = (validation_data.woo_commerce_client_key, validation_data.woo_commerce_secret_key)
            
            response = requests.get(woo_api_url, auth=auth, timeout=10)
            if response.status_code == 200:
                return {
                    "success": True,
                    "message": "Successfully connected to WooCommerce store"
                }
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid WooCommerce credentials or API access"
                )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Platform {validation_data.platform} is not supported yet"
            )
            
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Connection failed: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Validation failed: {str(e)}"
        )

@router.post("/data", response_model=SdkWizardDataInDB)
def create_sdk_wizard_data(
    *,
    db: Session = Depends(get_db),
    sdk_wizard_data_in: SdkWizardDataCreate,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Create new SDK wizard data for the current user.
    """
    # Check if user already has SDK wizard data
    existing_data = db.query(SdkWizardData).filter(SdkWizardData.user_id == current_user.id).first()
    if existing_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="SDK wizard data already exists for this user"
        )
    
    # Create new SDK wizard data
    sdk_wizard_data = SdkWizardData(
        **sdk_wizard_data_in.model_dump(),
        user_id=current_user.id
    )
    db.add(sdk_wizard_data)
    db.commit()
    db.refresh(sdk_wizard_data)
    
    return sdk_wizard_data

@router.get("/data", response_model=SdkWizardDataInDB)
def get_sdk_wizard_data(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get SDK wizard data for the current user.
    """
    sdk_wizard_data = db.query(SdkWizardData).filter(SdkWizardData.user_id == current_user.id).first()
    if not sdk_wizard_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="SDK wizard data not found"
        )
    return sdk_wizard_data

@router.put("/data", response_model=SdkWizardDataInDB)
def update_sdk_wizard_data(
    *,
    db: Session = Depends(get_db),
    sdk_wizard_data_in: SdkWizardDataUpdate,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Update SDK wizard data for the current user.
    """
    sdk_wizard_data = db.query(SdkWizardData).filter(SdkWizardData.user_id == current_user.id).first()
    if not sdk_wizard_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="SDK wizard data not found"
        )
    
    # Update fields
    for field, value in sdk_wizard_data_in.model_dump(exclude_unset=True).items():
        setattr(sdk_wizard_data, field, value)
    
    db.commit()
    db.refresh(sdk_wizard_data)
    
    return sdk_wizard_data

@router.post("/complete", response_model=dict)
def complete_sdk_wizard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Mark the SDK wizard as complete for the current user.
    """
    # Update user's has_submitted_website flag
    current_user.has_submitted_website = True
    db.commit()
    
    return {"message": "SDK wizard completed successfully"}

@router.post("/extract-data", response_model=dict)
def extract_platform_data(
    *,
    extract_data: ExtractDataRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Extract data from the platform's products.json endpoint for Shopify stores.
    """
    try:
        if extract_data.platform.lower() == "shopify":
            # Construct the products.json URL using the store_url from the request
            store_url = extract_data.store_url.rstrip('/')
            products_url = f"{store_url}/products.json"
            print(f"Fetching products from: {products_url}")
            
            # Fetch products from the Shopify store
            response = requests.get(products_url)
            if response.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Failed to fetch products from Shopify store: {response.status_code}"
                )
            
            # Parse the response
            data = response.json()
            products = data.get('products', [])
            
            if not products:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="No products found in the Shopify store"
                )

            # Get only the first product
            first_product = products[0] if products else None
            
            # Update the SDK wizard data with extracted fields if it exists
            sdk_wizard_data = db.query(SdkWizardData).filter(SdkWizardData.user_id == current_user.id).first()
            if sdk_wizard_data and first_product:
                # Use the first product as a template for fields
                sdk_wizard_data.fields = first_product
                sdk_wizard_data.is_data_extracted = True
                db.commit()

            return {
                "success": True,
                "data": [first_product] if first_product else [],  # Return only the first product in an array
                "message": "Successfully extracted product data"
            }
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Platform {extract_data.platform} is not supported yet"
            )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to extract data: {str(e)}"
        )

@router.get("/dashboard", response_model=SdkDashboardResponse)
def get_sdk_dashboard(
    *,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get SDK management dashboard data including statistics and recent activities.
    """
    # Get SDK data for the current user
    sdk_data = db.query(SdkWizardData).filter(SdkWizardData.user_id == current_user.id).first()
    
    # If no SDK data exists, return default values
    if not sdk_data:
        return {
            "stats": {
                "totalIntegrations": 0,
                "activeIntegrations": 0,
                "pendingUpdates": 0,
                "healthScore": 0
            },
            "recent_activities": []
        }
    
    # Calculate statistics based on SDK data
    # This is a simplified example - in a real app, you would calculate these values
    # based on actual data from your database
    stats = {
        "totalIntegrations": 1,  # At least one integration exists
        "activeIntegrations": 1,  # Assuming the integration is active
        "pendingUpdates": 0,      # No pending updates by default
        "healthScore": 100        # Perfect health by default
    }
    
    # Generate recent activities based on SDK data
    # In a real app, you would store and retrieve actual activity logs
    recent_activities = [
        {
            "id": 1,
            "type": "integration",
            "message": f"Integration added: {sdk_data.platform}",
            "time": "Just now"
        }
    ]
    
    # If data extraction has been completed, add that activity
    if sdk_data.is_data_extracted:
        recent_activities.append({
            "id": 2,
            "type": "update",
            "message": f"Data extracted from {sdk_data.platform}",
            "time": "1 hour ago"
        })
    
    return {
        "stats": stats,
        "recent_activities": recent_activities
    } 