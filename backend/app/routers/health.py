from datetime import UTC, datetime

from fastapi import APIRouter

from app.core.database import get_pool

router = APIRouter(tags=["health"])


_started_at = datetime.now(UTC)


@router.get("/health")
async def health():
    pool = await get_pool()
    async with pool.acquire() as conn:
        await conn.fetchval("SELECT 1")

    return {
        "status": "ok",
        "database": "connected",
        "pool": {
            "size": pool.get_size(),
            "free": pool.get_idle_size(),
        },
        "uptime_s": int((datetime.now(UTC) - _started_at).total_seconds()),
    }


@router.get("/health_db")
async def health_db():
    try:
        pool = await get_pool()
        async with pool.acquire() as conn:
            await conn.fetchval("SELECT 1")
        return {
            "status": "ok",
            "database": "connected",
        }

    except Exception:
        return {"status": "degraded"}
