import pytest
from httpx import ASGITransport, AsyncClient

from app.core.config import settings
from app.main import app

BASE = "/api/v1/messages"
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


@pytest.fixture
async def message(client):
    response = await client.post(
        BASE,
        json={
            "name": "John Doe",
            "email": "john@example.com",
            "message": "Hello, I'd like to collaborate",
            "project_type": "collaboration",
        },
    )
    assert response.status_code == 201
    return response.json()


async def test_send_message(client):
    response = await client.post(
        BASE,
        json={
            "name": "Jane Doe",
            "email": "jane@example.com",
            "message": "Great portfolio!",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Jane Doe"
    assert data["is_read"] is False


async def test_list_messages_requires_auth(client):
    response = await client.get(BASE)
    assert response.status_code == 401


async def test_list_messages(client, token):
    response = await client.get(BASE, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)


async def test_mark_read(client, token, message):
    response = await client.patch(
        f"{BASE}/{message['id']}/read",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    assert response.json()["is_read"] is True


async def test_mark_read_not_found(client, token):
    response = await client.patch(
        f"{BASE}/00000000-0000-0000-0000-000000000000/read",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 404
