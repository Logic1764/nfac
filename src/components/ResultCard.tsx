import { Link } from 'wouter';

type ResultCardProps = {
  score: number;
  total: number;
  onRestart: () => void;
  needsSignIn: boolean;
  firstResultSaved?: boolean;
};

export function ResultCard({
  score,
  total,
  onRestart,
  needsSignIn,
  firstResultSaved = false,
}: ResultCardProps) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="quiz-card result-card">
      <span className="result-card__planet" aria-hidden="true">✦</span>
      <p className="eyebrow">Тест завершён</p>
      <h2>Твой результат</h2>
      <p className="result-score" aria-label={`Результат: ${score} из ${total}`}>
        {score} <span>из {total}</span>
      </p>
      <p className="result-percentage">{percentage}% правильных ответов</p>
      {firstResultSaved && (
        <p className="result-card__success" role="status">Готово! Первый результат сохранен.</p>
      )}
      <p className="result-message">Отличный полёт! Теперь ты знаешь о космосе ещё больше.</p>
      {needsSignIn && (
        <p className="result-message">
          Чтобы сохранить результат, <Link href="/login">войди в аккаунт</Link>.
        </p>
      )}
      <button className="primary-button restart-button" onClick={onRestart} type="button">
        Пройти ещё раз
      </button>
    </div>
  );
}
