.PHONY: build stop logs db-shell test lint fe-dev fe-lint fe-fmt fe-check

build:
	sudo docker compose up  --build && uv run python seed.py  --base-url http://localhost:8000

down:
	sudo docker compose down -v

logs:
	sudo docker compose logs -f api

db-shell:
	sudo docker compose exec db psql -U portfolio_user -d portfolio

test:
	cd backend && POSTGRES_DB=portfolio_test uv run pytest tests/ -v

lint:
	cd backend && uv run ruff check app/

format:
	cd backend && uv run ruff format app/

uvicorn:
	cd backend && uv run uvicorn app.main:app

coverage:
	cd backend && POSTGRES_DB=portfolio_test uv run pytest --cov=app tests/

restart:
	sudo docker compose restart api

sql-migrate:
	cd backend && sudo docker compose exec db psql -U portfolio_user -d portfolio -f /docker-entrypoint-initdb.d/${file}

fe-dev:
	cd frontend && pnpm dev

fe-lint:
	cd frontend && pnpm eslint . --ext .ts,.tsx

fe-fmt:
	cd frontend && pnpm prettier --write .

fe-check:
	cd frontend && pnpm tsc --noEmit
