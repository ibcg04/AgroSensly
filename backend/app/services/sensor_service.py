from datetime import datetime, timezone
from random import uniform


def generate_sensor_reading() -> dict:
    moisture = round(uniform(18.0, 82.0), 1)
    soil_temperature = round(uniform(14.0, 32.0), 1)

    return {
        "soil_moisture": moisture,
        "soil_temperature": soil_temperature,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
