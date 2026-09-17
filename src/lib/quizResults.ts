import { isSupabaseConfigured, supabase } from './supabase';

export async function saveQuizResult(score: number, totalQuestions: number) {
  if (!isSupabaseConfigured) return false;

  const { data, error: userError } = await supabase.auth.getUser();
  if (userError || !data.user) return false;

  const { error } = await supabase.from('quiz_results').insert({
    user_id: data.user.id,
    score,
    total_questions: totalQuestions,
  });

  return !error;
}
