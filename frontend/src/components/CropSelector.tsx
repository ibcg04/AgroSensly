import type { CropId } from '../types';

type CropSelectorProps = {
  value: CropId;
  onChange: (value: CropId) => void;
};

const CROPS: Array<{ id: CropId; label: string; hint: string }> = [
  { id: 'tomate', label: 'Tomate', hint: 'Alta demanda hídrica en fases de fructificación' },
  { id: 'lechuga', label: 'Lechuga', hint: 'Raíz superficial, requiere humedad estable' },
  { id: 'albahaca', label: 'Albahaca', hint: 'Prefiere riego regular y suelos aireados' },
  { id: 'pepino', label: 'Pepino', hint: 'Necesita humedad constante sin saturación' },
];

export function CropSelector({ value, onChange }: CropSelectorProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/90">Cultivo</span>
      <select
        className="w-full rounded-2xl border border-white/20 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        value={value}
        onChange={(event) => onChange(event.target.value as CropId)}
      >
        {CROPS.map((crop) => (
          <option key={crop.id} value={crop.id}>
            {crop.label}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs text-emerald-50/90">{CROPS.find((crop) => crop.id === value)?.hint}</p>
    </label>
  );
}
