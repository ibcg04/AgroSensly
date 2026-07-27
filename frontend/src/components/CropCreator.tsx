import { FormEvent, useState, type CSSProperties } from 'react';

import { AgroIcon } from './AgroIcon';
import { CropGlyph } from './CropGlyph';
import type { NewCropProfile } from '../types';

type CropCreatorProps = {
  onCancel: () => void;
  onSave: (crop: NewCropProfile) => void;
};

type CropFormState = {
  name: string;
  variety: string;
  accent: string;
  moistureMin: string;
  moistureMax: string;
  sunlight: string;
  soilPh: string;
  temperature: string;
  cycle: string;
  spacing: string;
  watering: string;
  tip: string;
  risks: string;
  stages: string;
};

const ACCENT_OPTIONS = ['#b7e84b', '#54c995', '#7dd3fc', '#e0a15a', '#f0795b'];

const INITIAL_FORM: CropFormState = {
  name: '',
  variety: 'Hortaliza',
  accent: ACCENT_OPTIONS[0],
  moistureMin: '45',
  moistureMax: '65',
  sunlight: '6–8 h de sol',
  soilPh: 'pH 6,0–7,0',
  temperature: '18–28 °C',
  cycle: '60–90 días',
  spacing: '30–50 cm',
  watering: 'Riego moderado al pie',
  tip: 'Mantén una humedad uniforme y revisa el cultivo antes de cada riego.',
  risks: 'Observa cambios de color, textura o crecimiento en hojas y tallos.',
  stages: 'Siembra, Crecimiento, Floración, Cosecha',
};

