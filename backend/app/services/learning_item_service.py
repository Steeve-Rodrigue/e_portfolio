import asyncpg

from app.models.learning_item import LearningItemCreate, LearningItemUpdate


async def get_all(pool: asyncpg.Pool) -> list[dict]:
    async with pool.acquire() as conn:
        rows = await conn.fetch(
            "SELECT * FROM learning_items ORDER BY is_current DESC, started_at "
            "DESC NULLS LAST"
        )
    return [dict(r) for r in rows]


async def create(pool: asyncpg.Pool, data: LearningItemCreate) -> dict:
    d = data.model_dump()
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO learning_items
                (type, title, source, url, progress_pct, is_current, status, started_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
            """,
            d["type"],
            d["title"],
            d["source"],
            d["url"],
            d["progress_pct"],
            d["is_current"],
            d["status"],
            d["started_at"],
        )
    return dict(row)


async def update(
    pool: asyncpg.Pool, item_id: str, data: LearningItemUpdate
) -> dict | None:
    fields = data.model_dump(exclude_unset=True)
    if not fields:
        async with pool.acquire() as conn:
            row = await conn.fetchrow(
                "SELECT * FROM learning_items WHERE id = $1", item_id
            )
        return dict(row) if row else None

    keys = list(fields.keys())
    values = list(fields.values())
    set_clause = ", ".join(f"{k} = ${i + 1}" for i, k in enumerate(keys))
    values.append(item_id)

    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            f"UPDATE learning_items SET {set_clause} WHERE id = ${len(values)}"
            " RETURNING *",
            *values,
        )
    return dict(row) if row else None


async def delete(pool: asyncpg.Pool, item_id: str) -> bool:
    async with pool.acquire() as conn:
        result = await conn.execute("DELETE FROM learning_items WHERE id = $1", item_id)
    return result == "DELETE 1"
