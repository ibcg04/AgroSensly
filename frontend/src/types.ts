export type CropId = 'tomate' | 'lechuga' | 'albahaca' | 'pepino';

export type SensorReading = {
  soil_moisture: number;
  soil_temperature: number;
  timestamp: string;
};

export type WeatherForecast = {
  city: string;
  rainfall_probability: number;
  ambient_temperature: number;
  sky_status: string;
  source: string;
};

export type AIRecommendation = {
  crop_id: string;
  recommendation: string;
  priority: string;
  reasoning: string;
  suggested_action: string;
  next_review_in_minutes: number;
};
