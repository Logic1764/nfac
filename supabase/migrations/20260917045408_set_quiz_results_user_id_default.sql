-- По умолчанию результат принадлежит текущему авторизованному пользователю.
alter table public.quiz_results
  alter column user_id set default auth.uid();
