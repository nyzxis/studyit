-- ============================================================
-- LEARNING PORT — Supabase setup script
-- Run once in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Users table (password hashes live server-side only)
create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  username      text unique not null,
  password_hash text not null,
  created_at    timestamptz default now()
);

-- Progress table (one JSON blob per user)
create table if not exists public.progress (
  user_id    uuid primary key references public.users(id) on delete cascade,
  state      jsonb not null,
  updated_at timestamptz default now()
);

-- The API talks to Supabase REST with the service key from
-- serverless functions only — no RLS policies needed for the
-- public anon role. Lock it down anyway so the anon key
-- (if ever leaked into the browser) can read nothing:
alter table public.users    enable row level security;
alter table public.progress enable row level security;

-- Done. Paste your SUPABASE_URL + SUPABASE_SERVICE_KEY +
-- AUTH_SECRET into Vercel env vars (see DEPLOY.md).
