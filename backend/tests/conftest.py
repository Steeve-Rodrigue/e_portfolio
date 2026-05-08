import pytest

from app.core import database
from app.core.database import get_pool

_TRUNCATE = """
TRUNCATE TABLE
    projects,
    experience,
    messages
CASCADE
"""


@pytest.fixture(autouse=True)
async def clean_db():
    """Reset pool and truncate all mutable tables before and after each test.

    Pool is reset to None so a fresh pool is created in this test's event loop,
    avoiding asyncpg cross-loop errors (asyncio_default_fixture_loop_scope=function).
    Tables are truncated before and after so no test data ever persists in
    portfolio_test.
    """
    database._pool = None
    pool = await get_pool()
    async with pool.acquire() as conn:
        await conn.execute(_TRUNCATE)
    yield
