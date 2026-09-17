import type { QuizResult } from '../lib/quizResults';

type ProfileStatsProps = {
  results: QuizResult[];
};

function formatResult(result: QuizResult) {
  return `${result.score} из ${result.totalQuestions}`;
}

export function ProfileStats({ results }: ProfileStatsProps) {
  if (results.length === 0) {
    return <p className="profile-empty">Вы еще не проходили тесты</p>;
  }

  const latest = results[0];
  const best = results.reduce((currentBest, result) =>
    result.score / result.totalQuestions > currentBest.score / currentBest.totalQuestions
      ? result
      : currentBest,
  );

  const lastCompletedAt = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(latest.createdAt));

  return (
    <dl className="profile-stats">
      <div><dt>Пройдено тестов</dt><dd>{results.length}</dd></div>
      <div><dt>Лучший результат</dt><dd>{formatResult(best)}</dd></div>
      <div><dt>Последний результат</dt><dd>{formatResult(latest)}</dd></div>
      <div><dt>Последнее прохождение</dt><dd>{lastCompletedAt}</dd></div>
    </dl>
  );
}
