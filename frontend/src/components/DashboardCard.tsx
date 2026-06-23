import type { ReactNode } from 'react';

type DashboardCardProps = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function DashboardCard({ title, subtitle, icon, children, className = '' }: DashboardCardProps) {
  return (
    <section className={`rounded-3xl border border-white/70 bg-white/90 p-5 shadow-glow backdrop-blur-xl ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
        </div>
        {icon ? <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">{icon}</div> : null}
      </div>
      {children}
    </section>
  );
}
