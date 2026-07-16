from dishka.integrations.fastapi import FromDishka, inject
from fastapi import APIRouter, status

from src.modules.catalog.schemas import ProductCreate, ProductRead
from src.modules.catalog.service import ProductService


router = APIRouter(prefix="/catalog", tags=["catalog"])


@router.get("/products", response_model=list[ProductRead])
@inject
async def list_products(service: FromDishka[ProductService]):
    return await service.list_products()

@router.post(
    "/products",
    response_model=ProductRead,
    status_code=status.HTTP_201_CREATED,
)
@inject
async def create_product(
    data: ProductCreate,
    service: FromDishka[ProductService],
):
    return await service.create_product(data)

@router.get("/products/{product_id}", response_model=ProductRead)
@inject
async def get_product(product_id: int, service: FromDishka[ProductService]):
    return await service.get_product(product_id)