export function CropCreator({ onCancel, onSave }: CropCreatorProps) {
  const [form, setForm] = useState<CropFormState>(INITIAL_FORM);
  const [error, setError] = useState('');

  function updateField<Field extends keyof CropFormState>(
    field: Field,
    value: CropFormState[Field],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const moistureMin = Number(form.moistureMin);
    const moistureMax = Number(form.moistureMax);
    const stages = form.stages
      .split(',')
      .map((stage) => stage.trim())
      .filter(Boolean)
      .slice(0, 6);

    if (form.name.trim().length < 2) {
      setError('Escribe el nombre de la hortaliza.');
      return;
    }

    if (
      !Number.isFinite(moistureMin) ||
      !Number.isFinite(moistureMax) ||
      moistureMin < 0 ||
      moistureMax > 100 ||
      moistureMin >= moistureMax
    ) {
      setError('El rango de humedad debe ir de 0 a 100 y el mínimo debe ser menor que el máximo.');
      return;
    }

    if (stages.length < 2) {
      setError('Añade al menos dos etapas separadas por comas.');
      return;
    }

    onSave({
      name: form.name.trim(),
      variety: form.variety.trim() || 'Hortaliza',
      accent: form.accent,
      moistureMin,
      moistureMax,
      sunlight: form.sunlight.trim(),
      soilPh: form.soilPh.trim(),
      temperature: form.temperature.trim(),
      cycle: form.cycle.trim(),
      spacing: form.spacing.trim(),
      watering: form.watering.trim(),
      tip: form.tip.trim(),
      risks: form.risks.trim(),
      stages,
    });
  }

  return (
    <form className="crop-creator" onSubmit={handleSubmit}>
      <header className="crop-creator__header">
        <div>
          <span>Nuevo perfil de cultivo</span>
          <h2>Añade tu hortaliza</h2>
          <p>Define sus parámetros para que el sensor y Kinti trabajen con su propio contexto.</p>
        </div>
        <div className="crop-creator__glyph" style={{ '--crop-accent': form.accent } as CSSProperties}>
          <CropGlyph cropId="custom-preview" accent={form.accent} size={76} />
        </div>
      </header>

      <section className="crop-form-section" aria-labelledby="crop-identity-title">
        <header>
          <span>01</span>
          <div>
            <h3 id="crop-identity-title">Identidad</h3>
            <p>Así aparecerá en la biblioteca y en el selector de Kinti.</p>
          </div>
        </header>

        <div className="crop-form-grid">
          <label className="form-field">
            <span>Nombre de la hortaliza</span>
            <input
              name="cropName"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="Ej. Zanahoria"
              maxLength={40}
              autoFocus
              required
              aria-invalid={error.includes('nombre') || undefined}
            />
          </label>
          <label className="form-field">
            <span>Tipo o variedad</span>
            <input
              name="cropVariety"
              value={form.variety}
              onChange={(event) => updateField('variety', event.target.value)}
              placeholder="Ej. Hortaliza de raíz"
              maxLength={50}
            />
          </label>
          <fieldset className="crop-color-field">
            <legend>Color de identificación</legend>
            <div>
              {ACCENT_OPTIONS.map((accent) => (
                <button
                  type="button"
                  key={accent}
                  aria-label={`Usar color ${accent}`}
                  aria-pressed={form.accent === accent}
                  style={{ '--swatch': accent } as CSSProperties}
                  onClick={() => updateField('accent', accent)}
                >
                  <i />
                  {form.accent === accent ? <AgroIcon name="check" size={16} /> : null}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </section>

      <section className="crop-form-section" aria-labelledby="crop-parameters-title">
        <header>
          <span>02</span>
          <div>
            <h3 id="crop-parameters-title">Parámetros de campo</h3>
            <p>Estos datos ajustan la lectura y la recomendación de riego.</p>
          </div>
        </header>

        <div className="crop-form-grid crop-form-grid--three">
          <label className="form-field">
            <span>Humedad mínima</span>
            <div className="field-with-unit">
              <input
                name="moistureMin"
                type="number"
                min="0"
                max="100"
                inputMode="numeric"
                value={form.moistureMin}
                onChange={(event) => updateField('moistureMin', event.target.value)}
              />
              <small>%</small>
            </div>
          </label>
          <label className="form-field">
            <span>Humedad máxima</span>
            <div className="field-with-unit">
              <input
                name="moistureMax"
                type="number"
                min="0"
                max="100"
                inputMode="numeric"
                value={form.moistureMax}
                onChange={(event) => updateField('moistureMax', event.target.value)}
              />
              <small>%</small>
            </div>
          </label>
          <label className="form-field">
            <span>Exposición solar</span>
            <input
              name="sunlight"
              value={form.sunlight}
              onChange={(event) => updateField('sunlight', event.target.value)}
              maxLength={40}
            />
          </label>
          <label className="form-field">
            <span>Temperatura ideal</span>
            <input
              name="temperature"
              value={form.temperature}
              onChange={(event) => updateField('temperature', event.target.value)}
              maxLength={40}
            />
          </label>
          <label className="form-field">
            <span>Acidez del suelo</span>
            <input
              name="soilPh"
              value={form.soilPh}
              onChange={(event) => updateField('soilPh', event.target.value)}
              maxLength={40}
            />
          </label>
          <label className="form-field">
            <span>Distancia de siembra</span>
            <input
              name="spacing"
              value={form.spacing}
              onChange={(event) => updateField('spacing', event.target.value)}
              maxLength={40}
            />
          </label>
        </div>
      </section>

      <section className="crop-form-section" aria-labelledby="crop-care-title">
        <header>
          <span>03</span>
          <div>
            <h3 id="crop-care-title">Manejo y ciclo</h3>
            <p>La ficha y las respuestas de Kinti usarán esta información.</p>
          </div>
        </header>

        <div className="crop-form-grid">
          <label className="form-field">
            <span>Ciclo aproximado</span>
            <input
              name="cycle"
              value={form.cycle}
              onChange={(event) => updateField('cycle', event.target.value)}
              maxLength={40}
            />
          </label>
          <label className="form-field">
            <span>Forma de riego</span>
            <input
              name="watering"
              value={form.watering}
              onChange={(event) => updateField('watering', event.target.value)}
              maxLength={80}
            />
          </label>
          <label className="form-field form-field--wide">
            <span>Etapas del cultivo</span>
            <input
              name="stages"
              value={form.stages}
              onChange={(event) => updateField('stages', event.target.value)}
              aria-describedby="stages-help"
              maxLength={140}
            />
            <small id="stages-help">Sepáralas con comas.</small>
          </label>
          <label className="form-field">
            <span>Consejo de manejo</span>
            <textarea
              name="tip"
              rows={3}
              value={form.tip}
              onChange={(event) => updateField('tip', event.target.value)}
              maxLength={220}
            />
          </label>
          <label className="form-field">
            <span>Señales a vigilar</span>
            <textarea
              name="risks"
              rows={3}
              value={form.risks}
              onChange={(event) => updateField('risks', event.target.value)}
              maxLength={220}
            />
          </label>
        </div>
      </section>

      <footer className="crop-creator__footer">
        <div>
          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : (
            <p>La ficha quedará disponible en Cultivos, Lectura y Kinti.</p>
          )}
        </div>
        <button type="button" className="crop-form-cancel" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="crop-form-submit">
          Guardar hortaliza
          <AgroIcon name="arrow" size={18} />
        </button>
      </footer>
    </form>
  );
}
