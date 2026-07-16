from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DEBUG: bool = False

    # Async-драйвер Postgres. Реальное значение приходит из .env (gitignored)
    # или из окружения (docker-compose инжектит ${POSTGRES_*}).
    # В docker-compose host = "postgres", локально — "localhost". См. .env.example.
    DATABASE_URL: str = "postgresql+asyncpg://market:changeme@postgres:5432/market"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
