import asyncpg

from app.models.ml_model import MLModelCreate


async def list_by_project(pool: asyncpg.Pool, project_id: str) -> list[dict]:
    async with pool.acquire() as conn:
        rows = await conn.fetch(
            "SELECT * FROM ml_models WHERE project_id = $1 ORDER BY deployed_at DESC",
            project_id,
        )
    return [dict(r) for r in rows]


async def create(pool: asyncpg.Pool, project_id: str, data: MLModelCreate) -> dict:
    d = data.model_dump()
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO ml_models
                (project_id, name, endpoint, framework, description, accuracy, metrics,
                is_active)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
            """,
            project_id,
            d["name"],
            d["endpoint"],
            d["framework"],
            d["description"],
            d["accuracy"],
            d["metrics"],
            d["is_active"],
        )
    return dict(row)


async def set_active(pool: asyncpg.Pool, model_id: str, is_active: bool) -> dict | None:
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            "UPDATE ml_models SET is_active = $1 WHERE id = $2 RETURNING *",
            is_active,
            model_id,
        )
    return dict(row) if row else None
