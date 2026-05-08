from datetime import date
from uuid import UUID

from pydantic import BaseModel


class CertificationCreate(BaseModel):
    name: str
    issuer: str
    url: str | None = None
    issued_at: date | None = None
    badge_url: str | None = None


class CertificationResponse(BaseModel):
    id: UUID
    name: str
    issuer: str
    url: str | None
    issued_at: date | None
    badge_url: str | None
