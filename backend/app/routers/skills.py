from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.core.database import get_pool
from app.models.skill import SkillCreate, SkillResponse, SkillUpdate
from app.services import skill_service
from app.services.auth_service import require_admin

router = APIRouter(prefix="/api/v1/skills", tags=["skills"])


@router.get("", response_model=list[SkillResponse])
async def list_skills():
    pool = await get_pool()
    return await skill_service.get_all(pool)


@router.post("", response_model=SkillResponse, status_code=201)
async def create_skill(data: SkillCreate, _: str = Depends(require_admin)):
    pool = await get_pool()
    return await skill_service.create(pool, data)


@router.patch("/{skill_id}", response_model=SkillResponse)
async def update_skill(
    skill_id: UUID,
    data: SkillUpdate,
    _: str = Depends(require_admin),
):
    pool = await get_pool()
    skill = await skill_service.update(pool, str(skill_id), data)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return skill


@router.delete("/{skill_id}", status_code=204)
async def delete_skill(skill_id: UUID, _: str = Depends(require_admin)):
    pool = await get_pool()
    deleted = await skill_service.delete(pool, str(skill_id))
    if not deleted:
        raise HTTPException(status_code=404, detail="Skill not found")
