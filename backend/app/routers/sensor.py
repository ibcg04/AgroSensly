from fastapi import APIRouter

from app.services.sensor_service import generate_sensor_reading

router = APIRouter()


@router.get("/sensor/readings")
def get_sensor_readings() -> dict:
    return {
        "status": "success",
        "data": generate_sensor_reading(),
    }
