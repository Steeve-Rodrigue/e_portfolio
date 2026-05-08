import pytest
from httpx import ASGITransport, AsyncClient

from app.core.config import settings
from app.main import app

AUTH = "/api/v1/auth/login"
BASE = "/api/v1/learning"

SAMPLE = {
    "type": "course",
    "title": "Deep Learning Specialization",
    "source": "Coursera",
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
async def item(client, token):
    response = await client.post(
        BASE, json=SAMPLE, headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 201
    return response.json()


async def test_list_learning_empty(client):
    response = await client.get(BASE)
    assert response.status_code == 200
    assert response.json() == []


async def test_create_learning_item(client, token):
    response = await client.post(
        BASE, json=SAMPLE, headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Deep Learning Specialization"
    assert data["type"] == "course"
    assert data["is_current"] is False


async def test_create_learning_requires_auth(client):
    response = await client.post(BASE, json=SAMPLE)
    assert response.status_code == 401


async def test_update_learning_item(client, token, item):
    response = await client.patch(
        f"{BASE}/{item['id']}",
        json={"progress_pct": 75, "is_current": True},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["progress_pct"] == 75
    assert data["is_current"] is True


async def test_update_learning_requires_auth(client, item):
    response = await client.patch(f"{BASE}/{item['id']}", json={"progress_pct": 50})
    assert response.status_code == 401


async def test_update_learning_not_found(client, token):
    response = await client.patch(
        f"{BASE}/00000000-0000-0000-0000-000000000000",
        json={"progress_pct": 50},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 404


async def test_delete_learning_item(client, token, item):
    response = await client.delete(
        f"{BASE}/{item['id']}", headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 204


async def test_delete_learning_requires_auth(client, item):
    response = await client.delete(f"{BASE}/{item['id']}")
    assert response.status_code == 401


async def test_delete_learning_not_found(client, token):
    response = await client.delete(
        f"{BASE}/00000000-0000-0000-0000-000000000000",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 404
