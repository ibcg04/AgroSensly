from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.ai import router as ai_router
from app.routers.sensor import router as sensor_router
from app.routers.weather import router as weather_router

app = FastAPI(
    title="AgroSensly API",
    version="1.0.0",
    description="API de prototipo para monitoreo agrícola, clima y recomendaciones inteligentes de riego.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sensor_router, prefix="/api", tags=["Sensor"])
app.include_router(weather_router, prefix="/api", tags=["Clima"])
app.include_router(ai_router, prefix="/api", tags=["Agente IA"])


@app.get("/")
def health_check() -> dict:
    return {"message": "AgroSensly API funcionando correctamente"}
