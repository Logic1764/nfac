import type { QuizResult } from './quizResults';

export const XP_PER_CORRECT_ANSWER = 10;
export const XP_PER_LEVEL = 100;

export type XpProgress = {
  level: number;
  totalXp: number;
  levelXp: number;
};

export function calculateXpProgress(results: QuizResult[]): XpProgress {
  const totalXp = results.reduce(
    (sum, result) => sum + result.score * XP_PER_CORRECT_ANSWER,
    0,
  );

  return {
    level: Math.floor(totalXp / XP_PER_LEVEL) + 1,
    totalXp,
    levelXp: totalXp % XP_PER_LEVEL,
  };
}
