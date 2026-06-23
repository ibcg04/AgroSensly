import { DashboardCard } from './DashboardCard';
import type { SensorReading } from '../types';

type SensorCardProps = {
  reading: SensorReading | null;
};

function getBarColor(moisture: number) {
  if (moisture < 30) return 'bg-red-500';
  if (moisture > 70) return 'bg-sky-500';
  return 'bg-emerald-500';
}

function getRingLabel(moisture: number) {
  if (moisture < 30) return 'Seco';
  if (moisture > 70) return 'Saturado';
  return 'Óptimo';
}

export function SensorCard({ reading }: SensorCardProps) {
  const moisture = reading?.soil_moisture ?? 0;
  const percent = Math.max(0, Math.min(100, moisture));

  return (
    <DashboardCard title="Sensor de suelo" subtitle="Lectura simulada en tiempo real" icon={<span className="text-xl">%</span>}>
      {reading ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-4xl font-semibold text-slate-900">{reading.soil_moisture.toFixed(1)}%</p>
              <p className="mt-1 text-sm text-slate-500">Humedad del suelo</p>
            </div>
            <div className={`rounded-full px-4 py-2 text-sm font-semibold ${percent < 30 ? 'bg-red-50 text-red-700' : percent > 70 ? 'bg-sky-50 text-sky-700' : 'bg-emerald-50 text-emerald-700'}`}>
              {getRingLabel(percent)}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
              <span>0%</span>
              <span>100%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div className={`h-full rounded-full transition-all ${getBarColor(percent)}`} style={{ width: `${percent}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-slate-500">Temp. suelo</p>
              <p className="mt-1 font-semibold text-slate-900">{reading.soil_temperature.toFixed(1)} °C</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-slate-500">Actualizado</p>
              <p className="mt-1 font-semibold text-slate-900">{new Date(reading.timestamp).toLocaleTimeString('es-CO')}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
          Esperando lectura del sensor...
        </div>
      )}
    </DashboardCard>
  );
}
