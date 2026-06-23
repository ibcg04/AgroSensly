import type { AIRecommendation, CropId, SensorReading, WeatherForecast } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getSensorReading(): Promise<SensorReading> {
  const response = await fetchJson<{ status: string; data: SensorReading }>('/sensor/readings');
  return response.data;
}

export async function getWeatherForecast(city: string): Promise<WeatherForecast> {
  const response = await fetchJson<{ status: string; data: WeatherForecast }>(`/weather/forecast?city=${encodeURIComponent(city)}`);
  return response.data;
}

export async function getAIRecommendation(payload: {
  crop_id: CropId;
  current_moisture: number;
  weather: WeatherForecast;
}): Promise<AIRecommendation> {
  const response = await fetchJson<{ status: string; data: AIRecommendation }>('/ai/recommendation', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
}
