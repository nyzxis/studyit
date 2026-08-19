-- ============================================================
-- LEARNING PORT — Supabase schema + policies (run after dropping)
-- Run in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- profiles (public user info)
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  username      text unique not null,
  avatar_url    text,
  created_at    timestamptz default now()
);

-- user_progress (topic completion state)
create table if not exists public.user_progress (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  subject_id    text not null,
  topic_id      text not null,
  completed     boolean default false,
  completed_at  timestamptz,
  updated_at    timestamptz default now(),
  unique (user_id, subject_id, topic_id)
);

-- quiz_attempts (quiz history & scores)
create table if not exists public.quiz_attempts (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  subject_id    text not null,
  topic_id      text not null,
  score         integer not null,
  total         integer not null,
  answers       jsonb,
  attempted_at  timestamptz default now()
);

-- focus_sessions (Pomodoro sessions)
create table if not exists public.focus_sessions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  subject_id    text,
  duration_min  integer not null,
  started_at    timestamptz not null,
  completed     boolean default true,
  created_at    timestamptz default now()
);

-- user_badges (earned achievements)
create table if not exists public.user_badges (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  badge_id      text not null,
  earned_at     timestamptz default now(),
  unique (user_id, badge_id)
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles       enable row level security;
alter table public.user_progress  enable row level security;
alter table public.quiz_attempts  enable row level security;
alter table public.focus_sessions enable row level security;
alter table public.user_badges    enable row level security;

-- profiles: SELECT public, INSERT via trigger, UPDATE own row
create policy "profiles_select_public"
  on public.profiles for select
  using (true);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- user_progress: own rows only
create policy "user_progress_select_own"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "user_progress_insert_own"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "user_progress_update_own"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- quiz_attempts: own rows only
create policy "quiz_attempts_select_own"
  on public.quiz_attempts for select
  using (auth.uid() = user_id);

create policy "quiz_attempts_insert_own"
  on public.quiz_attempts for insert
  with check (auth.uid() = user_id);

-- focus_sessions: own rows only
create policy "focus_sessions_select_own"
  on public.focus_sessions for select
  using (auth.uid() = user_id);

create policy "focus_sessions_insert_own"
  on public.focus_sessions for insert
  with check (auth.uid() = user_id);

create policy "focus_sessions_update_own"
  on public.focus_sessions for update
  using (auth.uid() = user_id);

-- user_badges: own rows only
create policy "user_badges_select_own"
  on public.user_badges for select
  using (auth.uid() = user_id);

create policy "user_badges_insert_own"
  on public.user_badges for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- Auto-create profile on signup
-- ============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
