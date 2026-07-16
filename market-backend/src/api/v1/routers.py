from fastapi import APIRouter

from .catalog import router as catalog_router
from .healthcheck import router as healthcheck_router


v1_router = APIRouter(prefix="/api/v1")

routers_list = [
    catalog_router,
    healthcheck_router,
]

for router in routers_list:
    v1_router.include_router(router)
