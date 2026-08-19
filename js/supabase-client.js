/* ============================================================
   LEARNING PORT — Supabase client singleton
   Vendored SDK loaded via <script> in HTML.
   ============================================================ */

(function () {
  "use strict";

  const SUPABASE_URL = "https://eqrvzzvywxfvhxeyvrmp.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_fxTY9N-Yt8nlr7SowfoqYA_uhIc73Oo";

  if (!window.supabase) {
    console.error("Supabase SDK not loaded. Check js/vendor/supabase.min.js");
    return;
  }

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

    let user;
    try { user = await getUser(); } catch (e) { return; }
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

  /* ---------------- init (auto-migrate on login) ---------------- */
async function init() {
  const { data: { subscription } } = onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session) {
      await migrateFromLocalStorage();
    }
  });
  return subscription;
}

init();

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
    migrateFromLocalStorage,
    init
  };
})();