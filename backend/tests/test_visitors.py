import pytest
from httpx import ASGITransport, AsyncClient

from app.core.config import settings
from app.main import app

AUTH = "/api/v1/auth/login"
BASE = "/api/v1/visitors"

SAMPLE = {
    "page": "/projects/sentiment-analysis",
    "referrer": "https://linkedin.com",
    "country": "FR",
    "device": "desktop",
    "browser": "Chrome",
    "duration_s": 30,
}


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


@pytest.fixture
async def token(client):
    response = await client.post(
        AUTH, json={"email": "admin@test.com", "password": "testpassword123"}
    )
    return response.json()["access_token"]


async def test_track_visit(client):
    response = await client.post(BASE, json=SAMPLE)
    assert response.status_code == 201
    data = response.json()
    assert data["page"] == "/projects/sentiment-analysis"
    assert data["country"] == "FR"
    assert data["duration_s"] == 30


async def test_track_minimal(client):
    response = await client.post(BASE, json={"page": "/home"})
    assert response.status_code == 201
    data = response.json()
    assert data["page"] == "/home"
    assert data["referrer"] is None


async def test_get_analytics_requires_auth(client):
    response = await client.get(BASE)
    assert response.status_code == 401


async def test_get_analytics_empty(client, token):
    response = await client.get(BASE, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 0
    assert data["by_page"] == []
    assert data["top_referrers"] == []
    assert data["recent"] == []


async def test_get_analytics(client, token):
    await client.post(BASE, json=SAMPLE)
    await client.post(BASE, json=SAMPLE)
    await client.post(BASE, json={"page": "/home", "referrer": "https://github.com"})

    response = await client.get(BASE, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 3
    assert data["by_page"][0]["page"] == "/projects/sentiment-analysis"
    assert data["by_page"][0]["visits"] == 2
    assert data["top_referrers"][0]["referrer"] == "https://linkedin.com"
    assert len(data["recent"]) == 3
