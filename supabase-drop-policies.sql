-- ============================================================
-- LEARNING PORT — Supabase schema + RUN IN ORDER, ONE SECTION AT A TIME
-- Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- SECTION 1: Drop all existing policies first (run this alone)
drop policy if exists "profiles_select_public" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "user_progress_select_own" on public.user_progress;
drop policy if exists "user_progress_insert_own" on public.user_progress;
drop policy if exists "user_progress_update_own" on public.user_progress;
drop policy if exists "quiz_attempts_select_own" on public.quiz_attempts;
drop policy if exists "quiz_attempts_insert_own" on public.quiz_attempts;
drop policy if exists "focus_sessions_select_own" on public.focus_sessions;
drop policy if exists "focus_sessions_insert_own" on public.focus_sessions;
drop policy if exists "focus_sessions_update_own" on public.focus_sessions;
drop policy if exists "user_badges_select_own" on public.user_badges;
drop policy if exists "user_badges_insert_own" on public.user_badges;
