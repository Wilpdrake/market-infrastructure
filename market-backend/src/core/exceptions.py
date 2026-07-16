class DomainError(Exception):
    """Базовая ошибка бизнес-логики (не привязана к HTTP)."""

    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


class ProductNotFoundError(DomainError):
    pass


class ProductAlreadyExistsError(DomainError):
    pass
