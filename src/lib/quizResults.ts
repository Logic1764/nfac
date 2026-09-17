import { isSupabaseConfigured, supabase } from './supabase';

export async function saveQuizResult(score: number, totalQuestions: number): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { data, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error('Не удалось проверить пользователя перед сохранением результата:', userError);
    return false;
  }

  if (!data.user) return false;

  const { error } = await supabase.from('quiz_results').insert({
    user_id: data.user.id,
    score,
    total_questions: totalQuestions,
  });

  if (error) {
    console.error('Не удалось сохранить результат викторины:', error);
    return false;
  }

  return true;
}
