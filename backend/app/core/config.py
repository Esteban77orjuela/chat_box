import secrets
import warnings
from pydantic_settings import BaseSettings
from pydantic import ConfigDict, field_validator
from typing import List


class Settings(BaseSettings):
    PROJECT_NAME: str = "Chat Box API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = ""
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7

    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ]

    DATABASE_URL: str = "sqlite:///./chat.db"

    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.1-8b-instant"

    @field_validator("SECRET_KEY", mode="before")
    @classmethod
    def validate_secret_key(cls, v: str) -> str:
        if not v or v in ("CHANGE_THIS_IN_PRODUCTION", "your_secret_key_here"):
            warnings.warn(
                "SECRET_KEY is not set or is using a default value. "
                "Generate a secure key with: openssl rand -hex 32",
                RuntimeWarning,
            )
            return secrets.token_hex(32)
        return v

    model_config = ConfigDict(env_file=(".env", "backend/.env"), case_sensitive=True)


settings = Settings()
