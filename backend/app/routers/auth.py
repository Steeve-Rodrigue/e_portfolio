from fastapi import APIRouter, HTTPException

from app.core.config import settings
from app.models.auth import LoginRequest, TokenResponse
from app.services.auth_service import create_token

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest):
    if data.email != settings.admin_email or data.password != settings.admin_password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": create_token(data.email), "token_type": "bearer"}
