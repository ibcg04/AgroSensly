import { AgroIcon } from './AgroIcon';
import type { AgroIconName } from './AgroIcon';
import type { AppView } from '../types';

type BottomNavigationProps = {
  activeView: AppView;
  onChange: (view: AppView) => void;
};

const ITEMS: Array<{ id: AppView; label: string; icon: AgroIconName }> = [
  { id: 'home', label: 'Lectura', icon: 'home' },
  { id: 'crops', label: 'Cultivos', icon: 'crops' },
  { id: 'missions', label: 'Progreso', icon: 'missions' },
  { id: 'assistant', label: 'Kinti', icon: 'kinti' },
];

export function BottomNavigation({ activeView, onChange }: BottomNavigationProps) {
  return (
    <nav className="bottom-nav" aria-label="Navegación móvil">
      {ITEMS.map((item) => {
        const isActive = activeView === item.id;

        return (
          <button
            type="button"
            key={item.id}
            className={isActive ? 'is-active' : ''}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onChange(item.id)}
          >
            <AgroIcon name={item.icon} size={22} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
