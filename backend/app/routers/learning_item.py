from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.core.database import get_pool
from app.models.learning_item import (
    LearningItemCreate,
    LearningItemResponse,
    LearningItemUpdate,
)
from app.services import learning_item_service
from app.services.auth_service import require_admin

router = APIRouter(prefix="/api/v1/learning", tags=["learning"])


@router.get("", response_model=list[LearningItemResponse])
async def list_learning():
    pool = await get_pool()
    return await learning_item_service.get_all(pool)


@router.post("", response_model=LearningItemResponse, status_code=201)
async def create_learning_item(
    data: LearningItemCreate, _: str = Depends(require_admin)
):
    pool = await get_pool()
    return await learning_item_service.create(pool, data)


@router.patch("/{item_id}", response_model=LearningItemResponse)
async def update_learning_item(
    item_id: UUID,
    data: LearningItemUpdate,
    _: str = Depends(require_admin),
):
    pool = await get_pool()
    item = await learning_item_service.update(pool, str(item_id), data)
    if not item:
        raise HTTPException(status_code=404, detail="Learning item not found")
    return item


@router.delete("/{item_id}", status_code=204)
async def delete_learning_item(item_id: UUID, _: str = Depends(require_admin)):
    pool = await get_pool()
    deleted = await learning_item_service.delete(pool, str(item_id))
    if not deleted:
        raise HTTPException(status_code=404, detail="Learning item not found")
