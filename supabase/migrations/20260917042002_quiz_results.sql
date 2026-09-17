-- Результаты прохождения викторины. Пользователь может добавлять и читать
-- только собственные результаты.
create table public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  score integer not null check (score >= 0 and score <= total_questions),
  total_questions integer not null check (total_questions > 0),
  created_at timestamptz not null default now()
);

alter table public.quiz_results enable row level security;

create policy "read own quiz results"
  on public.quiz_results for select
  using (auth.uid() = user_id);

create policy "insert own quiz results"
  on public.quiz_results for insert
  with check (auth.uid() = user_id);
