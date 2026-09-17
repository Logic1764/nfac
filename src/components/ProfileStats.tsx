import type { QuizResult } from '../lib/quizResults';
import { calculateXpProgress } from '../lib/xp';
import { XpCard } from './XpCard';

type ProfileStatsProps = {
  results: QuizResult[];
};

function formatResult(result: QuizResult) {
  return `${result.score} из ${result.totalQuestions}`;
}

export function ProfileStats({ results }: ProfileStatsProps) {
  const xpProgress = calculateXpProgress(results);

  if (results.length === 0) {
    return (
      <>
        <XpCard progress={xpProgress} />
        <div className="profile-empty">
          <p>Вы еще не проходили викторины. Создайте первую тему и проверьте себя.</p>
          <p>Статистика появится после первого завершенного теста.</p>
        </div>
      </>
    );
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
    <>
      <XpCard progress={xpProgress} />
      <dl className="profile-stats">
        <div><dt>Пройдено тестов</dt><dd>{results.length}</dd></div>
        <div><dt>Лучший результат</dt><dd>{formatResult(best)}</dd></div>
        <div><dt>Последний результат</dt><dd>{formatResult(latest)}</dd></div>
        <div><dt>Последнее прохождение</dt><dd>{lastCompletedAt}</dd></div>
      </dl>
    </>
  );
}
