import { isSupabaseConfigured, supabase } from './supabase';

export async function saveQuizResult(
  score: number,
  totalQuestions: number,
): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { data, error: sessionError } = await supabase.auth.getSession();
  const userId = data.session?.user.id;

  if (sessionError || !userId) {
    console.log('Сохранение результата викторины:', { userId: null, success: false });
    if (sessionError) console.error('Не удалось получить сессию:', sessionError);
    return false;
  }

  const { error } = await supabase.from('quiz_results').insert({
    user_id: userId,
    score,
    total_questions: totalQuestions,
  });

  console.log('Сохранение результата викторины:', { userId, success: !error });

  if (error) {
    console.error('Не удалось сохранить результат викторины:', error);
    return false;
  }

  return true;
}
