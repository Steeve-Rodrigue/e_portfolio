from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class MessageCreate(BaseModel):
    name: str
    email: str
    project_type: str | None = None
    message: str


class MessageResponse(BaseModel):
    id: UUID
    name: str
    email: str
    project_type: str | None
    message: str
    is_read: bool
    created_at: datetime
