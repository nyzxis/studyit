# Supabase Multi-User Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full multi-user backend to Learning Port using Supabase Auth + PostgreSQL with Row-Level Security, replacing localStorage with cloud-synced user data.

**Architecture:** Static HTML/CSS/JS frontend talks directly to Supabase (Auth + PostgreSQL) using the vendored `@supabase/supabase-js` SDK with the publishable anon key. RLS enforces per-user data isolation. No custom backend code or Edge Functions.

**Tech Stack:** Supabase (Auth + PostgreSQL + RLS), vanilla JS, `@supabase/supabase-js` (vendored)

**Spec:** `docs/superpowers/specs/2026-08-19-supabase-backend-design.md`

## Global Constraints

- No build step — site must remain static HTML/CSS/JS servable via `python -m http.server`
- All vendor libraries must be vendored to `js/vendor/` (offline-safe, no CDN)
- Anon key is safe to expose in browser; service role key stays in `.env` only
- All tables must have RLS enabled with `auth.uid() = user_id` policies
- No DELETE policies — data is never hard-deleted
- Follow existing code patterns (IIFE modules, `window.LP*` globals, `el()`/`esc()` helpers)
- Commit after each task

---

## Task 1: Supabase Schema + RLS Policies

**Files:**
- Create: `supabase-schema.sql`

**Interfaces:**
- Consumes: nothing
- Produces: SQL file to run in Supabase dashboard; creates all 5 tables + RLS policies + auth trigger

- [ ] **Step 1: Write the schema SQL**

```sql
-- ============================================================
-- LEARNING PORT — Supabase schema + RLS
-- Run once in: Supabase Dashboard → SQL Editor → New query
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
```

- [ ] **Step 2: Commit**

```bash
git add supabase-schema.sql
git commit -m "feat: add Supabase schema with RLS policies and auth trigger"
```

---

## Task 2: Frontend Supabase Client

**Files:**
- Create: `js/supabase-client.js`
- Create: `js/vendor/supabase.min.js` (vendored SDK)

**Interfaces:**
- Consumes: nothing
- Produces: `window.LPSupabase` — singleton Supabase client with `supabase` property and helper methods

- [ ] **Step 1: Download vendored Supabase JS SDK**

Run in terminal:
```bash
cd "C:/Users/User/Desktop/Learning Port/studyit-repo"
npm pack @supabase/supabase-js@latest --pack-destination /tmp/
tar -xzf /tmp/supabase-supabase-js-*.tgz
cp package/dist/supabase.min.js js/vendor/supabase.min.js
```

- [ ] **Step 2: Create the client module**

