# Learning Port — Supabase Multi-User Backend Design

**Date:** 2026-08-19  
**Status:** Approved  
**Path:** Architectural

---

## 1. Overview

Add a full multi-user backend to Learning Port using Supabase Auth + PostgreSQL with Row-Level Security. The site stays static HTML/CSS/JS — only user-specific data moves to the database. Static content (subjects, topics, notes, quizzes) remains in frontend files.

**Goals:**
- Real user accounts (email/password auth)
- Per-user progress, quiz scores, focus sessions, badges
- Secure by default — users can only access their own data
- One-time migration from localStorage to cloud on first login after update

**Non-goals:**
- No custom backend code or Edge Functions
- No third-party auth providers (Clerk, NextAuth, etc.)
- No content management in the DB — subjects/topics stay in `js/data.js`

---

## 2. Architecture

```
┌─────────────────────────────────────────────┐
│              Browser (static site)           │
│  ┌─────────────┐  ┌──────────────────────┐  │
│  │ @supabase/  │  │ js/data.js           │  │
│  │ supabase-js │  │ (subjects, topics,   │  │
│  │ (anon key)  │  │  notes, quizzes)     │  │
│  └──────┬──────┘  └──────────────────────┘  │
│         │                                    │
│  ┌──────┴──────┐                            │
│  │ js/auth.js  │  login/signup/logout       │
│  │ js/supabase │  client singleton          │
│  │ -client.js  │                            │
│  └──────┬──────┘                            │
└─────────┼───────────────────────────────────┘
          │ HTTPS
┌─────────┴───────────────────────────────────┐
│              Supabase Cloud                  │
│  ┌─────────────┐  ┌──────────────────────┐  │
│  │ Auth        │  │ PostgreSQL + RLS     │  │
│  │ (JWT,       │  │ profiles             │  │
│  │  password   │  │ user_progress        │  │
│  │  reset)     │  │ quiz_attempts        │  │
│  └─────────────┘  │ focus_sessions       │  │
│                   │ user_badges          │  │
│                   └──────────────────────┘  │
└─────────────────────────────────────────────┘
```

---

## 3. Database Schema

### 3.1 profiles
```sql
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  username      text unique not null,
  avatar_url    text,
  created_at    timestamptz default now()
);
```

### 3.2 user_progress
```sql
create table public.user_progress (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  subject_id    text not null,
  topic_id      text not null,
  completed     boolean default false,
  completed_at  timestamptz,
  updated_at    timestamptz default now(),
  unique (user_id, subject_id, topic_id)
);
```

### 3.3 quiz_attempts
```sql
create table public.quiz_attempts (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  subject_id    text not null,
  topic_id      text not null,
  score         integer not null,
  total         integer not null,
  answers       jsonb,
  attempted_at  timestamptz default now()
);
```

### 3.4 focus_sessions
```sql
create table public.focus_sessions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  subject_id    text,
  duration_min  integer not null,
  started_at    timestamptz not null,
  completed     boolean default true,
  created_at    timestamptz default now()
);
```

### 3.5 user_badges
```sql
create table public.user_badges (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  badge_id      text not null,
  earned_at     timestamptz default now(),
  unique (user_id, badge_id)
);
```

---

## 4. Row-Level Security

All tables: `alter table public.<table> enable row level security;`

### Policies (same pattern for every table):

| Operation | Policy |
|-----------|--------|
| SELECT | `auth.uid() = user_id` |
| INSERT | `auth.uid() = user_id` |
| UPDATE | `auth.uid() = user_id` |
| DELETE | none (no deletes needed) |

**profiles** is the exception: SELECT is public (anyone can see usernames), INSERT is via trigger on signup, UPDATE is own row only.

### Auto-create profile on signup:
```sql
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
```

---

## 5. Auth Flow

1. **Signup** — `supabase.auth.signUp({ email, password })` → creates auth user + trigger creates profile
2. **Login** — `supabase.auth.signInWithPassword({ email, password })` → sets session in localStorage
3. **Session restore** — `supabase.auth.getSession()` on page load → if session exists, user stays logged in
4. **Logout** — `supabase.auth.signOut()` → clears session
5. **Password reset** — `supabase.auth.resetPasswordForEmail(email)` → Supabase sends reset link

**Frontend guard:** Pages that need auth check session on load. If no session → redirect to `/login.html`. Public pages (subjects, topics, notes) stay accessible to everyone.

---

## 6. Frontend Integration

### New files:
- `js/supabase-client.js` — exports singleton Supabase client
- `js/auth.js` — login/signup/logout handlers, session listener
- `js/vendor/supabase.min.js` — vendored Supabase JS SDK (offline-safe)
- `login.html` — login page
- `signup.html` — signup page

### Modified files:
- `index.html` — show username or Login button in nav
- `subject.html`, `topic.html` — show auth state
- `js/dashboard.js` — read/write progress from Supabase instead of localStorage
- `js/quiz.js` — save quiz attempts to Supabase
- `js/pomodoro.js` — save focus sessions to Supabase
- `js/achievements.js` — read/write badges from Supabase

### Config (public keys, safe to expose):
```js
// js/supabase-client.js
import { createClient } from './vendor/supabase.min.js';
const SUPABASE_URL = 'https://eqrvzzvywxfvhxeyvrmp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_fxTY9N-Yt8nlr7SowfoqYA_uhIc73Oo';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

---

## 7. Migration Strategy

On first login after the update:
1. Check `localStorage.getItem('lp_progress')` and similar keys
2. If data exists, batch-insert into `user_progress`, `focus_sessions`, `user_badges`
3. Clear localStorage keys after successful migration
4. Flag `localStorage.setItem('lp_migrated', 'true')` so it only runs once

New users start fresh. Logged-out browsing uses localStorage as read-only cache (no writes).

---

## 8. Implementation Order

1. **Schema + RLS** — run SQL in Supabase dashboard
2. **Frontend client + auth pages** — `supabase-client.js`, `auth.js`, `login.html`, `signup.html`
3. **Progress tracking** — wire `user_progress` table to dashboard/topic pages
4. **Quiz attempts** — wire `quiz_attempts` table to quiz page
5. **Focus sessions** — wire `focus_sessions` table to Pomodoro timer
6. **Badges** — wire `user_badges` table to achievements
7. **Migration** — localStorage → Supabase one-time transfer

Each step ships independently and can be tested in isolation.

---

## 9. Security Considerations

- Anon key is safe to expose in browser — RLS enforces per-user access
- No service role key in frontend code (only in `.env` for server-side tooling)
- All tables have RLS enabled with `auth.uid() = user_id` policies
- No DELETE policies — data is never hard-deleted
- Password reset handled entirely by Supabase (secure email flow)
- HTTPS enforced by Supabase (no config needed)

---

## 10. Open Questions

None — all decisions approved in chat.
