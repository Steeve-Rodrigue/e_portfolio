import pytest
from httpx import ASGITransport, AsyncClient

from app.core.config import settings
from app.main import app

AUTH = "/api/v1/auth/login"


@pytest.fixture
async def client():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        yield ac


@pytest.fixture(autouse=True)
def admin_credentials(monkeypatch):
    monkeypatch.setattr(settings, "admin_email", "admin@test.com")
    monkeypatch.setattr(settings, "admin_password", "testpassword123")


async def test_login_success(client):
    response = await client.post(
        AUTH, json={"email": "admin@test.com", "password": "testpassword123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


async def test_login_wrong_password(client):
    response = await client.post(
        AUTH, json={"email": "admin@test.com", "password": "wrong"}
    )
    assert response.status_code == 401


async def test_login_wrong_email(client):
    response = await client.post(
        AUTH, json={"email": "wrong@test.com", "password": "testpassword123"}
    )
    assert response.status_code == 401
