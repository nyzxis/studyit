/* ============================================================
   LEARNING PORT — achievements.js
   12 milestone badges tied to progress, streaks, focus time and
   quiz mastery. New unlocks slide in as toast cards (top-right),
   plus a trophy-case grid rendered on the home Dock Map.
   ============================================================ */

(function(){
  "use strict";

  const KEY = "learningPortBadges.v1";

  const BADGES = [
    { id:"first-visit",   name:"Ears to the Deck",   hint:"Open Learning Port once",            icon:ico("anchor"), tier:1 },
    { id:"first-read",    name:"First Slot Plugged", hint:"Read your first topic",              icon:ico("book"), tier:1 },
    { id:"read-5",        name:"Marathon Reader",    hint:"Review 5 topics",                    icon:ico("books"), tier:2 },
    { id:"quiz-pass",     name:"First Port Green",   hint:"Pass a self-test at 60%+",           icon:ico("check"), tier:1 },
    { id:"quiz-perfect",  name:"Perfect Dock",       hint:"Score 100% on any self-test",        icon:ico("star"), tier:3 },
    { id:"streak-3",      name:"Three-Day Current",  hint:"Study 3 days in a row",              icon:ico("flame"), tier:2 },
    { id:"streak-7",      name:"Week-Long Hum",      hint:"Study 7 days in a row",              icon:ico("waves"), tier:3 },
    { id:"subject-clear", name:"Harbor Master",      hint:"Complete every topic in a subject",  icon:ico("ship"), tier:3 },
    { id:"all-clear",     name:"Full Dock",          hint:"Connect every topic",                icon:ico("crown"), tier:4 },
    { id:"focus-30",      name:"Deep Focus",         hint:"Log 30 min of study time",           icon:ico("clock"), tier:2 },
    { id:"focus-120",     name:"Zen Dock",           hint:"Log 2 hours of study time",          icon:ico("lotus"), tier:3 },
    { id:"quiz-60-plus",  name:"Six-Form Fluency",   hint:"Answer 60+ quiz questions",          icon:ico("target"), tier:2 }
  ];

  function ico(kind){
    const p = {
      anchor:'<path d="M12 2v20M12 5a4 4 0 0 0-4 4M12 5a4 4 0 0 1 4 4M6 14h12M5 9v2a6 6 0 0 0 12 0V9"/>',
      book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
      books:'<path d="M4 5h11a2 2 0 0 1 2 2v13H6a2 2 0 0 1-2-2z"/><path d="M17 8h3a2 2 0 0 1 2 2v12h-5z"/>',
      check:'<path d="M20 6L9 17l-5-5"/>',
      star:'<path d="M12 2l2.9 6.2 6.9.8-5 4.6 1.3 6.8L12 17.2 5.9 20.4 7.2 13.6l-5-4.6 6.9-.8z"/>',
      flame:'<path d="M12 2c1 4-4 6-4 11a4 4 0 0 0 8 0c0-2-1-3-1-3s4 1 4 5a7 7 0 0 1-14 0C5 10 9 8 12 2z"/>',
      waves:'<path d="M2 7c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
      ship:'<path d="M2 10l10 4 10-4-3-6H5z"/><path d="M4 14l-2 6h20l-2-6M12 6V2M9 2h6"/>',
      crown:'<path d="M2 7l5 4 5-6 5 6 5-4v9H2z"/><path d="M2 18h20"/>',
      clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
      lotus:'<path d="M12 21c-3-2-5-5-5-9a7 7 0 0 1 5-5c3 0 5 2 5 5s-2 7-5 9z"/><path d="M12 7c3-2 6-2 8 0-1 3-4 4-8 4M12 7c-3-2-6-2-8 0 1 3 4 4 8 4"/>',
      target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>'
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (p[kind]||p.star) + '</svg>';
  }

  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)) || { seen:{} }; }catch(e){ return { seen:{} }; } }
  function save(s){ localStorage.setItem(KEY, JSON.stringify(s)); }

  async function countRead(){
    let n = 0;
    for (const s of SUBJECTS) {
      for (const t of s.topics) {
        if (await topicIsRead(s.id, t.id)) n++;
      }
    }
    return n;
  }

  async function countQuestionsAnswered(){
    /* best scores are the only durable record; treat each stored best score as full quiz attempts */
    let n = 0;
    for (const s of SUBJECTS) {
      for (const t of s.topics) {
        const q = await bestQuizScore(s.id, t.id);
        if (q) n += q.total;
      }
    }
    return n;
  }

  async function focusMinutes(){
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

  /* returns array of badge ids that are currently earned */
  async function evaluate(){
    const readN = await countRead();
    const qAnswered = await countQuestionsAnswered();
    const focusMin = await focusMinutes();

    // Compute quizzesPassed manually (overallStats is async; avoid double work)
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

  function toast(badge){
    let shell = document.getElementById("badgeToast-shell");
    if(!shell){
      shell = document.createElement("div");
      shell.id = "badgeToast-shell";
      document.body.appendChild(shell);
    }
    const t = document.createElement("div");
    t.className = "badge-toast";
    t.innerHTML = `<span class="badge-toast-ico">${badge.icon}</span><span class="badge-toast-body"><b>Badge unlocked!</b><em>${esc(badge.name)}</em></span>`;
    shell.appendChild(t);
    requestAnimationFrame(()=> t.classList.add("show"));
    if(window.LPSnd) window.LPSnd.play("unlock");
    setTimeout(()=>{
      t.classList.remove("show");
      setTimeout(()=> t.remove(), 400);
    }, 3400);
  }

  /* returns the global list + render the trophy tray */
  async function render(id){
    const ids = await evaluate();
    const seen = load().seen;
    const host = document.getElementById(id);
    if(!host){
      /* new unlocks still toast even if no tray is on this page */
      ids.forEach(bid=>{
        if(!seen[bid]){ seen[bid] = 1; save({seen}); toast(BADGES.find(b=>b.id===bid)); }
      });
      return ids;
    }
    host.innerHTML = "";
    for (const b of BADGES) {
      const on = ids.indexOf(b.id) !== -1;
      if (on && !seen[b.id]) {
        seen[b.id] = 1;
        save({seen});
        // Save to Supabase
        if (window.LPSupabase) {
          try {
            const user = await window.LPSupabase.getUser();
            if (user) await window.LPSupabase.saveBadge(b.id);
          } catch (e) { /* ignore */ }
        }
        setTimeout(()=> toast(b), 250);
      }
      const card = el("div","badge-card"+(on?" earned":" locked"));
      card.innerHTML = `
        <div class="badge-ico">${b.icon}</div>
        <div class="badge-name">${esc(b.name)}</div>
        <div class="badge-hint">${on ? esc(b.hint) : "Locked · " + esc(b.hint)}</div>
      `;
      host.appendChild(card);
    }
    return ids;
  }

  document.addEventListener("DOMContentLoaded", async ()=>{
    await render(document.getElementById("badgeTray") ? "badgeTray" : null);
  });

  window.LPBadges = {
    evaluate,
    render,
    recheck: async function(){ await render(document.getElementById("badgeTray") ? "badgeTray" : null); }
  };

})();