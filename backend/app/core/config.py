from typing import Any, Dict, List, Optional, Union

from pydantic import AnyHttpUrl, EmailStr
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "your-secret-key-here"  # Change this in production
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30  # 30 days
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3001",
        "http://localhost:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3000"
    ]
    ALGORITHM: str = "HS256"  # Adding the missing ALGORITHM setting

    # Airflow settings
    AIRFLOW_URL: str = "http://localhost:8080"
    AIRFLOW_BASIC_AUTH: str = "YWRtaW46YWRtaW4="  # Base64 encoded "admin:admin"

    class Config:
        case_sensitive = True
        env_file = None  # Disable .env file loading

settings = Settings() 