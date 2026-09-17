import { isSupabaseConfigured, supabase } from './supabase';

export async function saveQuizResult(
  userId: string | null,
  score: number,
  totalQuestions: number,
): Promise<boolean> {
  if (!isSupabaseConfigured || !userId) {
    console.log('Quiz result save attempt:', { userId: null, success: false });
    return false;
  }

  const { error } = await supabase.from('quiz_results').insert({
    user_id: userId,
    score,
    total_questions: totalQuestions,
  });

  console.log('Quiz result save attempt:', { userId, success: !error });

  if (error) {
    console.error('Не удалось сохранить результат викторины:', error);
    return false;
  }

  return true;
}
