import type { AIRecommendation, CropId, SensorReading, WeatherForecast } from '../types';
import { buildCropAnswer, getCropProfile } from '../data/crops';

const API_URL = import.meta.env.VITE_API_URL as string | undefined;

const LOCAL_SENSOR_READING: Omit<SensorReading, 'timestamp'> = {
  soil_moisture: 56,
  soil_temperature: 22.8,
};

const LOCAL_WEATHER_FORECAST: WeatherForecast = {
  city: 'Pereira',
  rainfall_probability: 24,
  ambient_temperature: 25,
  sky_status: 'parcialmente nublado',
  source: 'Estación Pereira',
};

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) {
    throw new Error('API remota no configurada');
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 3500);
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    signal: controller.signal,
    ...init,
  });
  window.clearTimeout(timeout);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getSensorReading(): Promise<SensorReading> {
  try {
    const response = await fetchJson<{ status: string; data: SensorReading }>('/sensor/readings');
    return response.data;
  } catch {
    return {
      ...LOCAL_SENSOR_READING,
      timestamp: new Date().toISOString(),
    };
  }
}

export async function getWeatherForecast(city: string): Promise<WeatherForecast> {
  try {
    const response = await fetchJson<{ status: string; data: WeatherForecast }>(
      `/weather/forecast?city=${encodeURIComponent(city)}`,
    );
    return {
      ...response.data,
      city,
    };
  } catch {
    return {
      ...LOCAL_WEATHER_FORECAST,
      city,
    };
  }
}

export async function getAIRecommendation(payload: {
  crop_id: CropId;
  current_moisture: number;
  weather: WeatherForecast;
}): Promise<AIRecommendation> {
  try {
    const response = await fetchJson<{ status: string; data: AIRecommendation }>('/ai/recommendation', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return response.data;
  } catch {
    const crop = getCropProfile(payload.crop_id);
    const isDry = payload.current_moisture < crop.moistureMin;
    const isWet = payload.current_moisture > crop.moistureMax;
    const likelyRain = payload.weather.rainfall_probability >= 70;

    if (isDry && !likelyRain) {
      return {
        crop_id: payload.crop_id,
        recommendation: 'Riego recomendado',
        priority: 'alta',
        reasoning: `La humedad está por debajo del ${crop.moistureMin}% recomendado y no se espera lluvia suficiente.`,
        suggested_action: 'Realiza un riego corto al pie de la planta y vuelve a medir en una hora.',
        next_review_in_minutes: 60,
      };
    }

    if (isWet || likelyRain) {
      return {
        crop_id: payload.crop_id,
        recommendation: 'No riegues todavía',
        priority: isWet ? 'media' : 'baja',
        reasoning: isWet
          ? `La humedad supera el ${crop.moistureMax}% recomendado para ${crop.name.toLowerCase()}.`
          : `Hay ${payload.weather.rainfall_probability}% de probabilidad de lluvia.`,
        suggested_action: 'Espera a la próxima lectura para evitar saturar la raíz.',
        next_review_in_minutes: 120,
      };
    }

    return {
      crop_id: payload.crop_id,
      recommendation: 'Tu cultivo está estable',
      priority: 'baja',
      reasoning: `La humedad está dentro del rango ideal de ${crop.moistureMin}%–${crop.moistureMax}% para ${crop.name.toLowerCase()}.`,
      suggested_action: 'Mantén el monitoreo. No necesitas regar en este momento.',
      next_review_in_minutes: 180,
    };
  }
}

export async function getCropAdvice(payload: {
  crop_id: CropId;
  question: string;
  sensor: SensorReading | null;
  weather: WeatherForecast | null;
}): Promise<string> {
  try {
    const response = await fetchJson<{
      status: string;
      data: { answer: string };
    }>('/ai/crop-advice', {
      method: 'POST',
      body: JSON.stringify({
        crop_id: payload.crop_id,
        question: payload.question,
        current_moisture: payload.sensor?.soil_moisture,
        ambient_temperature: payload.weather?.ambient_temperature,
        rainfall_probability: payload.weather?.rainfall_probability,
      }),
    });

    return response.data.answer;
  } catch {
    return buildCropAnswer(
      getCropProfile(payload.crop_id),
      payload.question,
      payload.sensor,
      payload.weather,
    );
  }
}
