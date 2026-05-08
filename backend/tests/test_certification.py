import pytest
from httpx import ASGITransport, AsyncClient

from app.core.config import settings
from app.main import app

AUTH = "/api/v1/auth/login"
BASE = "/api/v1/certifications"

SAMPLE = {
    "name": "AWS Cloud Practitioner",
    "issuer": "Amazon",
    "issued_at": "2024-03-01",
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
async def cert(client, token):
    response = await client.post(
        BASE, json=SAMPLE, headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 201
    return response.json()


async def test_list_certifications_empty(client):
    response = await client.get(BASE)
    assert response.status_code == 200
    assert isinstance(response.json(), list)


async def test_create_certification(client, token):
    response = await client.post(
        BASE, json=SAMPLE, headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "AWS Cloud Practitioner"
    assert data["issuer"] == "Amazon"


async def test_create_certification_requires_auth(client):
    response = await client.post(BASE, json=SAMPLE)
    assert response.status_code == 401


async def test_delete_certification(client, token, cert):
    response = await client.delete(
        f"{BASE}/{cert['id']}", headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 204


async def test_delete_certification_requires_auth(client, cert):
    response = await client.delete(f"{BASE}/{cert['id']}")
    assert response.status_code == 401


async def test_delete_certification_not_found(client, token):
    response = await client.delete(
        f"{BASE}/00000000-0000-0000-0000-000000000000",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 404
