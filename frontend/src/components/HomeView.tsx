import { AgroIcon } from './AgroIcon';
import { CropGlyph } from './CropGlyph';
import type { AIRecommendation, CropProfile, SensorReading, WeatherForecast } from '../types';

type HomeViewProps = {
  crop: CropProfile;
  sensor: SensorReading | null;
  weather: WeatherForecast | null;
  recommendation: AIRecommendation | null;
  loading: boolean;
  missionProgress: number;
  onRegisterWatering: () => void;
  onRefresh: () => void;
  onOpenAssistant: () => void;
  onOpenMissions: () => void;
};

function getMoistureStatus(crop: CropProfile, moisture: number) {
  if (moisture < crop.moistureMin) {
    return { label: 'Suelo seco', note: 'Necesita atención', className: 'is-dry' };
  }

  if (moisture > crop.moistureMax) {
    return { label: 'Exceso de humedad', note: 'Pausa el riego', className: 'is-wet' };
  }

  return { label: 'Humedad estable', note: 'Dentro del rango', className: 'is-ideal' };
}

export function HomeView({
  crop,
  sensor,
  weather,
  recommendation,
  loading,
  missionProgress,
  onRegisterWatering,
  onRefresh,
  onOpenAssistant,
  onOpenMissions,
}: HomeViewProps) {
  const moisture = sensor?.soil_moisture ?? 0;
  const status = getMoistureStatus(crop, moisture);
  const updatedAt = sensor
    ? new Intl.DateTimeFormat('es-EC', { hour: '2-digit', minute: '2-digit' }).format(
        new Date(sensor.timestamp),
      )
    : '--:--';

  return (
    <section className="view home-view" aria-labelledby="home-title">
      <header className="view-heading">
        <div>
          <p>Huerto 01 / Pereira</p>
          <h1 id="home-title">Lectura de campo</h1>
        </div>
        <div className="sync-meta">
          <span>Última sincronización</span>
          <strong>{updatedAt} · UTC−5</strong>
        </div>
      </header>

      <div className="dashboard-grid">
        <article className={`moisture-instrument ${status.className}`}>
          <header className="instrument-header">
            <div>
              <span className="instrument-title">
                <AgroIcon name="sensor" size={22} />
                Humedad de suelo
              </span>
              <small>Sensor capacitivo · Nodo A-01</small>
            </div>
            <span className="live-state">
              <i />
              En vivo
            </span>
          </header>

          {loading || !sensor ? (
            <div className="instrument-loading" aria-label="Cargando lectura del sensor">
              <span />
              <span />
            </div>
          ) : (
            <>
              <div className="instrument-reading">
                <div>
                  <h2>{status.label}</h2>
                  <p>{status.note} para {crop.name.toLowerCase()}.</p>
                </div>
                <div className="reading-value">
                  {moisture.toFixed(0)}
                  <span>%</span>
                </div>
              </div>

              <div className="moisture-ruler" aria-label={`Humedad actual: ${moisture.toFixed(0)} por ciento`}>
                <div className="ruler-track">
                  <span className="range-dry" />
                  <span className="range-ideal" />
                  <span className="range-wet" />
                  <i style={{ left: `${Math.min(98, Math.max(2, moisture))}%` }} />
                </div>
                <div className="ruler-labels">
                  <span>0</span>
                  <span>{crop.moistureMin} / mínimo</span>
                  <span>{crop.moistureMax} / máximo</span>
                  <span>100</span>
                </div>
              </div>
            </>
          )}

          <footer className="instrument-footer">
            <div>
              <span>Cultivo activo</span>
              <strong>
                <CropGlyph cropId={crop.id} accent={crop.accent} size={18} />
                {crop.name}
              </strong>
            </div>
            <div>
              <span>Temperatura suelo</span>
              <strong>{sensor ? `${sensor.soil_temperature.toFixed(1)} °C` : '—'}</strong>
            </div>
            <button type="button" onClick={onRefresh} disabled={loading}>
              <AgroIcon name="refresh" size={17} className={loading ? 'is-spinning' : ''} />
              Actualizar
            </button>
          </footer>
        </article>

        <aside className="recommendation-panel">
          <div className="recommendation-panel__top">
            <span>Decisión sugerida</span>
            <strong>Prioridad {recommendation?.priority ?? '—'}</strong>
          </div>
          <h2>{recommendation?.recommendation ?? 'Analizando la parcela'}</h2>
          <p>{recommendation?.reasoning ?? 'Estamos cruzando humedad, clima y cultivo.'}</p>
          <div className="recommendation-action">
            <span>Qué hacer ahora</span>
            <strong>{recommendation?.suggested_action ?? 'Espera unos segundos.'}</strong>
          </div>
          <button type="button" className="action-button action-button--light" onClick={onRegisterWatering} disabled={!sensor}>
            {recommendation?.priority === 'alta' ? 'Registrar riego' : 'Registrar revisión'}
            <AgroIcon name="arrow" size={18} />
          </button>
        </aside>
      </div>

      <section className="field-conditions" aria-labelledby="conditions-title">
        <header>
          <div>
            <h2 id="conditions-title">Condiciones cruzadas</h2>
            <p>Datos que Kinti usa para ajustar la recomendación.</p>
          </div>
          <span>{weather?.source ?? 'Conectando'}</span>
        </header>
        <dl>
          <div>
            <dt>
              <AgroIcon name="temperature" size={22} />
              Ambiente
            </dt>
            <dd>{weather ? `${weather.ambient_temperature.toFixed(0)} °C` : '—'}</dd>
            <small>{weather?.sky_status ?? 'Sin datos'}</small>
          </div>
          <div>
            <dt>
              <AgroIcon name="rain" size={22} />
              Lluvia
            </dt>
            <dd>{weather ? `${weather.rainfall_probability}%` : '—'}</dd>
            <small>probabilidad hoy</small>
          </div>
          <div>
            <dt>
              <AgroIcon name="water" size={22} />
              Rango objetivo
            </dt>
            <dd>{crop.moistureMin}–{crop.moistureMax}%</dd>
            <small>{crop.watering}</small>
          </div>
        </dl>
      </section>

      <div className="home-lower-grid">
        <button type="button" className="kinti-insight" onClick={onOpenAssistant}>
          <img src="/assets/kinti-editorial.webp" alt="" />
          <span>
            <small>Kinti / nota de campo</small>
            <strong>{crop.tip}</strong>
            <em>
              Abrir conversación <AgroIcon name="arrow" size={17} />
            </em>
          </span>
        </button>

        <button type="button" className="mission-line" onClick={onOpenMissions}>
          <span className="mission-line__number">{missionProgress}/5</span>
          <span className="mission-line__copy">
            <small>Misión semanal</small>
            <strong>Cinco cuidados sin desperdiciar agua</strong>
            <span className="mission-progress">
              <i style={{ width: `${Math.min(100, (missionProgress / 5) * 100)}%` }} />
            </span>
          </span>
          <AgroIcon name="arrow" size={19} />
        </button>
      </div>
    </section>
  );
}
