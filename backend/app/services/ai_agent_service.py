from app.models import IrrigationRequest


CROP_BASELINE = {
    "tomate": {"min_moisture": 40, "ideal": 55},
    "lechuga": {"min_moisture": 45, "ideal": 60},
    "albahaca": {"min_moisture": 38, "ideal": 52},
    "pepino": {"min_moisture": 42, "ideal": 58},
}


def build_irrigation_recommendation(payload: IrrigationRequest) -> dict:
    crop = payload.crop_id.lower()
    baseline = CROP_BASELINE.get(crop, {"min_moisture": 40, "ideal": 55})
    moisture = payload.current_moisture
    rain = payload.weather.rainfall_probability
    sky = payload.weather.sky_status.lower()
    crop_name = payload.crop_id.capitalize()

    if moisture < 30 and rain < 30:
        return {
            "crop_id": payload.crop_id,
            "recommendation": "Regar inmediatamente",
            "priority": "alta",
            "reasoning": f"La humedad actual está en {moisture}%, por debajo del umbral crítico y la probabilidad de lluvia es baja ({rain}%).",
            "suggested_action": f"Aplicar un riego corto y uniforme hasta acercarse al 55% de humedad para {crop_name}.",
            "next_review_in_minutes": 60,
        }

    if moisture < 30 and rain >= 90:
        return {
            "crop_id": payload.crop_id,
            "recommendation": "Espera a que llueva y monitorea en 2 horas",
            "priority": "media",
            "reasoning": f"La humedad es baja ({moisture}%), pero la probabilidad de lluvia es muy alta ({rain}%) y el cielo está {sky}.",
            "suggested_action": "Suspender el riego por ahora y volver a revisar sensores en 120 minutos.",
            "next_review_in_minutes": 120,
        }

    if moisture >= baseline["ideal"] and rain < 40:
        return {
            "crop_id": payload.crop_id,
            "recommendation": "No regar por ahora",
            "priority": "baja",
            "reasoning": f"La humedad está en {moisture}%, dentro o por encima del rango ideal para {crop_name}.",
            "suggested_action": "Mantener monitoreo regular y revisar la próxima lectura programada.",
            "next_review_in_minutes": 180,
        }

    return {
        "crop_id": payload.crop_id,
        "recommendation": "Monitorear y considerar riego preventivo",
        "priority": "media",
        "reasoning": f"La humedad actual ({moisture}%) es aceptable, pero puede caer por debajo del mínimo recomendado ({baseline['min_moisture']}%).",
        "suggested_action": f"Revisar nuevamente en 90 minutos y regar si baja de {baseline['min_moisture']}%.",
        "next_review_in_minutes": 90,
    }