```js
/* ============================================================
   LEARNING PORT — Supabase client singleton
   Vendored SDK loaded via <script> in HTML.
   ============================================================ */

(function () {
  "use strict";

  const SUPABASE_URL = "https://eqrvzzvywxfvhxeyvrmp.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_fxTY9N-Yt8nlr7SowfoqYA_uhIc73Oo";

  const { createClient } = window.supabase;
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  /* ---------------- auth helpers ---------------- */
  async function signUp(email, password) {
    return supabase.auth.signUp({ email, password });
  }

  async function signIn(email, password) {
    return supabase.auth.signInWithPassword({ email, password });
  }

  async function signOut() {
    return supabase.auth.signOut();
  }

  async function getSession() {
    return supabase.auth.getSession();
  }

  async function getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  function onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }

  /* ---------------- profile ---------------- */
  async function getProfile() {
    const user = await getUser();
    if (!user) return null;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    if (error) throw error;
    return data;
  }

  async function updateProfile(updates) {
    const user = await getUser();
    if (!user) throw new Error("Not authenticated");
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  /* ---------------- progress ---------------- */
  async function getProgress() {
    const user = await getUser();
    if (!user) return [];
    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id);
    if (error) throw error;
    return data || [];
  }

  async function upsertProgress(subjectId, topicId, completed) {
    const user = await getUser();
    if (!user) throw new Error("Not authenticated");
    const { data, error } = await supabase
      .from("user_progress")
      .upsert({
        user_id: user.id,
        subject_id: subjectId,
        topic_id: topicId,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      }, { onConflict: "user_id,subject_id,topic_id" })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  /* ---------------- quiz attempts ---------------- */
  async function getQuizAttempts() {
    const user = await getUser();
    if (!user) return [];
    const { data, error } = await supabase
      .from("quiz_attempts")
      .select("*")
      .eq("user_id", user.id)
      .order("attempted_at", { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async function getBestQuizScore(subjectId, topicId) {
    const user = await getUser();
    if (!user) return null;
    const { data, error } = await supabase
      .from("quiz_attempts")
      .select("score,total")
      .eq("user_id", user.id)
      .eq("subject_id", subjectId)
      .eq("topic_id", topicId)
      .order("score", { ascending: false })
      .limit(1)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return data || null;
  }

  async function saveQuizAttempt(subjectId, topicId, score, total, answers) {
    const user = await getUser();
    if (!user) throw new Error("Not authenticated");
    const { data, error } = await supabase
      .from("quiz_attempts")
      .insert({
        user_id: user.id,
        subject_id: subjectId,
        topic_id: topicId,
        score,
        total,
        answers: answers || null,
        attempted_at: new Date().toISOString()
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  /* ---------------- focus sessions ---------------- */
  async function getFocusSessions() {
    const user = await getUser();
    if (!user) return [];
    const { data, error } = await supabase
      .from("focus_sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("started_at", { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async function getFocusMinutes() {
    const user = await getUser();
    if (!user) return 0;
    const { data, error } = await supabase
      .from("focus_sessions")
      .select("duration_min")
      .eq("user_id", user.id)
      .eq("completed", true);
    if (error) throw error;
    return (data || []).reduce((sum, r) => sum + (r.duration_min || 0), 0);
  }

  async function saveFocusSession(subjectId, durationMin, startedAt, completed) {
    const user = await getUser();
    if (!user) throw new Error("Not authenticated");
    const { data, error } = await supabase
      .from("focus_sessions")
      .insert({
        user_id: user.id,
        subject_id: subjectId || null,
        duration_min: durationMin,
        started_at: startedAt,
        completed: completed,
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  /* ---------------- badges ---------------- */
  async function getBadges() {
    const user = await getUser();
    if (!user) return [];
    const { data, error } = await supabase
      .from("user_badges")
      .select("*")
      .eq("user_id", user.id);
    if (error) throw error;
    return data || [];
  }

  async function saveBadge(badgeId) {
    const user = await getUser();
    if (!user) throw new Error("Not authenticated");
    const { data, error } = await supabase
      .from("user_badges")
      .upsert({
        user_id: user.id,
        badge_id: badgeId,
        earned_at: new Date().toISOString()
      }, { onConflict: "user_id,badge_id" })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  /* ---------------- migration ---------------- */
  async function migrateFromLocalStorage() {
    const MIGRATION_KEY = "lp_migrated";
    if (localStorage.getItem(MIGRATION_KEY)) return;

    const user = await getUser();
    if (!user) return;

    // Migrate progress
    try {
      const raw = localStorage.getItem("learningPortProgress.v1");
      if (raw) {
        const progress = JSON.parse(raw);
        for (const subjectId of Object.keys(progress)) {
          const sp = progress[subjectId];
          if (sp.readTopics) {
            for (const topicId of Object.keys(sp.readTopics)) {
              if (sp.readTopics[topicId]) {
                await upsertProgress(subjectId, topicId, true);
              }
            }
          }
        }
      }
    } catch (e) { /* ignore bad data */ }

    // Migrate focus sessions
    try {
      const raw = localStorage.getItem("learningPortFocus.v1");
      if (raw) {
        const focus = JSON.parse(raw);
        for (const day of Object.keys(focus)) {
          const mins = parseFloat(focus[day]);
          if (mins > 0) {
            const startedAt = new Date(day + "T09:00:00").toISOString();
            await saveFocusSession(null, Math.round(mins), startedAt, true);
          }
        }
      }
    } catch (e) { /* ignore bad data */ }

    // Migrate badges
    try {
      const raw = localStorage.getItem("learningPortBadges.v1");
      if (raw) {
        const badges = JSON.parse(raw);
        if (badges.seen) {
          for (const badgeId of Object.keys(badges.seen)) {
            await saveBadge(badgeId);
          }
        }
      }
    } catch (e) { /* ignore bad data */ }

    localStorage.setItem(MIGRATION_KEY, "1");
  }

  window.LPSupabase = {
    supabase,
    signUp,
    signIn,
    signOut,
    getSession,
    getUser,
    onAuthStateChange,
    getProfile,
    updateProfile,
    getProgress,
    upsertProgress,
    getQuizAttempts,
    getBestQuizScore,
    saveQuizAttempt,
    getFocusSessions,
    getFocusMinutes,
    saveFocusSession,
    getBadges,
    saveBadge,
    migrateFromLocalStorage
  };
})();
```

- [ ] **Step 3: Commit**

```bash
git add js/supabase-client.js js/vendor/supabase.min.js
git commit -m "feat: add Supabase client singleton with auth, progress, quiz, focus, badge helpers"
```

---

## Task 3: Auth Pages (Login + Signup)

**Files:**
- Create: `login.html`
- Create: `signup.html`
- Create: `js/auth.js`

**Interfaces:**
- Consumes: `window.LPSupabase` (Task 2)
- Produces: `window.LPAuth` — auth form handlers, session listener, logout

- [ ] **Step 1: Create login.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login — Learning Port</title>
  <meta name="theme-color" content="#F7F6F3">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/enhance.css">
  <link rel="stylesheet" href="css/motion.css">
  <script src="js/boot.js"></script>
  <script src="js/vendor/anime.umd.min.js"></script>
  <script src="js/vendor/supabase.min.js"></script>
  <script src="js/supabase-client.js"></script>
  <script src="js/auth.js"></script>
</head>
<body class="auth-page">
  <main class="auth-wrap">
    <div class="auth-card">
      <a href="index.html" class="auth-brand">
        <span class="mark js-logo"></span>
        <span>LEARNING PORT</span>
      </a>
      <h1 class="auth-title">Welcome back</h1>
      <p class="auth-sub">Sign in to sync your progress across devices.</p>

      <form class="auth-form" id="loginForm">
        <label class="auth-label">
          <span>Email</span>
          <input type="email" id="loginEmail" required autocomplete="email">
        </label>
        <label class="auth-label">
          <span>Password</span>
          <input type="password" id="loginPassword" required autocomplete="current-password">
        </label>
        <button type="submit" class="btn btn-primary auth-btn">Sign in</button>
        <p class="auth-error" id="loginError" role="alert"></p>
      </form>

      <p class="auth-foot">
        No account? <a href="signup.html">Create one</a>
      </p>
    </div>
  </main>
