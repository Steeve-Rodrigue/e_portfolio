#!/usr/bin/env python3
import asyncio
import os
from pathlib import Path

import asyncpg

MIGRATIONS_DIR = Path(__file__).parent.parent / "migrations"


def _get_dsn() -> str:
    if dsn := os.environ.get("DATABASE_URL"):
        return dsn
    host = os.environ["POSTGRES_HOST"]
    port = os.environ.get("POSTGRES_PORT", "5432")
    db = os.environ["POSTGRES_DB"]
    user = os.environ["POSTGRES_USER"]
    password = os.environ["POSTGRES_PASSWORD"]
    return f"postgresql://{user}:{password}@{host}:{port}/{db}"


async def migrate() -> None:
    dsn = _get_dsn()
    conn = await asyncpg.connect(dsn=dsn)
    try:
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS _migrations (
                filename   text PRIMARY KEY,
                applied_at timestamp DEFAULT now()
            )
        """)
        applied = {row["filename"] for row in await conn.fetch("SELECT filename FROM _migrations")}
        files = sorted(f for f in MIGRATIONS_DIR.glob("*.sql") if not f.name.startswith("zzz"))
        for f in files:
            if f.name in applied:
                print(f"skip  {f.name}")
                continue
            print(f"apply {f.name} …")
            await conn.execute(f.read_text())
            await conn.execute("INSERT INTO _migrations (filename) VALUES ($1)", f.name)
            print(f"done  {f.name}")
    finally:
        await conn.close()


if __name__ == "__main__":
    asyncio.run(migrate())
