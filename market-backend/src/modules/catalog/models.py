from sqlalchemy.orm import Mapped, mapped_column
from src.infrastructure.database import Base


class ProductModel(Base):
    __tablename__ = "product"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True, index=True)
    price: Mapped[float]