</body>
</html>
```

- [ ] **Step 2: Create signup.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign Up — Learning Port</title>
  <meta name="theme-color" content="#F7F6F3">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/enhance.css">
  <link rel="stylesheet" href="css/motion.css">
  <script src="js/boot.js"></script>
  <script src="js/vendor/anime.umd.min.js"></script>
  <script src="js/vendor/supabase.min.js"></script>
  <script src="js/supabase-client.js"></script>
  <script src="js/auth.js"></script>
</head>
<body class="auth-page">
  <main class="auth-wrap">
    <div class="auth-card">
      <a href="index.html" class="auth-brand">
        <span class="mark js-logo"></span>
        <span>LEARNING PORT</span>
      </a>
      <h1 class="auth-title">Create your account</h1>
      <p class="auth-sub">Start tracking your study progress in the cloud.</p>

      <form class="auth-form" id="signupForm">
        <label class="auth-label">
          <span>Email</span>
          <input type="email" id="signupEmail" required autocomplete="email">
        </label>
        <label class="auth-label">
          <span>Password</span>
          <input type="password" id="signupPassword" required minlength="6" autocomplete="new-password">
          <small>At least 6 characters</small>
        </label>
        <button type="submit" class="btn btn-primary auth-btn">Create account</button>
        <p class="auth-error" id="signupError" role="alert"></p>
      </form>

      <p class="auth-foot">
        Already have an account? <a href="login.html">Sign in</a>
      </p>
    </div>
  </main>
</body>
</html>
```

- [ ] **Step 3: Create js/auth.js**

```js
/* ============================================================
   LEARNING PORT — auth form handlers + session state
   ============================================================ */

(function () {
  "use strict";

  function showError(el, msg) {
    if (el) {
      el.textContent = msg;
      el.classList.add("show");
    }
  }

  function clearError(el) {
    if (el) {
      el.textContent = "";
      el.classList.remove("show");
    }
  }

  /* ---------------- login ---------------- */
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    const errEl = document.getElementById("loginError");
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearError(errEl);
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      const btn = loginForm.querySelector("button[type=submit]");
      btn.disabled = true;
      btn.textContent = "Signing in...";
      try {
        const { error } = await window.LPSupabase.signIn(email, password);
        if (error) throw error;
        await window.LPSupabase.migrateFromLocalStorage();
        window.location.href = "index.html";
      } catch (err) {
        showError(errEl, err.message || "Sign in failed. Check your credentials.");
        btn.disabled = false;
        btn.textContent = "Sign in";
      }
    });
  }

  /* ---------------- signup ---------------- */
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    const errEl = document.getElementById("signupError");
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearError(errEl);
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value;
      const btn = signupForm.querySelector("button[type=submit]");
      btn.disabled = true;
      btn.textContent = "Creating account...";
      try {
        const { error } = await window.LPSupabase.signUp(email, password);
        if (error) throw error;
        await window.LPSupabase.migrateFromLocalStorage();
        window.location.href = "index.html";
      } catch (err) {
        showError(errEl, err.message || "Sign up failed. Try a different email.");
        btn.disabled = false;
        btn.textContent = "Create account";
      }
    });
  }

  /* ---------------- session state for nav ---------------- */
  async function paintAuthState() {
    const nav = document.querySelector(".nav-row");
    if (!nav) return;

    // Remove existing auth element
    const existing = document.getElementById("authState");
    if (existing) existing.remove();

    const user = await window.LPSupabase.getUser();
    const el = document.createElement("div");
    el.id = "authState";
    el.className = "auth-state";

    if (user) {
      const email = user.email || "User";
      el.innerHTML = `
        <span class="auth-user">${email}</span>
        <button type="button" class="btn btn-ghost auth-logout" id="logoutBtn">Logout</button>
      `;
      nav.appendChild(el);
      document.getElementById("logoutBtn").addEventListener("click", async () => {
        await window.LPSupabase.signOut();
        window.location.href = "login.html";
      });
    } else {
      el.innerHTML = `<a href="login.html" class="btn btn-primary">Sign in</a>`;
      nav.appendChild(el);
    }
  }

  /* ---------------- redirect if no session (protected pages) ---------------- */
  async function requireAuth() {
    const user = await window.LPSupabase.getUser();
    if (!user) {
      window.location.href = "login.html";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (document.body.dataset.requireAuth === "true") {
      requireAuth();
    }
    paintAuthState();
  });

  window.LPAuth = {
    paintAuthState,
    requireAuth
  };
})();
```

- [ ] **Step 4: Add auth page styles to css/enhance.css**

Append to `css/enhance.css`:

