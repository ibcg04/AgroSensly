import { DashboardCard } from './DashboardCard';
import type { AIRecommendation } from '../types';

type AIAssistantProps = {
  recommendation: AIRecommendation | null;
};

const PRIORITY_STYLE: Record<string, string> = {
  baja: 'bg-slate-100 text-slate-700',
  media: 'bg-amber-50 text-amber-700',
  alta: 'bg-orange-50 text-orange-700',
};

export function AIAssistant({ recommendation }: AIAssistantProps) {
  return (
    <DashboardCard title="Agente de IA" subtitle="Asistente de riego calculado desde backend" icon={<span className="text-xl">◎</span>} className="lg:col-span-2">
      {recommendation ? (
        <div className="grid gap-4 lg:grid-cols-[auto,1fr]">
          <div className="flex items-start gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-400 text-xl font-bold text-white shadow-lg">
              AI
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl rounded-tl-md bg-emerald-50 p-4 text-slate-900">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${PRIORITY_STYLE[recommendation.priority] ?? 'bg-slate-100 text-slate-700'}`}>
                  Prioridad: {recommendation.priority}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                  Revisión en {recommendation.next_review_in_minutes} min
                </span>
              </div>
              <p className="text-base leading-7">{recommendation.recommendation}</p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Razones</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{recommendation.reasoning}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Acción sugerida</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{recommendation.suggested_action}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
          La recomendación aparecerá aquí después de consultar el backend.
        </div>
      )}
    </DashboardCard>
  );
}
