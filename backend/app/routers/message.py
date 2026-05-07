from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.core.database import get_pool
from app.models.message import MessageCreate, MessageResponse
from app.services import message_service
from app.services.auth_service import require_admin

router = APIRouter(prefix="/api/v1/messages", tags=["messages"])


@router.post("", response_model=MessageResponse, status_code=201)
async def send_message(data: MessageCreate):
    pool = await get_pool()
    return await message_service.create(pool, data)


@router.get("", response_model=list[MessageResponse])
async def list_messages(_: str = Depends(require_admin)):
    pool = await get_pool()
    return await message_service.get_all(pool)


@router.patch("/{message_id}/read", response_model=MessageResponse)
async def read_message(message_id: UUID, _: str = Depends(require_admin)):
    pool = await get_pool()
    msg = await message_service.mark_read(pool, message_id)
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    return msg
