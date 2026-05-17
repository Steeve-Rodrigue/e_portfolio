import asyncpg

from app.models.visitor import VisitorCreate


async def track(pool: asyncpg.Pool, data: VisitorCreate) -> dict:
    d = data.model_dump()
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO visitors (page, referrer, country, city, device, browser,
            duration_s)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            """,
            d["page"],
            d["referrer"],
            d["country"],
            d["city"],
            d["device"],
            d["browser"],
            d["duration_s"],
        )
    return dict(row)


async def get_analytics(pool: asyncpg.Pool) -> dict:
    async with pool.acquire() as conn:
        total = await conn.fetchval("SELECT COUNT(*) FROM visitors")

        by_page = await conn.fetch(
            """
            SELECT page, COUNT(*) AS visits
            FROM visitors
            GROUP BY page
            ORDER BY visits DESC
            LIMIT 20
            """
        )

        top_referrers = await conn.fetch(
            """
            SELECT referrer, COUNT(*) AS visits
            FROM visitors
            WHERE referrer IS NOT NULL AND referrer != ''
            GROUP BY referrer
            ORDER BY visits DESC
            LIMIT 10
            """
        )

        recent = await conn.fetch(
            "SELECT * FROM visitors ORDER BY visited_at DESC LIMIT 50"
        )

    return {
        "total": total,
        "by_page": [dict(r) for r in by_page],
        "top_referrers": [dict(r) for r in top_referrers],
        "recent": [dict(r) for r in recent],
    }


async def reset_analytics(pool: asyncpg.Pool) -> int:
    async with pool.acquire() as conn:
        result = await conn.execute("DELETE FROM visitors")
    return int(result.split()[-1])
