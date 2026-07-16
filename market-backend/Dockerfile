FROM python:3.14-slim

#ENV PYTHONDONTWRITEBYTECODE=1 \
#    PYTHONUNBUFFERED=1

WORKDIR /app

# Устанавливаем uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Кэшируем зависимости
COPY pyproject.toml uv.lock ./

RUN uv sync --frozen --no-dev

# Копируем исходники
COPY . .

EXPOSE 8000

# Сначала накатываем миграции, затем поднимаем приложение.
# (Docker позволяет только один CMD — поэтому объединяем в одну цепочку.)
CMD ["sh", "-c", "uv run alembic upgrade head && uv run uvicorn src.main:app --host 0.0.0.0 --port 8000"]