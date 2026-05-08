import asyncpg

from app.models.certification import CertificationCreate


async def get_all(pool: asyncpg.Pool) -> list[dict]:
    async with pool.acquire() as conn:
        rows = await conn.fetch(
            "SELECT * FROM certifications ORDER BY issued_at DESC NULLS LAST"
        )
    return [dict(r) for r in rows]


async def create(pool: asyncpg.Pool, data: CertificationCreate) -> dict:
    d = data.model_dump()
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO certifications (name, issuer, url, issued_at, badge_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            """,
            d["name"],
            d["issuer"],
            d["url"],
            d["issued_at"],
            d["badge_url"],
        )
    return dict(row)


async def delete(pool: asyncpg.Pool, cert_id: str) -> bool:
    async with pool.acquire() as conn:
        result = await conn.execute("DELETE FROM certifications WHERE id = $1", cert_id)
    return result == "DELETE 1"
