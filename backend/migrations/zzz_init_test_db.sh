#!/bin/bash
# Creates portfolio_test database and applies all migrations to it.
# Named zzz_ so it runs after all numbered SQL migration files in docker-entrypoint-initdb.d.
set -e

echo "Creating portfolio_test database..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" \
  -c "CREATE DATABASE portfolio_test;"

echo "Applying migrations to portfolio_test..."
for f in $(ls /docker-entrypoint-initdb.d/0*.sql | sort); do
  echo "  -> $f"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "portfolio_test" -f "$f"
done
echo "portfolio_test ready."
