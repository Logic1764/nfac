import { XP_PER_LEVEL, type XpProgress } from '../lib/xp';

type XpCardProps = {
  progress: XpProgress;
  compact?: boolean;
};

export function XpCard({ progress, compact = false }: XpCardProps) {
  const percentage = (progress.levelXp / XP_PER_LEVEL) * 100;

  return (
    <section className={`xp-card${compact ? ' xp-card--compact' : ''}`} aria-label="Прогресс уровня">
      <div className="xp-card__summary">
        <div>
          <p className="xp-card__label">Текущий уровень</p>
          <p className="xp-card__level">Уровень {progress.level}</p>
        </div>
        <div className="xp-card__total">
          <p className="xp-card__label">Всего опыта</p>
          <strong>{progress.totalXp} XP</strong>
        </div>
      </div>
      <div
        className="xp-card__track"
        role="progressbar"
        aria-label="Прогресс до следующего уровня"
        aria-valuemin={0}
        aria-valuemax={XP_PER_LEVEL}
        aria-valuenow={progress.levelXp}
      >
        <span style={{ width: `${percentage}%` }} />
      </div>
      <p className="xp-card__progress">{progress.levelXp} / {XP_PER_LEVEL} XP до следующего уровня</p>
    </section>
  );
}
