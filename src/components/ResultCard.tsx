type ResultCardProps = {
  score: number;
  total: number;
  onRestart: () => void;
};

export function ResultCard({ score, total, onRestart }: ResultCardProps) {
  return (
    <div className="quiz-card result-card">
      <span className="result-card__planet" aria-hidden="true">🪐</span>
      <p className="eyebrow">Тест завершён</p>
      <h2>Твой результат</h2>
      <p className="result-score" aria-label={`Результат: ${score} из ${total}`}>
        {score} из {total}
      </p>
      <p className="result-message">Отличный полёт! Теперь ты знаешь о космосе ещё больше.</p>
      <button className="restart-button" onClick={onRestart} type="button">
        Пройти ещё раз
      </button>
    </div>
  );
}
