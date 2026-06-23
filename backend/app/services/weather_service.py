from os import getenv
from random import choice, randint, uniform

import httpx


async def _fetch_openweather_mock() -> dict:
    return {
        "rainfall_probability": randint(0, 100),
        "ambient_temperature": round(uniform(18.0, 34.0), 1),
        "sky_status": choice(["despejado", "lluvioso", "nublado"]),
        "source": "mock",
    }


async def get_weather_forecast(city: str = "campo") -> dict:
    api_key = getenv("OPENWEATHER_API_KEY")
    if not api_key:
        return await _fetch_openweather_mock()

    base_url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city,
        "appid": api_key,
        "units": "metric",
        "lang": "es",
    }

    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(base_url, params=params)
        response.raise_for_status()
        payload = response.json()

    weather_main = payload.get("weather", [{}])[0]
    rain_probability = 70 if weather_main.get("main", "").lower() == "rain" else 15

    return {
        "rainfall_probability": rain_probability,
        "ambient_temperature": float(payload.get("main", {}).get("temp", 0.0)),
        "sky_status": weather_main.get("description", "nublado"),
        "source": "openweather",
    }
