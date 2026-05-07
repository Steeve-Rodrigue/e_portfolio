import pytest
from httpx import ASGITransport, AsyncClient

from app.core.config import settings
from app.main import app

BASE = "/api/v1/profile"
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


@pytest.fixture
async def token(client):
    response = await client.post(
        AUTH, json={"email": "admin@test.com", "password": "testpassword123"}
    )
    return response.json()["access_token"]


@pytest.fixture(autouse=True)
async def reset_profile(client, token):
    yield
    await client.patch(
        BASE,
        headers={"Authorization": f"Bearer {token}"},
        json={
            "name": "",
            "title": "",
            "tagline": None,
            "availability_status": None,
            "is_open_to_work": False,
            "location": None,
            "email": None,
            "github_url": None,
            "linkedin_url": None,
            "calendly_url": None,
            "social_links": None,
            "ethics_statement": None,
            "communication_style": None,
            "work_preference": None,
            "fun_fact": None,
        },
    )


async def test_get_profile(client):
    response = await client.get(BASE)
    assert response.status_code == 200
    data = response.json()
    assert "name" in data
    assert "title" in data
    assert "updated_at" in data


async def test_update_profile(client, token):
    response = await client.patch(
        BASE,
        headers={"Authorization": f"Bearer {token}"},
        json={"name": "Albert Einstein", "title": "Physicist"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Albert Einstein"
    assert data["title"] == "Physicist"


async def test_update_profile_partial(client, token):
    headers = {"Authorization": f"Bearer {token}"}
    await client.patch(
        BASE, headers=headers, json={"tagline": "Building data products"}
    )
    response = await client.patch(BASE, headers=headers, json={"is_open_to_work": True})
    assert response.status_code == 200
    data = response.json()
    assert data["is_open_to_work"] is True
    assert data["tagline"] == "Building data products"


async def test_update_profile_requires_auth(client):
    response = await client.patch(BASE, json={"name": "Hacker"})
    assert response.status_code == 403


async def test_update_profile_empty_body(client, token):
    original = (await client.get(BASE)).json()
    response = await client.patch(
        BASE,
        headers={"Authorization": f"Bearer {token}"},
        json={},
    )
    assert response.status_code == 200
    assert response.json()["name"] == original["name"]
