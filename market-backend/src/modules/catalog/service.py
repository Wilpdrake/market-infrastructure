from src.core.exceptions import ProductAlreadyExistsError, ProductNotFoundError

from .models import ProductModel
from .repository import ProductRepository
from .schemas import ProductCreate


class ProductService:
    def __init__(self, repository: ProductRepository):
        self.repository = repository

    async def create_product(self, data: ProductCreate) -> ProductModel:
        existing = await self.repository.get_by_name(data.name)
        if existing:
            raise ProductAlreadyExistsError("Товар с таким именем уже есть")

        return await self.repository.create(data)

    async def get_product(self, product_id: int) -> ProductModel:
        product = await self.repository.get_by_id(product_id)
        if product is None:
            raise ProductNotFoundError("Товар не найден")

        return product

    async def list_products(self) -> list[ProductModel]:
        return await self.repository.list_all()
