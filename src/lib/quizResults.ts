import { isSupabaseConfigured, supabase } from './supabase';

export async function saveQuizResult(
  userId: string,
  score: number,
  totalQuestions: number,
): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase.from('quiz_results').insert({
    user_id: userId,
    score,
    total_questions: totalQuestions,
  });

  if (error) {
    console.error('Не удалось сохранить результат викторины:', error);
    return false;
  }

  return true;
}
