import asyncpg

from app.models.experience import ExperienceCreate, ExperienceUpdate


async def get_all(pool: asyncpg.Pool) -> list[dict]:
    async with pool.acquire() as conn:
        rows = await conn.fetch(
            "SELECT * FROM experience ORDER BY display_order ASC, start_date DESC"
        )
    return [dict(r) for r in rows]


async def create(pool: asyncpg.Pool, data: ExperienceCreate) -> dict:
    d = data.model_dump()
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO experience
                (type, company, role, description, impact_metric,
                 start_date, end_date, is_current, logo_url, display_order)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
            """,
            d["type"],
            d["company"],
            d["role"],
            d["description"],
            d["impact_metric"],
            d["start_date"],
            d["end_date"],
            d["is_current"],
            d["logo_url"],
            d["display_order"],
        )
    return dict(row)


async def update(
    pool: asyncpg.Pool, experience_id: str, data: ExperienceUpdate
) -> dict | None:
    fields = data.model_dump(exclude_unset=True)
    if not fields:
        async with pool.acquire() as conn:
            row = await conn.fetchrow(
                "SELECT * FROM experience WHERE id = $1", experience_id
            )
        return dict(row) if row else None

    keys = list(fields.keys())
    values = list(fields.values())
    set_clause = ", ".join(f"{k} = ${i + 1}" for i, k in enumerate(keys))
    values.append(experience_id)

    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            f"UPDATE experience SET {set_clause} WHERE id = ${len(values)} RETURNING *",
            *values,
        )
    return dict(row) if row else None


async def delete(pool: asyncpg.Pool, experience_id: str) -> bool:
    async with pool.acquire() as conn:
        result = await conn.execute(
            "DELETE FROM experience WHERE id = $1", experience_id
        )
    return result == "DELETE 1"
