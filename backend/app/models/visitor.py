from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class VisitorCreate(BaseModel):
    page: str
    referrer: str | None = None
    country: str | None = None
    city: str | None = None
    device: str | None = None
    browser: str | None = None
    duration_s: int | None = None


class VisitorResponse(BaseModel):
    id: UUID
    page: str
    referrer: str | None
    country: str | None
    city: str | None
    device: str | None
    browser: str | None
    duration_s: int | None
    visited_at: datetime


class PageStat(BaseModel):
    page: str
    visits: int


class ReferrerStat(BaseModel):
    referrer: str
    visits: int


class AnalyticsResponse(BaseModel):
    total: int
    by_page: list[PageStat]
    top_referrers: list[ReferrerStat]
    recent: list[VisitorResponse]
