/* ============================================================
   LEARNING PORT — shared helpers (used by every page)
   ============================================================ */

const STORE_KEY = "learningPortProgress.v1";

function loadProgress(){
  try{ return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch(e){ return {}; }
}
function saveProgress(p){ localStorage.setItem(STORE_KEY, JSON.stringify(p)); }
let progress = loadProgress();

function ensureSubjectProgress(subjectId){
  if(!progress[subjectId]) progress[subjectId] = { readTopics:{}, quizScores:{} };
  return progress[subjectId];
}
function topicIsRead(subjectId, topicId){
  return !!ensureSubjectProgress(subjectId).readTopics[topicId];
}
function toggleTopicRead(subjectId, topicId){
  const sp = ensureSubjectProgress(subjectId);
  sp.readTopics[topicId] = !sp.readTopics[topicId];
  saveProgress(progress);
}
function bestQuizScore(subjectId, topicId){
  return ensureSubjectProgress(subjectId).quizScores[topicId];
}
function recordQuizScore(subjectId, topicId, score, total){
  const sp = ensureSubjectProgress(subjectId);
  const prev = sp.quizScores[topicId];
  if(!prev || score > prev.score) sp.quizScores[topicId] = { score, total };
  saveProgress(progress);
}
function subjectCompletion(subject){
  const sp = ensureSubjectProgress(subject.id);
  const total = subject.topics.length;
  let done = 0;
  subject.topics.forEach(t=>{
    const read = !!sp.readTopics[t.id];
    const quiz = sp.quizScores[t.id];
    const passed = quiz && quiz.score/quiz.total >= 0.6;
    const hasQuiz = !!(t.quiz && t.quiz.length);
    if(read && (!hasQuiz || passed)) done++;
  });
  return { done, total };
}

/* ---------------- overall stats + streak ---------------- */
function overallStats(){
  let done = 0, total = 0, quizzesPassed = 0, quizTotal = 0;
  SUBJECTS.forEach(s=>{
    const c = subjectCompletion(s);
    done += c.done; total += c.total;
    s.topics.forEach(t=>{
      if(t.quiz && t.quiz.length){
        quizTotal++;
        const q = bestQuizScore(s.id, t.id);
        if(q && q.score/q.total >= 0.6) quizzesPassed++;
      }
    });
  });
  return { done, total, quizzesPassed, quizTotal };
}

/* ---------------- question counts per subject ---------------- */
function questionsBySubject(){
  const counts = {};
  let total = 0;
  SUBJECTS.forEach(s=>{
    let n = 0;
    s.topics.forEach(t=>{ if(t.quiz && t.quiz.length) n += t.quiz.length; });
    counts[s.id] = n;
    total += n;
  });
  counts.total = total;
  return counts;
}
function subjectQuestionCount(subjectId){
  return (questionsBySubject())[subjectId] || 0;
}

/* study streak: count of consecutive days the site was opened */
const STREAK_KEY = "learningPortStreak.v1";
function dayKey(d){ return d.toISOString().slice(0,10); }
function loadStreak(){
  try{ return JSON.parse(localStorage.getItem(STREAK_KEY)) || { last:null, count:0, days:{} }; }
  catch(e){ return { last:null, count:0, days:{} }; }
}
function recordVisit(){
  const s = loadStreak();
  const today = dayKey(new Date());
  if(s.last !== today){
    const y = new Date(); y.setDate(y.getDate()-1);
    const yesterday = dayKey(y);
    s.count = (s.last === yesterday) ? s.count + 1 : 1;
    s.last = today;
    s.days[today] = true;
    localStorage.setItem(STREAK_KEY, JSON.stringify(s));
  }
  return s;
}
function getStreak(){ return loadStreak(); }

/* smart "next up" topic: first unread topic without a passing quiz */
function nextUpTopic(){
  for(let si=0; si<SUBJECTS.length; si++){
    const s = SUBJECTS[si];
    for(let ti=0; ti<s.topics.length; ti++){
      const t = s.topics[ti];
      const quiz = bestQuizScore(s.id, t.id);
      const passed = quiz && quiz.score/quiz.total >= 0.6;
      if(!topicIsRead(s.id, t.id) || (t.quiz && t.quiz.length && !passed)){
        return { subject:s, topic:t };
      }
    }
  }
  return null;
}

/* ---------------- DOM helpers ---------------- */
function el(tag, cls, html){
  const e = document.createElement(tag);
  if(cls) e.className = cls;
  if(html !== undefined) e.innerHTML = html;
  return e;
}
function esc(str){
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
function getParam(name){
  return new URLSearchParams(window.location.search).get(name);
}

function renderTable(t){
  const table = el("table","data-table");
  let html = `<caption>${esc(t.caption)}</caption><thead><tr>`;
  t.headers.forEach(h=> html += `<th>${esc(h)}</th>`);
  html += "</tr></thead><tbody>";
  t.rows.forEach(r=>{ html += "<tr>" + r.map(c=>`<td>${esc(c)}</td>`).join("") + "</tr>"; });
  html += "</tbody>";
  table.innerHTML = html;
  return table;
}

/* ---------------- toast ---------------- */
let toastTimer = null;
function showToast(msg){
  const t = document.getElementById("toast");
  if(!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove("show"), 2600);
}

/* ---------------- shared header/footer chrome ---------------- */
function paintHeaderChrome(){
  const logoSlot = document.querySelectorAll(".js-logo");
  logoSlot.forEach(s=> s.innerHTML = LOGO_SVG);

  let done = 0, total = 0;
  SUBJECTS.forEach(s=>{ const c = subjectCompletion(s); done += c.done; total += c.total; });
  const chip = document.getElementById("headerProgress");
  if(chip) chip.innerHTML = `<span class="led ${done>0 ? "on":""}"></span> ${done}/${total} topics connected`;

  const yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", paintHeaderChrome);

/* record a visit for the streak (fire once per browser session) */
(function(){
  const flag = "lp_visit_" + dayKey(new Date());
  if(!sessionStorage.getItem(flag)){
    sessionStorage.setItem(flag, "1");
    recordVisit();
  }
})();

/* ---------------- theme (light / dark) ---------------- */
const THEME_KEY = "learningPortTheme";
document.documentElement.setAttribute("data-theme", localStorage.getItem(THEME_KEY) || "light");

function currentTheme(){
  return document.documentElement.getAttribute("data-theme") || "light";
}
function themeBtnHTML(){
  const m = currentTheme();
  const moon = m === "light";
  return '<span class="tt-pill"><span class="tt-dot"></span></span>'
       + '<span class="tt-ic" aria-hidden="true">' + (moon ? "☾" : "☀") + '</span>'
       + '<span class="tt-lbl">' + (moon ? "Light" : "Dark") + '</span>';
}
function syncThemeBtn(){
  const b = document.getElementById("themeToggle");
  if(b) b.innerHTML = themeBtnHTML();
}
function syncThemeColor(){
  const m = document.querySelector('meta[name="theme-color"]');
  if(m) m.setAttribute("content", currentTheme() === "dark" ? "#161615" : "#F7F6F3");
}
function toggleTheme(){
  const h = document.documentElement;
  const next = currentTheme() === "dark" ? "light" : "dark";

  function apply(){
    h.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
    syncThemeBtn();
    syncThemeColor();
  }

  /* circular reveal via View Transitions API (Chrome/Edge/Safari 18+) */
  if(document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    /* get toggle button center as the reveal origin */
    const btn = document.getElementById("themeToggle");
    const r = btn ? btn.getBoundingClientRect() : null;
    const x = r ? r.left + r.width / 2 : window.innerWidth / 2;
    const y = r ? r.top + r.height / 2 : 0;

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    /* stash origin for the ::view-transition CSS */
    h.style.setProperty("--ttx", x + "px");
    h.style.setProperty("--tty", y + "px");
    h.style.setProperty("--ttr", radius + "px");

    const vt = document.startViewTransition(apply);
    vt.ready.then(()=>{
      h.classList.add("theme-anim");
    }).finally(()=>{
      vt.finished.finally(()=> h.classList.remove("theme-anim"));
    });
    return;
  }

  /* fallback: smooth crossfade — transition ALL theme-dependent properties */
  h.classList.add("theming");
  // Force a reflow to ensure the transition kicks in
  h.offsetHeight;
  // Reset timeout so we don't stack if toggle is clicked rapidly
  clearTimeout(h._themeT);
  h._themeT = setTimeout(function(){ h.classList.remove("theming"); }, 720);
  apply();
}

/* ---------------- page loader (show on internal navigation) ---------------- */
function createPageLoader(){
  const loader = document.createElement("div");
  loader.id = "pageLoader";
  loader.className = "page-loader";
  loader.setAttribute("aria-busy", "true");
  loader.setAttribute("aria-label", "Loading page");
  loader.innerHTML = `
    <div class="loader-inner">
      <div class="loader-harbor">
        <div class="loader-water">
          <div class="loader-wave"></div>
          <div class="loader-wave"></div>
          <div class="loader-wave"></div>
        </div>
        <div class="loader-dock">
          <div class="loader-piling"></div>
          <div class="loader-piling"></div>
          <div class="loader-piling"></div>
        </div>
        <div class="loader-ship">
          <div class="loader-hull"></div>
          <div class="loader-deck"></div>
          <div class="loader-mast"></div>
          <div class="loader-sail"></div>
        </div>
      </div>
      <div class="loader-text">LEARNING PORT</div>
      <div class="loader-progress"><i></i></div>
    </div>`;
  document.body.appendChild(loader);
  return loader;
}

function showPageLoader(){
  let loader = document.getElementById("pageLoader");
  if(!loader) loader = createPageLoader();
  loader.style.display = "flex";
  // Trigger animation
  requestAnimationFrame(() => loader.classList.add("active"));
}
function hidePageLoader(){
  const loader = document.getElementById("pageLoader");
  if(loader){
    loader.classList.remove("active");
    setTimeout(() => { loader.style.display = "none"; }, 420);
  }
}

/* show loader on click of internal links; hide after new page loads */
document.addEventListener("click", function(e){
  const link = e.target.closest("a");
  if(!link || link.target || link.href.startsWith("http") || link.href.startsWith("#")) return;
  if(link.hostname && link.hostname !== window.location.hostname) return;

  const isInternal = link.href.includes("subject.html")
                  || link.href.includes("topic.html")
                  || link.href.includes("quiz.html")
                  || link.href === "index.html"
                  || link.href === "";
  if(!isInternal) return;

  e.preventDefault();
  showPageLoader();
  // Navigate after a short delay so the loader flashes visible
  setTimeout(() => { window.location.href = link.href; }, 120);
});

window.addEventListener("pageshow", function(e){
  // Hide loader after page becomes visible (covers both fresh load & cache restore)
  hidePageLoader();
});

/* also hide loader on DOMContentLoaded of any page (safety net) */
document.addEventListener("DOMContentLoaded", hidePageLoader);

/* ---------------- shared chrome: theme toggle + XP chip + sound + back-to-top ---------------- */
document.addEventListener("DOMContentLoaded", ()=>{
  const row = document.querySelector(".nav-row");
  const chip = document.getElementById("headerProgress");

  if(row && !document.getElementById("themeToggle")){
    const tb = el("button","theme-toggle");
    tb.id = "themeToggle";
    tb.type = "button";
    tb.title = "Toggle light/dark mode (T)";
    tb.setAttribute("aria-label","Toggle light/dark mode");
    tb.innerHTML = themeBtnHTML();
    tb.addEventListener("click", toggleTheme);
    if(chip) row.insertBefore(tb, chip);
    else row.appendChild(tb);
  }

  /* XP chip — filled by smart.js */
  if(row && !document.getElementById("xpChip")){
    const xp = el("span","xp-chip");
    xp.id = "xpChip";
    if(chip) row.insertBefore(xp, chip);
    else row.appendChild(xp);
  }

  /* sound toggle */
  if(row && !document.getElementById("sndToggle")){
    const sb = el("button","snd-toggle");
    sb.id = "sndToggle";
    sb.type = "button";
    sb.title = "Toggle sounds";
    sb.setAttribute("aria-label","Toggle sounds");
    function paintSnd(){
      const m = window.LPSnd && window.LPSnd.muted;
      sb.textContent = m ? "○" : "◉";
      sb.classList.toggle("muted", !!m);
    }
    sb.addEventListener("click", ()=>{
      if(window.LPSnd){ window.LPSnd.toggle(); paintSnd(); if(!window.LPSnd.muted) window.LPSnd.play("click"); }
    });
    if(chip) row.insertBefore(sb, chip);
    else row.appendChild(sb);
    paintSnd();
    /* LPSnd loads after common.js on some pages — repaint once DOM settles */
    setTimeout(paintSnd, 400);
  }

  if(!document.querySelector(".back-to-top")){
    const b = el("button","back-to-top");
    b.type = "button";
    b.title = "Back to top";
    b.setAttribute("aria-label","Back to top");
    b.innerHTML = "↑";
    b.addEventListener("click", ()=> window.scrollTo({ top:0, behavior:"smooth" }));
    document.body.appendChild(b);
    window.addEventListener("scroll", ()=>{
      b.classList.toggle("show", window.scrollY > 500);
    }, { passive:true });
    b.classList.toggle("show", window.scrollY > 500);
  }
});
