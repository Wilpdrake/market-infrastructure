import pytest


@pytest.mark.asyncio
async def test_list_products(ac):
    response = await ac.get("/api/v1/catalog/products")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.asyncio
async def test_get_missing_product_returns_404(ac):
    response = await ac.get("/api/v1/catalog/products/99999999")
    assert response.status_code == 404
