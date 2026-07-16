from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import ProductModel
from .schemas import ProductCreate


class ProductRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, data: ProductCreate) -> ProductModel:
        product = ProductModel(**data.model_dump())
        self.session.add(product)
        await self.session.commit()
        await self.session.refresh(product)
        return product

    async def get_by_id(self, product_id: int) -> ProductModel | None:
        return await self.session.get(ProductModel, product_id)

    async def get_by_name(self, name: str) -> ProductModel | None:
        stmt = select(ProductModel).where(ProductModel.name == name)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def list_all(self) -> list[ProductModel]:
        stmt = select(ProductModel).order_by(ProductModel.id)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())
