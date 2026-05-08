from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.core.database import get_pool
from app.models.certification import CertificationCreate, CertificationResponse
from app.services import certification_service
from app.services.auth_service import require_admin

router = APIRouter(prefix="/api/v1/certifications", tags=["certifications"])


@router.get("", response_model=list[CertificationResponse])
async def list_certifications():
    pool = await get_pool()
    return await certification_service.get_all(pool)


@router.post("", response_model=CertificationResponse, status_code=201)
async def create_certification(
    data: CertificationCreate, _: str = Depends(require_admin)
):
    pool = await get_pool()
    return await certification_service.create(pool, data)


@router.delete("/{cert_id}", status_code=204)
async def delete_certification(cert_id: UUID, _: str = Depends(require_admin)):
    pool = await get_pool()
    deleted = await certification_service.delete(pool, str(cert_id))
    if not deleted:
        raise HTTPException(status_code=404, detail="Certification not found")
