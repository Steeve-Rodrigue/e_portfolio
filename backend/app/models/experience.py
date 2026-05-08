from datetime import date
from typing import Literal
from uuid import UUID

from pydantic import BaseModel


class ExperienceCreate(BaseModel):
    type: Literal["job", "education"]
    company: str
    role: str
    description: str | None = None
    impact_metric: str | None = None
    start_date: date
    end_date: date | None = None
    is_current: bool = False
    logo_url: str | None = None
    display_order: int = 0


class ExperienceUpdate(BaseModel):
    type: Literal["job", "education"] | None = None
    company: str | None = None
    role: str | None = None
    description: str | None = None
    impact_metric: str | None = None
    start_date: date | None = None
    end_date: date | None = None
    is_current: bool | None = None
    logo_url: str | None = None
    display_order: int | None = None


class ExperienceResponse(BaseModel):
    id: UUID
    type: str
    company: str
    role: str
    description: str | None
    impact_metric: str | None
    start_date: date
    end_date: date | None
    is_current: bool
    logo_url: str | None
    display_order: int
