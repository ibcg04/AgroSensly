from unicodedata import normalize


CROP_KNOWLEDGE = {
    "tomate": {
        "name": "Tomate",
        "category": "Hortaliza de fruto",
        "moisture_range": [45, 65],
        "sunlight": "6–8 horas de sol",
        "soil_ph": "6,0–6,8",
        "temperature": "18–27 °C",
        "cycle": "90–120 días",
        "spacing": "40–60 cm",
        "watering": "Riego profundo al pie, sin mojar las hojas.",
        "tip": "Mantén una humedad estable durante floración y fruto para evitar rajaduras.",
        "risks": "Vigila hojas enrolladas, manchas oscuras y frutos con grietas.",
    },
    "lechuga": {
        "name": "Lechuga",
        "category": "Hortaliza de hoja",
        "moisture_range": [50, 70],
        "sunlight": "4–6 horas de sol",
        "soil_ph": "6,0–7,0",
        "temperature": "12–22 °C",
        "cycle": "45–70 días",
        "spacing": "25–30 cm",
        "watering": "Riego ligero y frecuente.",
        "tip": "Evita que la capa superior del suelo se seque por completo.",
        "risks": "El calor excesivo puede espigarla; controla babosas y bordes quemados.",
    },
    "albahaca": {
        "name": "Albahaca",
        "category": "Aromática",
        "moisture_range": [42, 62],
        "sunlight": "5–7 horas de sol",
        "soil_ph": "6,0–7,5",
        "temperature": "20–30 °C",
        "cycle": "60–90 días",
        "spacing": "20–30 cm",
        "watering": "Riego regular al pie.",
        "tip": "Corta las flores tempranas para estimular nuevos brotes.",
        "risks": "Evita encharcamientos y revisa el envés por pulgones o manchas.",
    },
    "pepino": {
        "name": "Pepino",
        "category": "Hortaliza de fruto",
        "moisture_range": [48, 68],
        "sunlight": "6–8 horas de sol",
        "soil_ph": "6,0–7,0",
        "temperature": "20–28 °C",
        "cycle": "55–75 días",
        "spacing": "50–70 cm",
        "watering": "Humedad constante, sin saturar.",
        "tip": "Usa tutorado para airear la planta y facilitar la cosecha.",
        "risks": "Hojas con polvo blanco pueden indicar oídio; evita mojar el follaje.",
    },
    "pimiento": {
        "name": "Pimiento",
        "category": "Hortaliza de fruto",
        "moisture_range": [44, 64],
        "sunlight": "6–8 horas de sol",
        "soil_ph": "6,0–6,8",
        "temperature": "20–29 °C",
        "cycle": "100–140 días",
        "spacing": "40–50 cm",
        "watering": "Riego moderado y uniforme.",
        "tip": "Evita cambios bruscos de humedad para reducir la caída de flores.",
        "risks": "Vigila pulgones, trips y manchas hundidas en la base del fruto.",
    },
}


def list_crop_specifications() -> list[dict]:
    return [{"id": crop_id, **profile} for crop_id, profile in CROP_KNOWLEDGE.items()]


def get_crop_specification(crop_id: str) -> dict:
    crop = crop_id.lower()
    return {"id": crop, **CROP_KNOWLEDGE.get(crop, CROP_KNOWLEDGE["tomate"])}


def _normalize_question(question: str) -> str:
    return "".join(
        character
        for character in normalize("NFD", question.lower())
        if character.isascii()
    )


def build_crop_advice(
    crop_id: str,
    question: str,
    current_moisture: float | None = None,
    ambient_temperature: float | None = None,
    rainfall_probability: int | None = None,
) -> dict:
    crop = get_crop_specification(crop_id)
    normalized_question = _normalize_question(question)
    moisture_min, moisture_max = crop["moisture_range"]

    if any(word in normalized_question for word in ["agua", "riego", "humedad"]):
        sensor_context = ""
        if current_moisture is not None:
            if current_moisture < moisture_min:
                sensor_context = (
                    f" El sensor marca {current_moisture:.0f}%, por debajo del rango recomendado."
                )
            elif current_moisture > moisture_max:
                sensor_context = (
                    f" El sensor marca {current_moisture:.0f}%, por encima del rango; espera antes de regar."
                )
            else:
                sensor_context = (
                    f" El sensor marca {current_moisture:.0f}%, dentro del rango adecuado."
                )

        answer = (
            f"Para {crop['name'].lower()}, busca entre {moisture_min}% y {moisture_max}% "
            f"de humedad. {crop['watering']}{sensor_context}"
        )
        topic = "riego"
    elif any(word in normalized_question for word in ["ph", "suelo", "tierra"]):
        answer = (
            f"{crop['name']} se desarrolla mejor con pH {crop['soil_ph']}. "
            "Usa suelo suelto, con buen drenaje y materia orgánica."
        )
        topic = "suelo"
    elif any(
        word in normalized_question
        for word in ["sol", "luz", "calor", "temperatura"]
    ):
        weather_context = ""
        if ambient_temperature is not None:
            weather_context = f" La temperatura ambiental actual es {ambient_temperature:.0f} °C."
        if rainfall_probability is not None:
            weather_context += f" La probabilidad de lluvia es {rainfall_probability}%."
        answer = (
            f"{crop['name']} necesita {crop['sunlight']} y trabaja mejor entre "
            f"{crop['temperature']}.{weather_context}"
        )
        topic = "clima"
    elif any(
        word in normalized_question
        for word in ["plaga", "enfermedad", "estres", "hoja"]
    ):
        answer = (
            f"{crop['risks']} Revisa dos veces por semana el envés de las hojas "
            "y registra cambios de color o textura."
        )
        topic = "sanidad"
    elif any(
        word in normalized_question
        for word in ["siembr", "cosech", "ciclo", "tarda"]
    ):
        answer = (
            f"El ciclo estimado de {crop['name'].lower()} es de {crop['cycle']}. "
            f"Mantén una separación de {crop['spacing']}."
        )
        topic = "ciclo"
    else:
        answer = (
            f"{crop['name']} prefiere {crop['sunlight']}, pH {crop['soil_ph']} y humedad "
            f"entre {moisture_min}% y {moisture_max}%. {crop['tip']}"
        )
        topic = "resumen"

    return {
        "crop_id": crop["id"],
        "topic": topic,
        "answer": answer,
        "engine": "agrosensly-context-v1",
    }
