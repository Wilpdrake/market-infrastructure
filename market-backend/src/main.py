import uvicorn
from dishka import make_async_container
from dishka.integrations.fastapi import setup_dishka
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from src.api.v1.routers import v1_router
from src.core.config import settings
from src.core.exceptions import ProductAlreadyExistsError, ProductNotFoundError
from src.core.logging import configure_logging
from src.infrastructure.ioc import GlobalProvider
from src.modules.catalog.ioc import CatalogProvider

configure_logging()

app = FastAPI(
    title="Market API",
    debug=settings.DEBUG,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #! Replace in Prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(ProductNotFoundError)
async def product_not_found_handler(request: Request, exc: ProductNotFoundError):
    return JSONResponse(status_code=404, content={"detail": exc.message})


@app.exception_handler(ProductAlreadyExistsError)
async def product_exists_handler(request: Request, exc: ProductAlreadyExistsError):
    return JSONResponse(status_code=400, content={"detail": exc.message})


app.include_router(v1_router)

container = make_async_container(
    GlobalProvider(),
    CatalogProvider(),
)
setup_dishka(container, app)


if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_config=None,
    )
