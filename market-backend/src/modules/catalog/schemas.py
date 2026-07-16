from pydantic import BaseModel, ConfigDict


class ProductCreate(BaseModel):
    name: str
    price: float


class ProductRead(BaseModel):
    id: int
    name: str
    price: float

    # Позволяет создавать схему напрямую из ORM-модели (ProductRead.model_validate(obj))
    model_config = ConfigDict(from_attributes=True)
