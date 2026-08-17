/* ============================================================
   LEARNING PORT — smart.js
   1) XP system: quiz points + reviewed topics + pomodoro
      sessions earn XP. Levels roll up, header chip shows rank.
   2) Time-aware greeting on the home hero.
   3) Weekly goal ring (XP earned this ISO week vs target).
   ============================================================ */

(function () {
  "use strict";

  const XP_KEY = "learningPortXP.v1";
  const WEEKLY_TARGET = 300; /* XP */

  function load() {
    try { return JSON.parse(localStorage.getItem(XP_KEY)) || { total: 0, week: {}, wk: "" }; }
    catch (e) { return { total: 0, week: {}, wk: "" }; }
  }
  function save(d) { localStorage.setItem(XP_KEY, JSON.stringify(d)); }

  function weekKey() {
    const d = new Date();
    const day = (d.getDay() + 6) % 7; /* Mon = 0 */
    const mon = new Date(d); mon.setDate(d.getDate() - day);
    return mon.toISOString().slice(0, 10);
  }

  function addXP(amount, why) {
    const d = load();
    const wk = weekKey();
    if (d.wk !== wk) { d.wk = wk; d.week = {}; }
    d.total += amount;
    d.week[wk] = (d.week[wk] || 0) + amount;
    save(d);
    paintChip();
    if (why && typeof showToast === "function") showToast("+" + amount + " XP · " + why);
    checkLevel(d.total);
  }

  /* level curve: 0,100,250,450,700,1000... */
  function levelFor(xp) {
    const thresholds = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200];
    let lvl = 1;
    for (let i = 0; i < thresholds.length; i++) if (xp >= thresholds[i]) lvl = i + 1;
    const cur = thresholds[lvl - 1];
    const next = thresholds[lvl] || (cur + 800);
    return { lvl, cur, next, pct: Math.min(100, Math.round((xp - cur) / (next - cur) * 100)) };
  }

  const NAMES = ["", "Novice", "Reader", "Scholar", "Analyst", "Strategist", "Maven", "Sage", "Master", "Luminary", "Legend"];

  let lastLvl = levelFor(load().total).lvl;
  function checkLevel(total) {
    const L = levelFor(total);
    if (L.lvl > lastLvl) {
      lastLvl = L.lvl;
      if (window.LPSnd) window.LPSnd.play("level");
      if (typeof showToast === "function") showToast("Level up — you're now " + (NAMES[L.lvl] || "Level " + L.lvl));
    }
  }

  /* header chip */
  function paintChip() {
    const chip = document.getElementById("xpChip");
    if (!chip) return;
    const d = load();
    const L = levelFor(d.total);
    chip.innerHTML = `<span class="xp-lvl">Lv ${L.lvl}</span><span class="xp-bar"><i style="width:${L.pct}%"></i></span><span class="xp-name">${NAMES[L.lvl] || "Lv " + L.lvl}</span>`;
    chip.title = d.total + " XP total · " + L.pct + "% to next level";
  }

  /* greeting on home hero */
  function greet() {
    const slot = document.getElementById("heroGreet");
    if (!slot) return;
    const h = new Date().getHours();
    const part = h < 5 ? "Late night session" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : h < 21 ? "Good evening" : "Night owl mode";
    slot.textContent = part;
  }

  /* weekly goal ring (home bento, if mount exists) */
  function weekRing() {
    const mount = document.getElementById("weekGoal");
    if (!mount) return;
    const d = load();
    const got = d.week[weekKey()] || 0;
    const pct = Math.min(100, Math.round(got / WEEKLY_TARGET * 100));
    const C = 2 * Math.PI * 21;
    mount.innerHTML = `
      <div class="week-ring-wrap">
        <svg class="ring" width="64" height="64" viewBox="0 0 54 54">
          <circle class="ring-track" cx="27" cy="27" r="21"/>
          <circle class="ring-fill" cx="27" cy="27" r="21"
            style="stroke:var(--accent);stroke-dasharray:${C};stroke-dashoffset:${C};transition:stroke-dashoffset 1s cubic-bezier(.22,1,.36,1);"/>
          <text x="50%" y="50%" class="ring-num" dominant-baseline="central" text-anchor="middle" style="font-size:11px;">${pct}%</text>
        </svg>
        <div>
          <div class="week-num">${got}<span> / ${WEEKLY_TARGET} XP</span></div>
          <div class="week-lbl">this week's study goal</div>
        </div>
      </div>`;
    requestAnimationFrame(() => {
      const f = mount.querySelector(".ring-fill");
      if (f) f.style.strokeDashoffset = C * (1 - pct / 100);
    });
  }

  /* progress watcher: poll localStorage progress and award XP
     for NEW passes / reads. Robust across load orders — no
     monkey-patching of shared functions needed. */
  let baseline = null;

  function snapshot() {
    try { return JSON.stringify(loadProgress()); } catch (e) { return "{}"; }
  }

  function diffAndAward(prevJSON, nextJSON) {
    let prev = {}, next = {};
    try { prev = JSON.parse(prevJSON) || {}; next = JSON.parse(nextJSON) || {}; } catch (e) { return; }
    SUBJECTS.forEach(s => {
      const ps = prev[s.id] || { readTopics: {}, quizScores: {} };
      const ns = next[s.id] || { readTopics: {}, quizScores: {} };
      s.topics.forEach(t => {
        /* newly read */
        if (!ps.readTopics[t.id] && ns.readTopics[t.id]) addXP(15, "topic reviewed");
        /* newly passed or improved */
        const pq = ps.quizScores[t.id], nq = ns.quizScores[t.id];
        if (nq && t.quiz && t.quiz.length) {
          const pPassed = pq && pq.score / pq.total >= 0.6;
          const nPassed = nq.score / nq.total >= 0.6;
          const improved = !pq || nq.score > pq.score;
          if (nPassed && !pPassed) {
            const pct = nq.score / nq.total;
            addXP(Math.round(pct * 50) + 25 + (pct === 1 ? 25 : 0), pct === 1 ? "perfect score" : "test passed");
          } else if (nPassed && improved) {
            addXP(10, "best score improved");
          }
        }
      });
    });
  }

  function watch() {
    baseline = snapshot();
    /* storage events fire for OTHER tabs; same-tab needs polling */
    setInterval(() => {
      const now = snapshot();
      if (now !== baseline) {
        diffAndAward(baseline, now);
        baseline = now;
        paintChip();
        weekRing();
      }
    }, 1200);
    window.addEventListener("storage", (e) => {
      if (e.key === STORE_KEY) { baseline = snapshot(); paintChip(); weekRing(); }
    });
  }

  function init() {
    greet();
    paintChip();
    weekRing();
    watch();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.LPX = { add: addXP, level: () => levelFor(load().total), weeklyTarget: WEEKLY_TARGET };
})();
