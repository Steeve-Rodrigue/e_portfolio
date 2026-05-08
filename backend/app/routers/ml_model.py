from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.core.database import get_pool
from app.models.ml_model import MLModelCreate, MLModelResponse, MLModelUpdate
from app.services import ml_model_service, project_service
from app.services.auth_service import require_admin

router = APIRouter(prefix="/api/v1", tags=["models"])


@router.get("/projects/{slug}/models", response_model=list[MLModelResponse])
async def list_models(slug: str):
    pool = await get_pool()
    project = await project_service.get_by_slug(pool, slug)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return await ml_model_service.list_by_project(pool, str(project["id"]))


@router.post("/projects/{slug}/models", response_model=MLModelResponse, status_code=201)
async def create_model(
    slug: str,
    data: MLModelCreate,
    _: str = Depends(require_admin),
):
    pool = await get_pool()
    project = await project_service.get_by_slug(pool, slug)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return await ml_model_service.create(pool, str(project["id"]), data)


@router.patch("/models/{model_id}", response_model=MLModelResponse)
async def update_model(
    model_id: UUID,
    data: MLModelUpdate,
    _: str = Depends(require_admin),
):
    pool = await get_pool()
    model = await ml_model_service.set_active(pool, str(model_id), data.is_active)
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    return model
