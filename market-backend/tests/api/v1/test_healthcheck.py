import pytest

@pytest.mark.asyncio
async def test_healthcheck(ac):
    response = await ac.get("/api/v1/healthcheck")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"