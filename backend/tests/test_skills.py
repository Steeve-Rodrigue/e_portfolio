import pytest
from httpx import ASGITransport, AsyncClient

from app.core.config import settings
from app.main import app

AUTH = "/api/v1/auth/login"
BASE = "/api/v1/skills"

SAMPLE = {
    "name": "Python",
    "category": "Language",
    "cluster": "Data & Analytics",
    "mastery_level": 5,
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


@pytest.fixture
async def skill(client, token):
    response = await client.post(
        BASE, json=SAMPLE, headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 201
    return response.json()


async def test_list_skills_empty(client):
    response = await client.get(BASE)
    assert response.status_code == 200
    assert response.json() == []


async def test_create_skill(client, token):
    response = await client.post(
        BASE, json=SAMPLE, headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Python"
    assert data["mastery_level"] == 5
    assert data["featured"] is False


async def test_create_skill_requires_auth(client):
    response = await client.post(BASE, json=SAMPLE)
    assert response.status_code == 401


async def test_update_skill(client, token, skill):
    response = await client.patch(
        f"{BASE}/{skill['id']}",
        json={"mastery_level": 4, "featured": True},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["mastery_level"] == 4
    assert data["featured"] is True


async def test_update_skill_requires_auth(client, skill):
    response = await client.patch(f"{BASE}/{skill['id']}", json={"mastery_level": 3})
    assert response.status_code == 401


async def test_update_skill_not_found(client, token):
    response = await client.patch(
        f"{BASE}/00000000-0000-0000-0000-000000000000",
        json={"mastery_level": 3},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 404


async def test_delete_skill(client, token, skill):
    response = await client.delete(
        f"{BASE}/{skill['id']}", headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 204


async def test_delete_skill_requires_auth(client, skill):
    response = await client.delete(f"{BASE}/{skill['id']}")
    assert response.status_code == 401


async def test_delete_skill_not_found(client, token):
    response = await client.delete(
        f"{BASE}/00000000-0000-0000-0000-000000000000",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 404
