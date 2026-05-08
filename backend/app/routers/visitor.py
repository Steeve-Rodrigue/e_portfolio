from fastapi import APIRouter, Depends, Request

from app.core.database import get_pool
from app.core.limiter import limiter
from app.models.visitor import AnalyticsResponse, VisitorCreate, VisitorResponse
from app.services import visitor_service
from app.services.auth_service import require_admin

router = APIRouter(prefix="/api/v1/visitors", tags=["visitors"])


@router.post("", response_model=VisitorResponse, status_code=201)
@limiter.limit("120/minute")
async def track_visit(request: Request, data: VisitorCreate):
    pool = await get_pool()
    return await visitor_service.track(pool, data)


@router.get("", response_model=AnalyticsResponse)
async def get_analytics(_: str = Depends(require_admin)):
    pool = await get_pool()
    return await visitor_service.get_analytics(pool)
