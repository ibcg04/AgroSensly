import { AgroIcon } from './AgroIcon';
import type { AppView } from '../types';

type AppHeaderProps = {
  streak: number;
  activeView: AppView;
  onChange: (view: AppView) => void;
};

const NAV_ITEMS: Array<{ id: AppView; label: string }> = [
  { id: 'home', label: 'Lectura' },
  { id: 'crops', label: 'Cultivos' },
  { id: 'missions', label: 'Progreso' },
  { id: 'assistant', label: 'Kinti IA' },
];

export function AppHeader({ streak, activeView, onChange }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <button type="button" className="brand" onClick={() => onChange('home')} aria-label="Ir a inicio">
          <span className="brand__mark">
            <AgroIcon name="brand" size={24} />
          </span>
          <span className="brand__word">AgroSensly</span>
          <span className="brand__country">EC</span>
        </button>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => (
            <button
              type="button"
              key={item.id}
              className={activeView === item.id ? 'is-active' : ''}
              aria-current={activeView === item.id ? 'page' : undefined}
              onClick={() => onChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-status">
          <span className="node-status">
            <i />
            Nodo A-01
          </span>
          <span className="streak-count">
            Racha <strong>{String(streak).padStart(2, '0')}</strong>
          </span>
        </div>
      </div>
    </header>
  );
}
