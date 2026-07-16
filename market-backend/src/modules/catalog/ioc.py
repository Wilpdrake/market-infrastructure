from dishka import Provider, Scope, provide
from .repository import ProductRepository
from .service import ProductService


class CatalogProvider(Provider):
    repository = provide(ProductRepository, scope=Scope.REQUEST)
    service = provide(ProductService, scope=Scope.REQUEST)