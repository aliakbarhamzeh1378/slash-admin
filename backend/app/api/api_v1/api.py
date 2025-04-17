from fastapi import APIRouter

from app.api.api_v1.endpoints import auth, users, organizations, sdk_wizard

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(organizations.router, prefix="/org", tags=["organizations"])
api_router.include_router(sdk_wizard.router, prefix="/sdk-wizard", tags=["sdk-wizard"]) 