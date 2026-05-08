from datetime import date
from typing import Literal
from uuid import UUID

from pydantic import BaseModel


class LearningItemCreate(BaseModel):
    type: Literal["paper", "course", "competition", "current"]
    title: str
    source: str | None = None
    url: str | None = None
    progress_pct: int | None = None
    is_current: bool = False
    status: str | None = None
    started_at: date | None = None


class LearningItemUpdate(BaseModel):
    type: Literal["paper", "course", "competition", "current"] | None = None
    title: str | None = None
    source: str | None = None
    url: str | None = None
    progress_pct: int | None = None
    is_current: bool | None = None
    status: str | None = None
    started_at: date | None = None


class LearningItemResponse(BaseModel):
    id: UUID
    type: str
    title: str
    source: str | None
    url: str | None
    progress_pct: int | None
    is_current: bool
    status: str | None
    started_at: date | None
