import { isSupabaseConfigured, supabase } from './supabase';

export type QuizResult = {
  score: number;
  totalQuestions: number;
  createdAt: string;
};

type QuizResultRow = {
  score: number;
  total_questions: number;
  created_at: string;
};

export async function loadQuizResults(userId: string): Promise<QuizResult[]> {
  if (!isSupabaseConfigured) throw new Error('Supabase не настроен');

  const { data, error } = await supabase
    .from('quiz_results')
    .select('score, total_questions, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return ((data ?? []) as QuizResultRow[]).map((result) => ({
    score: result.score,
    totalQuestions: result.total_questions,
    createdAt: result.created_at,
  }));
}

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
