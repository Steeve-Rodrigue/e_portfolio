from uuid import UUID

import asyncpg

from app.models.message import MessageCreate


async def create(pool: asyncpg.Pool, data: MessageCreate) -> dict:
    d = data.model_dump()
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO messages (name, email, project_type, message)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            """,
            d["name"],
            d["email"],
            d["project_type"],
            d["message"],
        )
    return dict(row)


async def get_all(pool: asyncpg.Pool) -> list[dict]:
    async with pool.acquire() as conn:
        rows = await conn.fetch("SELECT * FROM messages ORDER BY created_at DESC")
    return [dict(r) for r in rows]


async def mark_read(pool: asyncpg.Pool, message_id: UUID) -> dict | None:
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            "UPDATE messages SET is_read = true WHERE id = $1 RETURNING *",
            message_id,
        )
    return dict(row) if row else None
