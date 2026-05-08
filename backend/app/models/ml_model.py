from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class MLModelCreate(BaseModel):
    name: str
    endpoint: str
    framework: str | None = None
    description: str | None = None
    accuracy: float | None = None
    metrics: dict | None = None
    is_active: bool = True


class MLModelUpdate(BaseModel):
    is_active: bool


class MLModelResponse(BaseModel):
    id: UUID
    project_id: UUID
    name: str
    endpoint: str
    framework: str | None
    description: str | None
    accuracy: float | None
    metrics: dict | None
    is_active: bool
    deployed_at: datetime
