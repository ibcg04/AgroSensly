import { useEffect, useState } from 'react';

import { AIAssistant } from './components/AIAssistant';
import { CropSelector } from './components/CropSelector';
import { SensorCard } from './components/SensorCard';
import { WeatherCard } from './components/WeatherCard';
import { getAIRecommendation, getSensorReading, getWeatherForecast } from './lib/api';
import type { AIRecommendation, CropId, SensorReading, WeatherForecast } from './types';

const DEFAULT_CITY = 'Pereira';

export default function App() {
  const [cropId, setCropId] = useState<CropId>('tomate');
  const [sensor, setSensor] = useState<SensorReading | null>(null);
  const [weather, setWeather] = useState<WeatherForecast | null>(null);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      setLoading(true);
      setError(null);

      try {
        const [sensorData, weatherData] = await Promise.all([getSensorReading(), getWeatherForecast(DEFAULT_CITY)]);
        const aiData = await getAIRecommendation({
          crop_id: cropId,
          current_moisture: sensorData.soil_moisture,
          weather: weatherData,
        });

        if (cancelled) {
          return;
        }

        setSensor(sensorData);
        setWeather(weatherData);
        setRecommendation(aiData);
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError instanceof Error ? requestError.message : 'No fue posible cargar el dashboard.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [cropId]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.75),_rgba(230,245,234,0.9)_32%,_rgba(214,234,223,1)_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-6 overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-emerald-700 via-emerald-600 to-lime-500 p-6 text-white shadow-glow">
          <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-50 backdrop-blur">
                AgroSensly · Prototipo de agricultura de precisión
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
                Dashboard inteligente para humedad de suelo, clima y riego asistido por IA.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-50/90">
                Visualiza el estado del cultivo, cruza el sensor con el pronóstico y recibe una recomendación clara para actuar desde campo o desde móvil.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
              <CropSelector value={cropId} onChange={setCropId} />
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-sm text-emerald-50">
                <span>Estado del panel</span>
                <span className="font-semibold">{loading ? 'Sincronizando...' : 'En línea'}</span>
              </div>
            </div>
          </div>
        </section>

        {error ? <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div> : null}

        <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <SensorCard reading={sensor} />
          <WeatherCard forecast={weather} />
          <AIAssistant recommendation={recommendation} />
        </section>
      </div>
    </main>
  );
}