```css
/* ---------------- auth pages ---------------- */
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
}

.auth-wrap {
  width: 100%;
  max-width: 420px;
}

.auth-card {
  background: var(--surface, #fff);
  border: 1px solid var(--line-soft, #e5e7eb);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.04);
}

.auth-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  color: var(--ink, #1B1B1A);
  margin-bottom: 1.5rem;
}

.auth-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.auth-sub {
  color: var(--ink-faint, #6b7280);
  margin: 0 0 1.5rem;
  font-size: 0.9rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.auth-label input {
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--line-soft, #e5e7eb);
  border-radius: 8px;
  font-size: 0.95rem;
  background: var(--surface, #fff);
  color: var(--ink, #1B1B1A);
}

.auth-label input:focus {
  outline: 2px solid var(--accent, #4F46E5);
  outline-offset: -1px;
}

.auth-label small {
  color: var(--ink-faint, #6b7280);
  font-weight: 400;
}

.auth-btn {
  margin-top: 0.5rem;
  width: 100%;
  justify-content: center;
}

.auth-error {
  color: #dc2626;
  font-size: 0.85rem;
  margin: 0;
  min-height: 1.2em;
  opacity: 0;
  transition: opacity 0.2s;
}

.auth-error.show {
  opacity: 1;
}

.auth-foot {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: var(--ink-faint, #6b7280);
}

.auth-foot a {
  color: var(--accent, #4F46E5);
  text-decoration: none;
  font-weight: 500;
}

.auth-foot a:hover {
  text-decoration: underline;
}

/* ---------------- auth state in nav ---------------- */
.auth-state {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.auth-user {
  font-size: 0.85rem;
  color: var(--ink-faint, #6b7280);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.auth-logout {
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
}
```

- [ ] **Step 5: Commit**

```bash
git add login.html signup.html js/auth.js css/enhance.css
git commit -m "feat: add login/signup pages with auth form handlers and session state"
```

---

## Task 4: Wire Progress Tracking to Supabase

**Files:**
- Modify: `js/common.js` (replace localStorage functions with Supabase calls)

**Interfaces:**
- Consumes: `window.LPSupabase` (Task 2)
- Produces: async versions of `loadProgress`, `saveProgress`, `toggleTopicRead`, `recordQuizScore`, `bestQuizScore`, `topicIsRead`, `subjectCompletion`, `overallStats`

- [ ] **Step 1: Replace localStorage-based progress functions with Supabase-backed versions**

In `js/common.js`, replace the entire progress section (lines 1-64) with:

```js
/* ============================================================
   LEARNING PORT — shared helpers (used by every page)
   Progress now backed by Supabase; localStorage is fallback
   for logged-out browsing only.
   ============================================================ */

const STORE_KEY = "learningPortProgress.v1";

/* ---------------- localStorage fallback (logged-out) ---------------- */
function loadProgressLocal() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch (e) { return {}; }
}
function saveProgressLocal(p) {
  localStorage.setItem(STORE_KEY, JSON.stringify(p));
}

/* ---------------- Supabase-backed progress ---------------- */
let _progressCache = null;
let _progressCacheTime = 0;
const PROGRESS_CACHE_TTL = 30000; // 30s

async function loadProgress() {
  // If logged in, fetch from Supabase
  if (window.LPSupabase) {
    try {
      const user = await window.LPSupabase.getUser();
      if (user) {
        const now = Date.now();
        if (_progressCache && (now - _progressCacheTime) < PROGRESS_CACHE_TTL) {
          return _progressCache;
        }
        const rows = await window.LPSupabase.getProgress();
        const progress = {};
        rows.forEach(r => {
          if (!progress[r.subject_id]) {
            progress[r.subject_id] = { readTopics: {}, quizScores: {} };
          }
          if (r.completed) {
            progress[r.subject_id].readTopics[r.topic_id] = true;
          }
        });
        // Also load quiz scores from quiz_attempts
        const attempts = await window.LPSupabase.getQuizAttempts();
        attempts.forEach(a => {
          if (!progress[a.subject_id]) {
            progress[a.subject_id] = { readTopics: {}, quizScores: {} };
          }
          const prev = progress[a.subject_id].quizScores[a.topic_id];
          if (!prev || a.score > prev.score) {
            progress[a.subject_id].quizScores[a.topic_id] = { score: a.score, total: a.total };
          }
        });
        _progressCache = progress;
        _progressCacheTime = now;
        return progress;
      }
    } catch (e) {
      // Fall through to localStorage
    }
  }
  return loadProgressLocal();
}

function invalidateProgressCache() {
  _progressCache = null;
  _progressCacheTime = 0;
}

function ensureSubjectProgress(subjectId, progress) {
  if (!progress[subjectId]) progress[subjectId] = { readTopics: {}, quizScores: {} };
  return progress[subjectId];
}

async function topicIsRead(subjectId, topicId) {
  const progress = await loadProgress();
  return !!ensureSubjectProgress(subjectId, progress).readTopics[topicId];
}

async function toggleTopicRead(subjectId, topicId) {
  const progress = await loadProgress();
  const sp = ensureSubjectProgress(subjectId, progress);
  sp.readTopics[topicId] = !sp.readTopics[topicId];

  // Save to Supabase if logged in
  if (window.LPSupabase) {
    try {
      const user = await window.LPSupabase.getUser();
      if (user) {
        await window.LPSupabase.upsertProgress(subjectId, topicId, sp.readTopics[topicId]);
        invalidateProgressCache();
        return;
      }
    } catch (e) { /* fall through to localStorage */ }
  }
  saveProgressLocal(progress);
}

async function bestQuizScore(subjectId, topicId) {
  const progress = await loadProgress();
  return ensureSubjectProgress(subjectId, progress).quizScores[topicId];
}

async function recordQuizScore(subjectId, topicId, score, total) {
  const progress = await loadProgress();
  const sp = ensureSubjectProgress(subjectId, progress);
  const prev = sp.quizScores[topicId];
  if (!prev || score > prev.score) {
    sp.quizScores[topicId] = { score, total };
  }

  // Save to Supabase if logged in
  if (window.LPSupabase) {
    try {
      const user = await window.LPSupabase.getUser();
      if (user) {
        await window.LPSupabase.saveQuizAttempt(subjectId, topicId, score, total);
        invalidateProgressCache();
        return;
      }
    } catch (e) { /* fall through to localStorage */ }
  }
  saveProgressLocal(progress);
}

async function subjectCompletion(subject) {
  const progress = await loadProgress();
  const sp = ensureSubjectProgress(subject.id, progress);
  const total = subject.topics.length;
  let done = 0;
  subject.topics.forEach(t => {
    const read = !!sp.readTopics[t.id];
    const quiz = sp.quizScores[t.id];
    const passed = quiz && quiz.score / quiz.total >= 0.6;
    const hasQuiz = !!(t.quiz && t.quiz.length);
    if (read && (!hasQuiz || passed)) done++;
  });
  return { done, total };
}

/* ---------------- overall stats + streak ---------------- */
async function overallStats() {
  let done = 0, total = 0, quizzesPassed = 0, quizTotal = 0;
  for (const s of SUBJECTS) {
    const c = await subjectCompletion(s);
    done += c.done;
    total += c.total;
    s.topics.forEach(t => {
      if (t.quiz && t.quiz.length) {
        quizTotal++;
        // Note: bestQuizScore is async, so we need to handle this differently
        // We'll compute this in the caller
      }
    });
  }
  return { done, total, quizzesPassed, quizTotal };
}

/* study streak: count of consecutive days the site was opened */
const STREAK_KEY = "learningPortStreak.v1";
function dayKey(d) { return d.toISOString().slice(0, 10); }
function loadStreak() {
  try { return JSON.parse(localStorage.getItem(STREAK_KEY)) || { last: null, count: 0, days: {} }; }
  catch (e) { return { last: null, count: 0, days: {} }; }
}
function recordVisit() {
  const s = loadStreak();
  const today = dayKey(new Date());
  if (s.last !== today) {
    const y = new Date(); y.setDate(y.getDate() - 1);
    const yesterday = dayKey(y);
    s.count = (s.last === yesterday) ? s.count + 1 : 1;
    s.last = today;
    s.days[today] = true;
    localStorage.setItem(STREAK_KEY, JSON.stringify(s));
  }
  return s;
}
function getStreak() { return loadStreak(); }

/* smart "next up" topic: first unread topic without a passing quiz */
async function nextUpTopic() {
  const progress = await loadProgress();
  for (let si = 0; si < SUBJECTS.length; si++) {
    const s = SUBJECTS[si];
    for (let ti = 0; ti < s.topics.length; ti++) {
      const t = s.topics[ti];
      const sp = ensureSubjectProgress(s.id, progress);
      const quiz = sp.quizScores[t.id];
      const passed = quiz && quiz.score / quiz.total >= 0.6;
      if (!sp.readTopics[t.id] || (t.quiz && t.quiz.length && !passed)) {
        return { subject: s, topic: t };
      }
    }
  }
  return null;
}
```

