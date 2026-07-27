import { AgroIcon } from './AgroIcon';

type MissionsViewProps = {
  points: number;
  missionProgress: number;
  streak: number;
};

const GOAL_POINTS = 800;

const missions = [
  {
    title: 'Agua con intención',
    description: 'Registra cinco cuidados sin realizar un riego innecesario.',
    reward: '+80',
    progress: 0,
    icon: 'water' as const,
  },
  {
    title: 'Ojo al suelo',
    description: 'Consulta el sensor tres mañanas consecutivas.',
    reward: '+50',
    progress: 2 / 3,
    icon: 'scan' as const,
  },
  {
    title: 'Explorador hortícola',
    description: 'Revisa la ficha técnica de tres cultivos.',
    reward: '+40',
    progress: 1,
    icon: 'book' as const,
  },
];

export function MissionsView({ points, missionProgress, streak }: MissionsViewProps) {
  const levelProgress = Math.min(100, (points / GOAL_POINTS) * 100);
  const missionRows = missions.map((mission, index) =>
    index === 0 ? { ...mission, progress: Math.min(1, missionProgress / 5) } : mission,
  );

  return (
    <section className="view missions-view" aria-labelledby="missions-title">
      <header className="view-heading">
        <div>
          <p>Registro de aprendizaje</p>
          <h1 id="missions-title">Progreso</h1>
        </div>
        <div className="sync-meta">
          <span>Ciclo actual</span>
          <strong>Semana 03 / 08</strong>
        </div>
      </header>

      <div className="progress-board">
        <section className="rank-block">
          <span className="rank-block__number">04</span>
          <div className="rank-block__copy">
            <small>Rango actual</small>
            <h2>Guardián del agua</h2>
            <p>Reconoce el momento correcto para regar y evita decisiones por intuición.</p>
          </div>
          <div className="rank-progress">
            <div>
              <span>{points} semillas</span>
              <span>{GOAL_POINTS}</span>
            </div>
            <span>
              <i style={{ width: `${levelProgress}%` }} />
            </span>
            <small>{Math.max(0, GOAL_POINTS - points)} para desbloquear Protector del huerto.</small>
          </div>
        </section>

        <section className="progress-ledger" aria-label="Resumen de progreso">
          <header>
            <h2>Balance</h2>
            <span>Últimos 30 días</span>
          </header>
          <dl>
            <div>
              <dt>Racha activa</dt>
              <dd>{String(streak).padStart(2, '0')} días</dd>
            </div>
            <div>
              <dt>Agua no utilizada</dt>
              <dd>148 litros</dd>
            </div>
            <div>
              <dt>Decisiones correctas</dt>
              <dd>12 / 15</dd>
            </div>
            <div>
              <dt>Fichas consultadas</dt>
              <dd>03 cultivos</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="mission-queue" aria-labelledby="mission-queue-title">
        <header>
          <div>
            <h2 id="mission-queue-title">Misiones activas</h2>
            <p>Las recompensas están ligadas a acciones verificables.</p>
          </div>
          <span>Reinicia en 4 días</span>
        </header>

        <div className="mission-table">
          {missionRows.map((mission, index) => {
            const percentage = Math.round(mission.progress * 100);
            const isComplete = percentage === 100;

            return (
              <article key={mission.title} className={isComplete ? 'is-complete' : ''}>
                <span className="mission-table__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="mission-table__icon">
                  <AgroIcon name={mission.icon} size={25} />
                </span>
                <div className="mission-table__copy">
                  <h3>{mission.title}</h3>
                  <p>{mission.description}</p>
                </div>
                <div className="mission-table__progress">
                  <span>
                    <i style={{ width: `${percentage}%` }} />
                  </span>
                  <small>{isComplete ? 'Completada' : `${percentage}%`}</small>
                </div>
                <strong>{mission.reward}</strong>
              </article>
            );
          })}
        </div>
      </section>

      <section className="achievement-strip" aria-labelledby="achievement-title">
        <header>
          <h2 id="achievement-title">Insignias</h2>
          <p>Marcas acumuladas en el trabajo de campo.</p>
        </header>
        <div>
          <article className="achievement-stamp">
            <AgroIcon name="water" size={29} />
            <span>
              <strong>Primera gota</strong>
              <small>Riego registrado con sensor</small>
            </span>
          </article>
          <article className="achievement-stamp">
            <AgroIcon name="level" size={29} />
            <span>
              <strong>Buen criterio</strong>
              <small>Cinco decisiones correctas</small>
            </span>
          </article>
          <article className="achievement-stamp is-locked">
            <AgroIcon name="lock" size={26} />
            <span>
              <strong>Racha de 14</strong>
              <small>Faltan ocho días</small>
            </span>
          </article>
        </div>
      </section>
    </section>
  );
}
