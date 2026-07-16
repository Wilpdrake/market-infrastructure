from typing import AsyncIterable
from dishka import Provider, Scope, provide
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, async_sessionmaker, create_async_engine
from src.core.config import settings

class GlobalProvider(Provider):
    @provide(scope=Scope.APP)
    def get_engine(self) -> AsyncEngine:
        return create_async_engine(settings.DATABASE_URL)

    @provide(scope=Scope.REQUEST)
    async def get_session(self, engine: AsyncEngine) -> AsyncIterable[AsyncSession]:
        session_maker = async_sessionmaker(engine, expire_on_commit=False)
        async with session_maker() as session:
            yield session