from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.core.database import get_pool
from app.models.experience import ExperienceCreate, ExperienceResponse, ExperienceUpdate
from app.services import experience_service
from app.services.auth_service import require_admin

router = APIRouter(prefix="/api/v1/experience", tags=["experience"])


@router.get("", response_model=list[ExperienceResponse])
async def list_experience():
    pool = await get_pool()
    return await experience_service.get_all(pool)


@router.post("", response_model=ExperienceResponse, status_code=201)
async def create_experience(data: ExperienceCreate, _: str = Depends(require_admin)):
    pool = await get_pool()
    return await experience_service.create(pool, data)


@router.patch("/{experience_id}", response_model=ExperienceResponse)
async def update_experience(
    experience_id: UUID,
    data: ExperienceUpdate,
    _: str = Depends(require_admin),
):
    pool = await get_pool()
    item = await experience_service.update(pool, str(experience_id), data)
    if not item:
        raise HTTPException(status_code=404, detail="Experience not found")
    return item


@router.delete("/{experience_id}", status_code=204)
async def delete_experience(experience_id: UUID, _: str = Depends(require_admin)):
    pool = await get_pool()
    deleted = await experience_service.delete(pool, str(experience_id))
    if not deleted:
        raise HTTPException(status_code=404, detail="Experience not found")
