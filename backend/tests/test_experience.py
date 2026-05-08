import pytest
from httpx import ASGITransport, AsyncClient

from app.core.config import settings
from app.main import app

AUTH = "/api/v1/auth/login"
BASE = "/api/v1/experience"

SAMPLE = {
    "type": "job",
    "company": "Acme Corp",
    "role": "Data Scientist",
    "start_date": "2023-01-01",
    "is_current": True,
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
async def entry(client, token):
    response = await client.post(
        BASE, json=SAMPLE, headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 201
    return response.json()


async def test_list_experience_empty(client):
    response = await client.get(BASE)
    assert response.status_code == 200
    assert isinstance(response.json(), list)


async def test_create_experience(client, token):
    response = await client.post(
        BASE, json=SAMPLE, headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["company"] == "Acme Corp"
    assert data["type"] == "job"
    assert data["is_current"] is True


async def test_create_experience_requires_auth(client):
    response = await client.post(BASE, json=SAMPLE)
    assert response.status_code == 401


async def test_update_experience(client, token, entry):
    response = await client.patch(
        f"{BASE}/{entry['id']}",
        json={"role": "Senior Data Scientist"},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    assert response.json()["role"] == "Senior Data Scientist"


async def test_update_experience_requires_auth(client, entry):
    response = await client.patch(f"{BASE}/{entry['id']}", json={"role": "x"})
    assert response.status_code == 401


async def test_update_experience_not_found(client, token):
    response = await client.patch(
        f"{BASE}/00000000-0000-0000-0000-000000000000",
        json={"role": "x"},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 404


async def test_delete_experience(client, token, entry):
    response = await client.delete(
        f"{BASE}/{entry['id']}", headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 204


async def test_delete_experience_requires_auth(client, entry):
    response = await client.delete(f"{BASE}/{entry['id']}")
    assert response.status_code == 401


async def test_delete_experience_not_found(client, token):
    response = await client.delete(
        f"{BASE}/00000000-0000-0000-0000-000000000000",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 404
