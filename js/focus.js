/* ============================================================
   LEARNING PORT — focus.js
   Floating "study clock" widget. Start/Stop a focus session;
   every completed minute lands in localStorage per day and is
   rolled into badges + the home heatmap.
   ============================================================ */

(function(){
  "use strict";

  const KEY = "learningPortFocus.v1";
  const TICK = 1000;

  let shell = null, running = false, secs = 0, raf = null, last = null;

  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)) || {}; }catch(e){ return {}; } }
  function save(d){ localStorage.setItem(KEY, JSON.stringify(d)); }
  function today(){ return dayKey(new Date()); }

  function minutesOn(dateStr){
    const d = load();
    const min = Math.floor((parseFloat(d[dateStr])||0) * 10 + 0.5)/10;
    return min;
  }
  function addFocus(extraSecs){
    const d = load();
    const t = today();
    d[t] = (parseFloat(d[t])||0) + extraSecs/60;
    save(d);
  }

  function fmt(ts){
    const m = Math.floor(ts/60);
    const s = ts%60;
    return (m<10?"0":"")+m+":"+(s<10?"0":"")+s;
  }

  function paintTimer(el){
    el.textContent = fmt(secs);
  }

  function build(){
    shell = document.createElement("div");
    shell.className = "focus-widget" + (running ? " running" : "");
    shell.innerHTML = `
      <button class="focus-toggle" type="button" aria-label="Toggle study timer">
        <svg class="focus-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        <svg class="focus-pause" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>
      </button>
      <span class="focus-time">00:00</span>
      <span class="focus-today"></span>
    `;
    document.body.appendChild(shell);

    shell.querySelector(".focus-toggle").addEventListener("click", toggle);

    setInterval(()=>{
      const el = shell.querySelector(".focus-today");
      if(el) el.textContent = minutesOn(today()) + " min today";
    }, 5000);

    function toggle(){
      running ? stop() : start();
    }

    function start(){
      running = true;
      shell.classList.add("running");
      last = Date.now() - secs*1000;
      if(window.LPSnd) window.LPSnd.play("start");
      if(raf){ cancelAnimationFrame(raf); raf = null; }
      const t0 = Date.now();
      (function tick(){
        secs = Math.floor((Date.now() - last)/1000);
        paintTimer(shell.querySelector(".focus-time"));
        raf = requestAnimationFrame(tick);
      })();
    }
    function stop(){
      running = false;
      shell.classList.remove("running");
      if(raf){ cancelAnimationFrame(raf); raf = null; }
      if(secs >= 5){
        addFocus(secs);
        if(window.LPSnd) window.LPSnd.play("stop");
        const tid = Math.min(parseInt(minutesOn(today()),10) + Math.floor(secs/60), 999);
        shell.querySelector(".focus-today").textContent = tid + " min today";
        if(window.LPBadges) setTimeout(()=> window.LPBadges.recheck(), 400);
        if(window.__LPRefreshHeatmap) setTimeout(()=> window.__LPRefreshHeatmap(), 500);
      }
      secs = 0;
      paintTimer(shell.querySelector(".focus-time"));
    }
    window.__focusStop = stop;
    window.__focusMinutesOn = minutesOn;
  }

  /* hover tick on the toggle (subtle) */
  document.addEventListener("DOMContentLoaded", ()=>{
    if(!document.querySelector(".focus-widget")) build();
    const todayEl = shell && shell.querySelector(".focus-today");
    if(todayEl && !running) todayEl.textContent = minutesOn(today()) + " min today";

    /* expose a global refresh used by dashboard heatmap */
    window.__LPRefreshHeatmap = function(){
      const ev = new CustomEvent("lp:focus-change");
      document.dispatchEvent(ev);
    };
  });

})();