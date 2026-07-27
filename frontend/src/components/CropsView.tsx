import type { CSSProperties } from 'react';

import { AgroIcon } from './AgroIcon';
import { CropGlyph } from './CropGlyph';
import { CROPS } from '../data/crops';
import type { CropId, CropProfile } from '../types';

type CropsViewProps = {
  activeCrop: CropProfile;
  onSelectCrop: (cropId: CropId) => void;
  onOpenAssistant: () => void;
};

export function CropsView({ activeCrop, onSelectCrop, onOpenAssistant }: CropsViewProps) {
  const accentStyle = { '--crop-accent': activeCrop.accent } as CSSProperties;

  return (
    <section className="view crops-view" aria-labelledby="crops-title">
      <header className="view-heading">
        <div>
          <p>Biblioteca técnica</p>
          <h1 id="crops-title">Cultivos</h1>
        </div>
        <div className="sync-meta">
          <span>Perfiles disponibles</span>
          <strong>{String(CROPS.length).padStart(2, '0')} hortalizas</strong>
        </div>
      </header>

      <div className="crop-workspace">
        <nav className="crop-index" aria-label="Seleccionar cultivo">
          <p>Selecciona una ficha</p>
          {CROPS.map((crop, index) => {
            const selected = crop.id === activeCrop.id;

            return (
              <button
                type="button"
                key={crop.id}
                className={selected ? 'is-active' : ''}
                aria-current={selected ? 'true' : undefined}
                style={{ '--crop-accent': crop.accent } as CSSProperties}
                onClick={() => onSelectCrop(crop.id)}
              >
                <span className="crop-index__number">{String(index + 1).padStart(2, '0')}</span>
                <CropGlyph cropId={crop.id} size={25} />
                <span>
                  <strong>{crop.name}</strong>
                  <small>{crop.variety}</small>
                </span>
                <AgroIcon name="arrow" size={16} />
              </button>
            );
          })}
        </nav>

        <div className="crop-document" style={accentStyle}>
          <header className="crop-document__header">
            <div>
              <span className="crop-status">
                <i />
                Monitoreado por Nodo A-01
              </span>
              <p>{activeCrop.variety}</p>
              <h2>{activeCrop.name}</h2>
            </div>
            <div className="crop-document__symbol">
              <CropGlyph cropId={activeCrop.id} size={112} />
            </div>
          </header>

          <section className="crop-spec-sheet" aria-labelledby="spec-title">
            <header>
              <div>
                <h3 id="spec-title">Parámetros de manejo</h3>
                <p>Valores orientativos para el prototipo.</p>
              </div>
              <span>Ficha / {activeCrop.id}</span>
            </header>

            <dl>
              <div>
                <dt>Humedad del suelo</dt>
                <dd>{activeCrop.moistureMin}–{activeCrop.moistureMax}%</dd>
              </div>
              <div>
                <dt>Exposición solar</dt>
                <dd>{activeCrop.sunlight}</dd>
              </div>
              <div>
                <dt>Temperatura</dt>
                <dd>{activeCrop.temperature}</dd>
              </div>
              <div>
                <dt>Acidez del suelo</dt>
                <dd>{activeCrop.soilPh}</dd>
              </div>
              <div>
                <dt>Distancia de siembra</dt>
                <dd>{activeCrop.spacing}</dd>
              </div>
              <div>
                <dt>Ciclo aproximado</dt>
                <dd>{activeCrop.cycle}</dd>
              </div>
            </dl>
          </section>

          <div className="crop-notes">
            <section>
              <span>Riego</span>
              <h3>{activeCrop.watering}</h3>
              <p>{activeCrop.tip}</p>
            </section>
            <section>
              <span>Qué observar</span>
              <h3>Señales tempranas</h3>
              <p>{activeCrop.risks}</p>
            </section>
          </div>

          <section className="crop-cycle-band">
            <header>
              <h3>Ciclo de trabajo</h3>
              <span>{activeCrop.cycle}</span>
            </header>
            <ol>
              {activeCrop.stages.map((stage, index) => (
                <li key={stage}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{stage}</strong>
                </li>
              ))}
            </ol>
          </section>

          <button type="button" className="crop-assistant-link" onClick={onOpenAssistant}>
            <span>
              <small>Consulta contextual</small>
              <strong>Pregúntale a Kinti sobre {activeCrop.name.toLowerCase()}</strong>
            </span>
            <AgroIcon name="arrow" size={21} />
          </button>
        </div>
      </div>
    </section>
  );
}
