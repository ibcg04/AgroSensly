from fastapi import APIRouter

from app.models import IrrigationRequest
from app.services.ai_agent_service import build_irrigation_recommendation

router = APIRouter()


@router.post("/ai/recommendation")
def ai_recommendation(payload: IrrigationRequest) -> dict:
    recommendation = build_irrigation_recommendation(payload)
    return {
        "status": "success",
        "data": recommendation,
    }
