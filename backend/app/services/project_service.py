import asyncpg

from app.models.project import (
    ProjectCreate,
    ProjectUpdate,
)


async def get_all(pool: asyncpg.Pool, page: int, size: int) -> tuple[list[dict], int]:
    offset = (page - 1) * size
    async with pool.acquire() as conn:
        rows = await conn.fetch(
            """
            SELECT * FROM projects
            ORDER BY display_order ASC, created_at DESC
            LIMIT $1 OFFSET $2
            """,
            size,
            offset,
        )
        total = await conn.fetchval("SELECT COUNT(*) FROM projects")
    return [dict(r) for r in rows], total


async def get_by_slug(pool: asyncpg.Pool, slug: str) -> dict | None:
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            "SELECT * FROM projects WHERE slug = $1",
            slug,
        )
    return dict(row) if row else None


async def create(pool: asyncpg.Pool, data: ProjectCreate) -> dict:
    import json

    d = data.model_dump()
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO projects (
                slug, title, properties, context, problematic, methodology,
                results_impact, metrics, tech_stack, categories,
                github_url, demo_url, notebook_url, thumbnail_url,
                has_ml_demo, ml_endpoint, featured, display_order
            ) VALUES (
                $1, $2, $3, $4::jsonb, $5::jsonb, $6::jsonb,
                $7, $8::jsonb, $9, $10,
                $11, $12, $13, $14,
                $15, $16, $17, $18
            ) RETURNING *
            """,
            d["slug"],
            d["title"],
            d["properties"],
            json.dumps(d["context"]),
            json.dumps(d["problematic"]),
            json.dumps(d["methodology"]),
            d["results_impact"],
            json.dumps(d["metrics"]) if d["metrics"] is not None else None,
            d["tech_stack"],
            d["categories"],
            d["github_url"],
            d["demo_url"],
            d["notebook_url"],
            d["thumbnail_url"],
            d["has_ml_demo"],
            d["ml_endpoint"],
            d["featured"],
            d["display_order"],
        )
    return dict(row)


async def update(
    pool: asyncpg.Pool,
    slug: str,
    data: ProjectUpdate,
) -> dict | None:
    import json

    fields = data.model_dump(exclude_unset=True)
    if not fields:
        return await get_by_slug(pool, slug)

    jsonb_fields = {"context", "problematic", "methodology", "metrics"}
    for key in jsonb_fields:
        if key in fields:
            fields[key] = json.dumps(fields[key]) if fields[key] is not None else None

    keys = list(fields.keys())
    values = list(fields.values())
    set_clause = ", ".join(
        f"{key} = ${i + 1}::jsonb" if key in jsonb_fields else f"{key} = ${i + 1}"
        for i, key in enumerate(keys)
    )
    values.append(slug)

    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            f"UPDATE projects SET {set_clause} WHERE slug = ${len(values)} RETURNING *",
            *values,
        )
    return dict(row) if row else None


async def delete(pool: asyncpg.Pool, slug: str) -> bool:
    async with pool.acquire() as conn:
        result = await conn.execute(
            "DELETE FROM projects WHERE slug = $1",
            slug,
        )
    return result == "DELETE 1"
