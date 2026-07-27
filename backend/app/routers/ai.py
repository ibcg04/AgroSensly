from fastapi import APIRouter

from app.models import CropAdviceRequest, IrrigationRequest
from app.services.ai_agent_service import build_irrigation_recommendation
from app.services.crop_knowledge_service import (
    build_crop_advice,
    get_crop_specification,
    list_crop_specifications,
)

router = APIRouter()


@router.post("/ai/recommendation")
def ai_recommendation(payload: IrrigationRequest) -> dict:
    recommendation = build_irrigation_recommendation(payload)
    return {
        "status": "success",
        "data": recommendation,
    }


@router.get("/ai/crops")
def crop_specifications() -> dict:
    return {
        "status": "success",
        "data": list_crop_specifications(),
    }


@router.get("/ai/crops/{crop_id}")
def crop_specification(crop_id: str) -> dict:
    return {
        "status": "success",
        "data": get_crop_specification(crop_id),
    }


@router.post("/ai/crop-advice")
def crop_advice(payload: CropAdviceRequest) -> dict:
    return {
        "status": "success",
        "data": build_crop_advice(
            crop_id=payload.crop_id,
            question=payload.question,
            current_moisture=payload.current_moisture,
            ambient_temperature=payload.ambient_temperature,
            rainfall_probability=payload.rainfall_probability,
        ),
    }
