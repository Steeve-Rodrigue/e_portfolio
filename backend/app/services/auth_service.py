from datetime import datetime, timedelta, timezone

import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.config import settings

_security = HTTPBearer()


def create_token(email: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.jwt_expire_minutes)
    return jwt.encode(
        {"sub": email, "exp": expire},
        settings.jwt_secret,
        algorithm=settings.jwt_algorithm,
    )


def verify_token(token: str) -> str:
    try:
        payload = jwt.decode(
            token, settings.jwt_secret, algorithms=[settings.jwt_algorithm]
        )
        return payload["sub"]
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


async def require_admin(
    credentials: HTTPAuthorizationCredentials = Depends(_security),
) -> str:
    return verify_token(credentials.credentials)
