from fastapi import APIRouter, Query

from app.services.weather_service import get_weather_forecast

router = APIRouter()


@router.get("/weather/forecast")
async def weather_forecast(city: str = Query(default="campo", description="Ciudad o zona de referencia")) -> dict:
    forecast = await get_weather_forecast(city)
    return {
        "status": "success",
        "data": {
            "city": city,
            **forecast,
        },
    }
