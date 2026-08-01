# Environment variables and Jenkins

## Local Compose

Compose reads variables in this order: values exported by the shell, then `.env` next to
`docker-compose.yml`, then defaults written as `${NAME:-default}` in Compose. Shell values
win over `.env`.

Create the local file from the committed template:

```bash
cd market-infrastructure
cp .env.example .env
chmod 600 .env
```

Fill in `.env`, then start the stack:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

`.env` is ignored by Git. Never commit it. `.env.example` contains names and safe examples,
not real credentials.

### Variables

| Variable | Secret | Purpose |
|---|---:|---|
| `POSTGRES_USER` | yes | PostgreSQL role and backend connection user |
| `POSTGRES_PASSWORD` | yes | PostgreSQL password; reserved URL characters are encoded by backend settings |
| `POSTGRES_DB` | no | Database name |
| `BACKEND_SECRET_KEY` | yes | JWT signing key, at least 32 random characters recommended |
| `FIRST_SUPERUSER_EMAIL` | yes | Initial administrator login |
| `FIRST_SUPERUSER_USERNAME` | no | Optional username accepted by the same login endpoint |
| `FIRST_SUPERUSER_ROLE` | no | Explicit administration role: `owner`, `admin`, `moder`, or `developer` |
| `FIRST_SUPERUSER_PASSWORD` | yes | Initial administrator password, at least 8 characters |
| `FIRST_SUPERUSER_NAME` | no | Initial administrator first name |
| `FIRST_SUPERUSER_SURNAME` | no | Initial administrator surname |
| `TELEGRAM_BOT_TOKEN` | yes | Optional backend Telegram integration token |
| `TELEGRAM_BOT_USERNAME` | no | Public username of the optional backend bot |
| `TELEGRAM_WEBHOOK_SECRET` | yes | Optional backend webhook verification secret |
| `BACKEND_CONTEXT` | no | Backend Docker build context; defaults to `../market-backend` |
| `FRONTEND_CONTEXT` | no | Frontend Docker build context; defaults to `../market-frontend` |
| `HTTP_PORT` | no | Public Nginx host port; defaults to `80` |

`FIRST_SUPERUSER_EMAIL` and `FIRST_SUPERUSER_PASSWORD` must either both be present or both
be absent. `FIRST_SUPERUSER_USERNAME` is optional. Bootstrap never promotes an existing
regular account merely because its email matches.

Backend-only development uses `market-backend/.env`. Frontend build-time variables use
`market-frontend/.env`; Vite exposes only variables prefixed with `VITE_`. With the production
same-origin gateway, `VITE_API_BASE_URL` stays empty, `VITE_API_VERSION=v1`, and
`VITE_PUBLIC_PRODUCTS_PATH=products`.

## Jenkins Credentials

Create these as **Secret text** credentials in Jenkins. The IDs must match exactly:

| Credential ID | Required value format |
|---|---|
| `postgres-user` | PostgreSQL role, for example `market` |
| `postgres-password` | Strong password; reserved URL characters are supported |
| `postgres-db` | Database name, for example `market` |
| `backend-secret-key` | Random string of at least 32 characters |
| `first-superuser-email` | Valid administrator email address |
| `first-superuser-password` | Strong password of at least 8 characters |

The existing Telegram notification separately uses Secret text credential ID
`telegram-bot-token` containing only the bot token.

That Jenkins notification credential is intentionally not written to the application `.env`.
Backend Telegram integration remains disabled until separate application credentials are
provisioned; notification and application bots must not share a secret implicitly.

Do not add production values to Jenkins global environment variables, repository files,
job parameters, or console-visible shell commands. The Declarative `environment` block
binds credentials with masking before stages run, so every listed credential must exist
before the Jenkinsfile is deployed.

## Jenkins lifecycle

The pipeline deliberately handles environment data as follows:

1. Jenkins binds Secret text credentials to masked process environment variables.
2. `docker compose config --quiet` validates interpolation before any `.env` file exists.
3. Source and image security scans run without production secret files in the workspace.
4. Deploy validates only non-secret shape: key/password length, paired credentials, email form.
5. Deploy writes a temporary `.env` with shell tracing disabled, JSON-safe dotenv quoting,
   `umask 077`, and verifies mode `0600`.
6. A one-shot backend container runs `alembic upgrade head`; only then does Compose update
   application containers. The temporary `.env` is removed automatically.
7. Smoke tests verify the SPA root and `/admin`, backend health, database-backed
   `/api/v1/products`, and the
   semantic OpenAPI document.

Never print `.env`, run `docker compose config` without redaction in logs, archive/stash the
file, or add it to security-report artifacts.

## Useful checks

```bash
# Validate without starting containers (values shown here are placeholders).
POSTGRES_USER=market \
POSTGRES_PASSWORD=test-only-url-safe-password \
POSTGRES_DB=market \
BACKEND_SECRET_KEY=test-only-secret-key-at-least-32 \
FIRST_SUPERUSER_EMAIL=admin@example.com \
FIRST_SUPERUSER_USERNAME=owner \
FIRST_SUPERUSER_ROLE=owner \
FIRST_SUPERUSER_PASSWORD=test-only-admin-password \
FRONTEND_CONTEXT=../market-frontend \
docker compose -f docker-compose.yml -f docker-compose.prod.yml config --quiet

# Runtime checks.
curl -fsS http://127.0.0.1/healthz
curl -fsS http://127.0.0.1/api/v1/products
```
