import { isSupabaseConfigured, supabase } from './supabase';

export async function saveQuizResult(
  score: number,
  totalQuestions: number,
): Promise<boolean> {
  if (!isSupabaseConfigured) {
    console.log('Quiz result save attempt:', { userId: null, success: false });
    return false;
  }

  const { data, error: sessionError } = await supabase.auth.getSession();
  const userId = data.session?.user?.id;

  console.log('Save session:', {
    userId: userId ?? null,
    hasSession: Boolean(data.session),
  });

  if (sessionError || !userId) {
    console.log('Quiz result save attempt:', { userId: null, success: false });
    if (sessionError) console.error('Не удалось получить сессию:', sessionError);
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
