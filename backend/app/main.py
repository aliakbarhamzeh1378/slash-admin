from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.api_v1.api import api_router
from app.db.database import Base, engine, SessionLocal
from app.db.init_db import init_db

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize database with default data
db = SessionLocal()
init_db(db)
db.close()

app = FastAPI(
    title="Perche Admin API",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"]
    )

app.include_router(api_router, prefix=settings.API_V1_STR) 