import { DashboardCard } from './DashboardCard';
import type { WeatherForecast } from '../types';

type WeatherCardProps = {
  forecast: WeatherForecast | null;
};

function weatherTone(state: string | undefined) {
  if (state === 'lluvioso') return 'bg-blue-50 text-blue-700';
  if (state === 'nublado') return 'bg-slate-100 text-slate-700';
  return 'bg-amber-50 text-amber-700';
}

export function WeatherCard({ forecast }: WeatherCardProps) {
  return (
    <DashboardCard title="Clima local" subtitle="Pronóstico mock para cruzar con el sensor" icon={<span className="text-xl">☁</span>}>
      {forecast ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-4xl font-semibold text-slate-900">{forecast.ambient_temperature.toFixed(1)}°C</p>
              <p className="mt-1 text-sm text-slate-500">Temperatura ambiental</p>
            </div>
            <span className={`rounded-full px-4 py-2 text-sm font-semibold ${weatherTone(forecast.sky_status)}`}>
              {forecast.sky_status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-slate-500">Lluvia</p>
              <p className="mt-1 font-semibold text-slate-900">{forecast.rainfall_probability}%</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-slate-500">Fuente</p>
              <p className="mt-1 font-semibold text-slate-900">{forecast.source}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
          Consultando pronóstico...
        </div>
      )}
    </DashboardCard>
  );
}
