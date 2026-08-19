/* ============================================================
   LEARNING PORT — dashboard.js (index.html)
   "Dock Map" — per-subject SVG progress rings, study streak,
   overall completion and a smart "next up" card.
   ============================================================ */

(function(){
  "use strict";

  function svgRing(pct, color, size){
    const r = size/2 - 8;
    const c = 2*Math.PI*r;
    return `
      <svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${Math.round(pct)}% complete">
        <circle class="ring-track" cx="${size/2}" cy="${size/2}" r="${r}"/>
        <circle class="ring-fill" cx="${size/2}" cy="${size/2}" r="${r}"
                data-circ="${c}" data-pct="${Math.round(pct)}"
                style="stroke:${color};stroke-dasharray:${c};stroke-dashoffset:${c}"/>
        <text x="50%" y="50%" class="ring-num" dominant-baseline="central" text-anchor="middle">0%</text>
      </svg>`;
  }

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

  function animateRings(){
    if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      document.querySelectorAll(".ring-fill").forEach(c=>{
        const c2 = parseFloat(c.getAttribute("data-circ"));
        const pct = parseFloat(c.dataset.pct || "0");
        c.style.transition = "none";
        c.style.strokeDashoffset = c2*(1 - pct/100);
        c.parentNode.querySelector(".ring-num").textContent = Math.round(pct) + "%";
      });
      return;
    }
    document.querySelectorAll(".ring-fill").forEach((c, i)=>{
      const c2 = parseFloat(c.getAttribute("data-circ"));
      const pct = parseFloat(c.dataset.pct || "0");
      const num = c.parentNode.querySelector(".ring-num");
      const start = performance.now();
      const dur = 1100;
      if(window.anime){
        const obj = { v: 0 };
        window.anime({
          targets: obj,
          v: pct,
          duration: dur,
          delay: i*140,
          easing: "easeOutExpo",
          update: function(){
            c.style.strokeDashoffset = c2*(1 - obj.v/100);
            num.textContent = Math.round(obj.v) + "%";
          }
        });
        return;
      }
      (function tick(now){
        const t = Math.min(1, (now - start)/dur);
        const v = pct*(1 - Math.pow(2, -10*t));
        c.style.strokeDashoffset = c2*(1 - v/100);
        num.textContent = Math.round(v) + "%";
        if(t < 1) requestAnimationFrame(tick);
      })(start);
    });
  }

  function buildStreak(){
    const host = document.getElementById("dockStreak");
    if(!host) return;
    const s = getStreak();
    const today = dayKey(new Date());
    const activeToday = s.last === today;
    const totalUnique = Object.keys(s.days || {}).length;
    host.innerHTML = `
      <div class="streak">
        <div class="streak-flame ${activeToday ? "lit" : "dim"}">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4.5 13.5H11L9.5 22 19 9.5h-6.5z"/></svg>
        </div>
        <div class="streak-body">
          <div class="streak-count">${s.count}<span>day streak</span></div>
          <div class="streak-meta">${activeToday ? "Studying today" : "Away since " + s.last + " — one session reignites it"}${totalUnique>1 ? " · "+totalUnique+" active days logged" : ""}</div>
        </div>
      </div>
    `;
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
      `  }

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

  /* ---------------- activity heatmap (last 14 weeks) ---------------- */
    async function buildHeatmap(){
      const host = document.getElementById("dockHeatmap");
      if(!host) return;

      const today = new Date();
      const todayKey = dayKey(today);
      const totalW = 14;

      /* Build dates, oldest -> newest, Monday-based columns */
      const colAlign = (()=>{ const d = new Date(today); d.setDate(d.getDate() - ((d.getDay()+6)%7)); return d; })();
      const dates = [];
      for(let w=0; w<totalW; w++){
        const colStart = new Date(colAlign);
        colStart.setDate(colAlign.getDate() - (totalW-1-w)*7);
        for(let dow=0; dow<7; dow++){
          const d = new Date(colStart);
          d.setDate(colStart.getDate()+dow);
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

      const levels = dates.map(d=>{
        const k = dayKey(d);
        const mins = parseFloat(focus[k])||0;
        let lvl = 0;
        if(mins > 0) lvl = mins >= 45 ? 4 : mins >= 20 ? 3 : mins >= 8 ? 2 : 1;
        else if(streak.days && streak.days[k]) lvl = 1;
        return { k, d, mins, lvl, today: k===todayKey };
      });

      const totalMins = Object.keys(focus).reduce((a,k)=>a+(parseFloat(focus[k])||0),0);
      const currentStreak = (()=>{ let c=0; for(let i=dates.length-1;i>=0;i--){ if(levels[i].lvl >= 1){ c++; } else break; } return c; })();

      let cells = "";
      levels.forEach(o=>{
        cells += `<i class="hm-cell hm-${o.lvl}${o.today?" today":""}" title="${o.k}: ${o.mins>0?Math.round(o.mins)+" min "+ (o.lvl>1?"focused":"visited") : "no activity"}"></i>`;
      });

      host.innerHTML = `
        <div class="heatmap-head">
          <span class="heatmap-title">Study activity — last ${totalW} weeks</span>
          <span class="heatmap-total">${formatMin(totalMins)} total · ${currentStreak} days active loop</span>
        </div>
        <div class="heatmap-body">
          <div class="hm-labels">${["M","T","W","T","F","S","S"].map((l,i)=>`<span style="top:${(i*12)+4}px">${l}</span>`).join("")}</div>
          <div class="hm-scroll"><div class="hm-cols">${cells}</div></div>
        </div>
        <div class="heatmap-legend">
          <span>Less</span>
          ${[0,1,2,3,4].map(l=>`<i class="hm-cell hm-${l}"></i>`).join("")}
          <span>More</span>
        </div>
      `;
    }
  function formatMin(m){
    return m >= 60 ? (Math.round(m/60*10)/10+"h") : Math.round(m)+"m";
  }

  document.addEventListener("DOMContentLoaded", async ()=>{
    await buildOverall();
    await buildRings();
    buildStreak();
    await buildNext();
    buildHeatmap();
    document.addEventListener("lp:focus-change", buildHeatmap);
    // delay ring animation until section is in view
    const sec = document.getElementById("dockMap");
    if(sec){
      try{
        const io = new IntersectionObserver((entries)=>{
          entries.forEach(en=>{ if(en.isIntersecting){ animateRings(); io.disconnect(); } });
        }, { threshold: 0.2 });
        io.observe(sec);
      }catch(e){ animateRings(); }
    }else{
      animateRings();
    }
  });

})();