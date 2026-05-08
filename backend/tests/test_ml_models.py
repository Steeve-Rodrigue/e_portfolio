import pytest
from httpx import ASGITransport, AsyncClient

from app.core.config import settings
from app.main import app

AUTH = "/api/v1/auth/login"
PROJECTS = "/api/v1/projects"
MODELS = "/api/v1/models"


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
async def project(client, token):
    response = await client.post(
        PROJECTS,
        json={"slug": "test-model-project", "title": "Test Project"},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 201
    yield response.json()
    await client.delete(
        f"{PROJECTS}/test-model-project",
        headers={"Authorization": f"Bearer {token}"},
    )


@pytest.fixture
async def model(client, token, project):
    response = await client.post(
        f"{PROJECTS}/{project['slug']}/models",
        json={"name": "v1", "endpoint": "/predict"},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 201
    return response.json()


async def test_list_models_empty(client, project):
    response = await client.get(f"{PROJECTS}/{project['slug']}/models")
    assert response.status_code == 200
    assert response.json() == []


async def test_list_models_unknown_project(client):
    response = await client.get(f"{PROJECTS}/does-not-exist/models")
    assert response.status_code == 404


async def test_create_model(client, token, project):
    response = await client.post(
        f"{PROJECTS}/{project['slug']}/models",
        json={
            "name": "v1",
            "endpoint": "/predict",
            "framework": "PyTorch",
            "accuracy": 0.94,
        },
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "v1"
    assert data["accuracy"] == 0.94
    assert data["is_active"] is True
    assert data["project_id"] == project["id"]


async def test_create_model_requires_auth(client, project):
    response = await client.post(
        f"{PROJECTS}/{project['slug']}/models",
        json={"name": "v1", "endpoint": "/predict"},
    )
    assert response.status_code == 401


async def test_create_model_unknown_project(client, token):
    response = await client.post(
        f"{PROJECTS}/does-not-exist/models",
        json={"name": "v1", "endpoint": "/predict"},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 404


async def test_toggle_model_active(client, token, model):
    response = await client.patch(
        f"{MODELS}/{model['id']}",
        json={"is_active": False},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    assert response.json()["is_active"] is False


async def test_toggle_model_requires_auth(client, model):
    response = await client.patch(
        f"{MODELS}/{model['id']}",
        json={"is_active": False},
    )
    assert response.status_code == 401


async def test_toggle_model_not_found(client, token):
    response = await client.patch(
        f"{MODELS}/00000000-0000-0000-0000-000000000000",
        json={"is_active": False},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 404
