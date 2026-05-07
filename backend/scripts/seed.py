#!/usr/bin/env python3
"""Populate the database from YAML data files.

Usage:
    uv run python scripts/seed.py                        # local (localhost:8000)
    uv run python scripts/seed.py --base-url https://api.steeve.dev

Credentials are read from the .env file or environment variables:
    ADMIN_EMAIL, ADMIN_PASSWORD
"""

import argparse
import sys
from pathlib import Path

import httpx
import yaml
from dotenv import dotenv_values

BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data"


def load_credentials() -> tuple[str, str]:
    env = {**dotenv_values(BASE_DIR / ".env")}
    email = env.get("ADMIN_EMAIL", "")
    password = env.get("ADMIN_PASSWORD", "")
    if not email or not password:
        print("ERROR: ADMIN_EMAIL and ADMIN_PASSWORD must be set in backend/.env")
        sys.exit(1)
    return email, password


def get_token(client: httpx.Client, base_url: str) -> str:
    email, password = load_credentials()
    response = client.post(
        f"{base_url}/api/v1/auth/login",
        json={"email": email, "password": password},
    )
    response.raise_for_status()
    return response.json()["access_token"]


def seed_profile(client: httpx.Client, base_url: str, token: str) -> None:
    data = yaml.safe_load((DATA_DIR / "profile.yaml").read_text())
    client.patch(
        f"{base_url}/api/v1/profile",
        json=data,
        headers={"Authorization": f"Bearer {token}"},
    ).raise_for_status()
    print("✓ Profile updated")


def seed_projects(client: httpx.Client, base_url: str, token: str) -> None:
    projects = yaml.safe_load((DATA_DIR / "projects.yaml").read_text())
    for project in projects:
        slug = project["slug"]
        exists = client.get(f"{base_url}/api/v1/projects/{slug}").status_code == 200
        if exists:
            client.patch(
                f"{base_url}/api/v1/projects/{slug}",
                json=project,
                headers={"Authorization": f"Bearer {token}"},
            ).raise_for_status()
            print(f"✓ Project updated:  {slug}")
        else:
            client.post(
                f"{base_url}/api/v1/projects",
                json=project,
                headers={"Authorization": f"Bearer {token}"},
            ).raise_for_status()
            print(f"✓ Project created:  {slug}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Seed the portfolio database")
    parser.add_argument("--base-url", default="http://localhost:8000")
    args = parser.parse_args()

    with httpx.Client(timeout=10.0) as client:
        print(f"Target: {args.base_url}")
        token = get_token(client, args.base_url)
        print("✓ Authenticated\n")
        seed_profile(client, args.base_url, token)
        seed_projects(client, args.base_url, token)
        print("\nDone.")


if __name__ == "__main__":
    main()
