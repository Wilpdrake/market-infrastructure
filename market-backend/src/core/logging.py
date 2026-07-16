import logging
from src.core.config import settings


def configure_logging():
    log_level = logging.DEBUG if settings.DEBUG else logging.INFO

    logging.basicConfig(
        level=log_level,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )

    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)