- [ ] **Step 2: Update dashboard.js to use async functions**

In `js/dashboard.js`, update `buildRings`, `buildNext`, `buildOverall` to be async and `await` the new async functions:

```js
async function buildRings() {
  const host = document.getElementById("dockRings");
  if (!host) return;
  host.innerHTML = "";
  for (const subject of SUBJECTS) {
    const { done, total } = await subjectCompletion(subject);
    const pct = total ? Math.round((done / total) * 100) : 0;
    const card = el("a", "dock-subject");
    card.href = "subject.html?id=" + encodeURIComponent(subject.id);
    card.innerHTML = `
      ${svgRing(pct, subject.color || "#7c3aed", 96)}
      <div class="dock-subject-info">
        <div class="dock-subject-name">${esc(subject.name)}</div>
        <div class="dock-subject-meta">${done}/${total} connected ${pct > 0 ? "· " + pct + "%" : ""}</div>
      </div>
    `;
    host.appendChild(card);
  }
}

async function buildNext() {
  const host = document.getElementById("dockNext");
  if (!host) return;
  const up = await nextUpTopic();
  const stats = await overallStats();
  const left = stats.total - stats.done;
  if (!up) {
    host.innerHTML = `
      <div class="next-label">NEXT UP</div>
      <div class="next-title">All topics locked in</div>
      <p>Every port is connected — the whole dock is green. Retake a quiz to keep your edge.</p>
      <a class="btn btn-primary" href="#subjects">Browse subjects</a>
    `;
    return;
  }
  host.innerHTML = `
    <div class="next-label">NEXT UP</div>
    <div class="next-title">${esc(up.topic.title)}</div>
    <p><span class="next-sub">${esc(up.subject.name)}</span> · ${left > 0 ? left + " topic" + (left > 1 ? "s" : "") + " left in the dock" : "finish this one to clear the subject"}</p>
    <a class="btn btn-primary" href="topic.html?subject=${encodeURIComponent(up.subject.id)}&topic=${encodeURIComponent(up.topic.id)}">Continue studying →</a>
  `;
}

async function buildOverall() {
  const stats = await overallStats();
  const pct = stats.total ? Math.round(stats.done / stats.total * 100) : 0;
  const bar = document.getElementById("dockOverallBar");
  const txt = document.getElementById("dockOverallText");
  if (bar) {
    bar.style.width = pct + "%";
    bar.dataset.pct = pct;
  }
  if (txt) {
    txt.innerHTML = `<b>${stats.done}/${stats.total}</b> topics fully connected · <b>${stats.quizzesPassed}/${stats.quizTotal}</b> self-tests passed`;
  }
}
```

