from pydantic import BaseModel, Field


class CropSelection(BaseModel):
    crop_id: str = Field(..., description="Identificador del cultivo, por ejemplo tomate o lechuga")


class SensorReading(BaseModel):
    soil_moisture: float = Field(..., ge=0, le=100, description="Humedad del suelo en porcentaje")
    soil_temperature: float = Field(..., description="Temperatura del suelo en grados Celsius")
    timestamp: str


class WeatherForecast(BaseModel):
    rainfall_probability: int = Field(..., ge=0, le=100)
    ambient_temperature: float
    sky_status: str
    source: str


class IrrigationRequest(BaseModel):
    crop_id: str
    current_moisture: float = Field(..., ge=0, le=100)
    weather: WeatherForecast


class IrrigationRecommendation(BaseModel):
    crop_id: str
    recommendation: str
    priority: str
    reasoning: str
    suggested_action: str
    next_review_in_minutes: int
