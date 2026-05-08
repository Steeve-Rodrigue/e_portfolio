import asyncpg

from app.models.skills import SkillCreate, SkillUpdate


async def get_all(pool: asyncpg.Pool) -> list[dict]:
    async with pool.acquire() as conn:
        rows = await conn.fetch(
            "SELECT * FROM skills ORDER BY cluster ASC, display_order ASC"
        )
    return [dict(r) for r in rows]


async def create(pool: asyncpg.Pool, data: SkillCreate) -> dict:
    d = data.model_dump()
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO skills
                (name, category, cluster, icon_devicon, mastery_level,
                featured, display_order)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            """,
            d["name"],
            d["category"],
            d["cluster"],
            d["icon_devicon"],
            d["mastery_level"],
            d["featured"],
            d["display_order"],
        )
    return dict(row)


async def update(pool: asyncpg.Pool, skill_id: str, data: SkillUpdate) -> dict | None:
    fields = data.model_dump(exclude_unset=True)
    if not fields:
        async with pool.acquire() as conn:
            row = await conn.fetchrow("SELECT * FROM skills WHERE id = $1", skill_id)
        return dict(row) if row else None

    keys = list(fields.keys())
    values = list(fields.values())
    set_clause = ", ".join(f"{k} = ${i + 1}" for i, k in enumerate(keys))
    values.append(skill_id)

    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            f"UPDATE skills SET {set_clause} WHERE id = ${len(values)} RETURNING *",
            *values,
        )
    return dict(row) if row else None


async def delete(pool: asyncpg.Pool, skill_id: str) -> bool:
    async with pool.acquire() as conn:
        result = await conn.execute("DELETE FROM skills WHERE id = $1", skill_id)
    return result == "DELETE 1"