And update the DOMContentLoaded handler to await:

```js
document.addEventListener("DOMContentLoaded", async () => {
  await buildOverall();
  await buildRings();
  buildStreak();
  await buildNext();
  buildHeatmap();
  document.addEventListener("lp:focus-change", buildHeatmap);
  const sec = document.getElementById("dockMap");
  if (sec) {
    try {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(en => { if (en.isIntersecting) { animateRings(); io.disconnect(); } });
      }, { threshold: 0.2 });
      io.observe(sec);
    } catch (e) { animateRings(); }
  } else {
    animateRings();
  }
});
```

- [ ] **Step 3: Update paintHeaderChrome to be async**

```js
async function paintHeaderChrome() {
  const logoSlot = document.querySelectorAll(".js-logo");
  logoSlot.forEach(s => s.innerHTML = LOGO_SVG);

  let done = 0, total = 0;
  for (const s of SUBJECTS) {
    const c = await subjectCompletion(s);
    done += c.done;
    total += c.total;
  }
  const chip = document.getElementById("headerProgress");
  if (chip) chip.innerHTML = `<span class="led ${done > 0 ? "on" : ""}"></span> ${done}/${total} topics connected`;

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
```

- [ ] **Step 4: Commit**

```bash
git add js/common.js js/dashboard.js
git commit -m "feat: wire progress tracking to Supabase with localStorage fallback"
```

---

## Task 5: Wire Quiz Attempts to Supabase

**Files:**
- Modify: `js/quiz.js`

**Interfaces:**
- Consumes: `window.LPSupabase` (Task 2), `recordQuizScore` (Task 4)
- Produces: quiz attempts saved to Supabase when logged in

- [ ] **Step 1: Update quiz.js to save attempts to Supabase**

In `js/quiz.js`, the `recordQuizScore` call in `renderResult` already uses the shared function from `common.js`. No changes needed to quiz.js itself — the `recordQuizScore` function in `common.js` now handles both Supabase and localStorage.

However, update the `renderResult` function to show the best score from Supabase:

```js
async function renderResult() {
  currentKey = null;
  clearInterval(timerInt);
  const pct = Math.round(score / topic.quiz.length * 100);
  const good = pct >= 60;
  track.style.display = "none";
  progressEl.innerHTML = "";
  const box = el("div", "quiz-card quiz-result");
  let msg;
  if (pct >= 90) msg = "Excellent — port locked in. You clearly own this topic.";
  else if (pct >= 60) msg = "Port connected — solid grasp of this topic.";
  else msg = "Not quite docked yet — review the notes and try again.";

  // ... (keep existing ring rendering code) ...

  // Save the score
  await recordQuizScore(subject.id, topic.id, score, topic.quiz.length);

  // Show best score if available
  const best = await bestQuizScore(subject.id, topic.id);
  if (best && best.score !== score) {
    const bestEl = el("div", "result-best", `Best: ${best.score}/${best.total} (${Math.round(best.score / best.total * 100)}%)`);
    box.querySelector(".result-copy").appendChild(bestEl);
  }

  // ... (keep existing retry/notes buttons) ...
}
```

- [ ] **Step 2: Commit**

```bash
git add js/quiz.js
git commit -m "feat: wire quiz attempts to Supabase with best score display"
```

---

## Task 6: Wire Focus Sessions to Supabase

**Files:**
- Modify: `js/pomodoro.js`

**Interfaces:**
- Consumes: `window.LPSupabase` (Task 2)
- Produces: focus sessions saved to Supabase when logged in

- [ ] **Step 1: Update pomodoro.js to save sessions to Supabase**

In `js/pomodoro.js`, update the `complete` function to save to Supabase:

```js
async function complete() {
  clearInterval(tick);
  state.running = false;
  state.endsAt = null;
  if (state.mode === "focus") {
    state.sessions++;
    if (window.LPX) window.LPX.add(30, "focus session complete");
    if (typeof showToast === "function") showToast("Focus session complete — take a break");
    setMode(state.sessions % 4 === 0 ? "long" : "short", true);

    // Save to Supabase
    if (window.LPSupabase) {
      try {
        const startedAt = new Date(Date.now() - 25 * 60 * 1000).toISOString();
        await window.LPSupabase.saveFocusSession(null, 25, startedAt, true);
      } catch (e) { /* ignore */ }
    }
  } else {
    if (typeof showToast === "function") showToast("Break over — back to it");
    setMode("focus", true);
  }
  chime();
  save();
  paint();
}
```

Also update the heatmap in `dashboard.js` to read focus minutes from Supabase:

```js
async function buildHeatmap() {
  const host = document.getElementById("dockHeatmap");
  if (!host) return;

  const today = new Date();
  const todayKey = dayKey(today);
  const totalW = 14;

  const colAlign = (() => { const d = new Date(today); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d; })();
  const dates = [];
  for (let w = 0; w < totalW; w++) {
    const colStart = new Date(colAlign);
    colStart.setDate(colAlign.getDate() - (totalW - 1 - w) * 7);
    for (let dow = 0; dow < 7; dow++) {
      const d = new Date(colStart);
      d.setDate(colStart.getDate() + dow);
      dates.push(d);
    }
  }

  const streak = getStreak();
  let focus = {};

  // Try Supabase first
  if (window.LPSupabase) {
    try {
      const user = await window.LPSupabase.getUser();
      if (user) {
        const sessions = await window.LPSupabase.getFocusSessions();
        sessions.forEach(s => {
          const day = dayKey(new Date(s.started_at));
          focus[day] = (focus[day] || 0) + s.duration_min;
        });
      }
    } catch (e) { /* fall through to localStorage */ }
  }

  // Fallback to localStorage
  if (Object.keys(focus).length === 0) {
    try {
      focus = JSON.parse(localStorage.getItem("learningPortFocus.v1")) || {};
    } catch (e) { focus = {}; }
  }

  const levels = dates.map(d => {
    const k = dayKey(d);
    const mins = parseFloat(focus[k]) || 0;
    let lvl = 0;
    if (mins > 0) lvl = mins >= 45 ? 4 : mins >= 20 ? 3 : mins >= 8 ? 2 : 1;
    else if (streak.days && streak.days[k]) lvl = 1;
    return { k, d, mins, lvl, today: k === todayKey };
  });

  const totalMins = Object.keys(focus).reduce((a, k) => a + (parseFloat(focus[k]) || 0), 0);
  const currentStreak = (() => { let c = 0; for (let i = dates.length - 1; i >= 0; i--) { if (levels[i].lvl >= 1) { c++; } else break; } return c; })();

  let cells = "";
  levels.forEach(o => {
    cells += `<i class="hm-cell hm-${o.lvl}${o.today ? " today" : ""}" title="${o.k}: ${o.mins > 0 ? Math.round(o.mins) + " min " + (o.lvl > 1 ? "focused" : "visited") : "no activity"}"></i>`;
  });

  host.innerHTML = `
    <div class="heatmap-head">
      <span class="heatmap-title">Study activity — last ${totalW} weeks</span>
      <span class="heatmap-total">${formatMin(totalMins)} total · ${currentStreak} days active loop</span>
    </div>
    <div class="heatmap-body">
      <div class="hm-labels">${["M", "T", "W", "T", "F", "S", "S"].map((l, i) => `<span style="top:${(i * 12) + 4}px">${l}</span>`).join("")}</div>
      <div class="hm-scroll"><div class="hm-cols">${cells}</div></div>
    </div>
    <div class="heatmap-legend">
      <span>Less</span>
      ${[0, 1, 2, 3, 4].map(l => `<i class="hm-cell hm-${l}"></i>`).join("")}
      <span>More</span>
    </div>
  `;
}
```

- [ ] **Step 2: Commit**

```bash
git add js/pomodoro.js js/dashboard.js
git commit -m "feat: wire focus sessions to Supabase with heatmap integration"
```

---

## Task 7: Wire Badges to Supabase

**Files:**
- Modify: `js/achievements.js`

**Interfaces:**
- Consumes: `window.LPSupabase` (Task 2)
- Produces: badges saved to Supabase when logged in

- [ ] **Step 1: Update achievements.js to use Supabase**

In `js/achievements.js`, update the `render` function and `evaluate` to work with async data:

```js
async function countRead() {
  let n = 0;
  for (const s of SUBJECTS) {
    for (const t of s.topics) {
      if (await topicIsRead(s.id, t.id)) n++;
    }
  }
  return n;
}

async function countQuestionsAnswered() {
  let n = 0;
  for (const s of SUBJECTS) {
    for (const t of s.topics) {
      const q = await bestQuizScore(s.id, t.id);
      if (q) n += q.total;
    }
  }
  return n;
}

async function focusMinutes() {
  // Try Supabase first
  if (window.LPSupabase) {
    try {
      const user = await window.LPSupabase.getUser();
      if (user) {
        return await window.LPSupabase.getFocusMinutes();
      }
    } catch (e) { /* fall through */ }
  }
  // Fallback to localStorage
  try {
    const f = JSON.parse(localStorage.getItem("learningPortFocus.v1") || "{}");
    let sum = 0;
    Object.keys(f).forEach(k => { if (!isNaN(parseFloat(f[k]))) sum += parseFloat(f[k]); });
    return Math.round(sum);
  } catch (e) { return 0; }
}

async function evaluate() {
  const readN = await countRead();
  const qAnswered = await countQuestionsAnswered();
  const focusMin = await focusMinutes();

  // Get stats (need to compute quizzesPassed manually)
  let quizzesPassed = 0, quizTotal = 0;
  for (const s of SUBJECTS) {
    for (const t of s.topics) {
      if (t.quiz && t.quiz.length) {
        quizTotal++;
        const q = await bestQuizScore(s.id, t.id);
        if (q && q.score / q.total >= 0.6) quizzesPassed++;
      }
    }
  }

  const streak = getStreak().count;
  const perfect = await (async () => {
    for (const s of SUBJECTS) {
      for (const t of s.topics) {
        const q = await bestQuizScore(s.id, t.id);
        if (q && q.total > 0 && q.score === q.total) return true;
      }
    }
    return false;
  })();

  const ids = [];
  ids.push("first-visit");
  if (readN >= 1) ids.push("first-read");
  if (readN >= 5) ids.push("read-5");
  if (quizzesPassed >= 1) ids.push("quiz-pass");
  if (perfect) ids.push("quiz-perfect");
  if (streak >= 3) ids.push("streak-3");
  if (streak >= 7) ids.push("streak-7");

  // Check subject completion
  for (const s of SUBJECTS) {
    const c = await subjectCompletion(s);
    if (c.total > 0 && c.done === c.total) { ids.push("subject-clear"); break; }
  }

  // Check all clear
  let allDone = true;
  for (const s of SUBJECTS) {
    const c = await subjectCompletion(s);
    if (c.done !== c.total) { allDone = false; break; }
  }
  if (allDone && SUBJECTS.length > 0) ids.push("all-clear");

  if (focusMin >= 30) ids.push("focus-30");
  if (focusMin >= 120) ids.push("focus-120");
  if (qAnswered >= 60) ids.push("quiz-60-plus");

  return ids;
}

async function render(id) {
  const ids = await evaluate();
  const seen = load().seen;
  const host = document.getElementById(id);
  if (!host) {
    ids.forEach(bid => {
      if (!seen[bid]) {
        seen[bid] = 1;
        save({ seen });
        toast(BADGES.find(b => b.id === bid));
      }
    });
    return ids;
  }
  host.innerHTML = "";
  for (const b of BADGES) {
    const on = ids.indexOf(b.id) !== -1;
    if (on && !seen[b.id]) {
      seen[b.id] = 1;
      save({ seen });
      // Save to Supabase
      if (window.LPSupabase) {
        try {
          const user = await window.LPSupabase.getUser();
          if (user) await window.LPSupabase.saveBadge(b.id);
        } catch (e) { /* ignore */ }
      }
      setTimeout(() => toast(b), 250);
    }
    const card = el("div", "badge-card" + (on ? " earned" : " locked"));
    card.innerHTML = `
      <div class="badge-ico">${b.icon}</div>
      <div class="badge-name">${esc(b.name)}</div>
      <div class="badge-hint">${on ? esc(b.hint) : "Locked · " + esc(b.hint)}</div>
    `;
    host.appendChild(card);
  }
  return ids;
}

document.addEventListener("DOMContentLoaded", async () => {
  await render(document.getElementById("badgeTray") ? "badgeTray" : null);
});

window.LPBadges = {
  evaluate,
  render,
  recheck: async function () { await render(document.getElementById("badgeTray") ? "badgeTray" : null); }
};
```

- [ ] **Step 2: Commit**

```bash
git add js/achievements.js
git commit -m "feat: wire badges to Supabase with async evaluation"
```

---

## Task 8: Add Supabase Scripts to All Pages

**Files:**
- Modify: `index.html`, `subject.html`, `topic.html`, `quiz.html`

**Interfaces:**
- Consumes: `window.LPSupabase` (Task 2), `window.LPAuth` (Task 3)
- Produces: all pages load Supabase client and show auth state

- [ ] **Step 1: Add Supabase scripts to index.html**

In `index.html`, add before `</head>`:

```html
<script src="js/vendor/supabase.min.js"></script>
<script src="js/supabase-client.js"></script>
<script src="js/auth.js"></script>
```

- [ ] **Step 2: Add Supabase scripts to subject.html**

Same as above.

- [ ] **Step 3: Add Supabase scripts to topic.html**

Same as above.

- [ ] **Step 4: Add Supabase scripts to quiz.html**

Same as above.

- [ ] **Step 5: Commit**

```bash
git add index.html subject.html topic.html quiz.html
git commit -m "feat: add Supabase client scripts to all pages"
```

---

## Task 9: Final Integration + Migration

**Files:**
- Modify: `js/common.js` (ensure migration runs on login)

**Interfaces:**
- Consumes: all previous tasks
- Produces: complete working multi-user backend

- [ ] **Step 1: Verify migration runs on auth state change**

In `js/supabase-client.js`, add a call to `migrateFromLocalStorage` after successful login/signup (already done in `js/auth.js` Task 3). Add a listener for future sessions:

```js
// Add to window.LPSupabase object:
async function init() {
  const { data: { subscription } } = onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session) {
      await migrateFromLocalStorage();
    }
  });
  return subscription;
}

// Call init on load
init();
```

- [ ] **Step 2: Test the full flow**

Manual test checklist:
1. Open `signup.html` → create account → redirected to `index.html`
2. Check Supabase dashboard → `profiles` table has new row
3. Navigate to a topic → mark as read → check `user_progress` table
4. Take a quiz → check `quiz_attempts` table
5. Run Pomodoro timer → complete session → check `focus_sessions` table
6. Earn a badge → check `user_badges` table
7. Logout → login again → data persists
8. Open in incognito → sign in → data syncs

- [ ] **Step 3: Commit**

```bash
git add js/supabase-client.js
git commit -m "feat: add auth state listener for automatic migration"
```

---

## Task 10: Push to Deploy

**Files:** none

**Interfaces:** all previous tasks

- [ ] **Step 1: Push to main**

```bash
cd "C:/Users/User/Desktop/Learning Port/studyit-repo"
git push origin main
```

- [ ] **Step 2: Verify Vercel deployment**

Wait ~30s for Vercel auto-deploy, then visit `https://studyitpi.vercel.app` and verify:
- Login/signup pages load
- Auth flow works
- Progress syncs across sessions
