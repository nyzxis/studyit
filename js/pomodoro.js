/* ============================================================
   LEARNING PORT — Pomodoro focus island
   25/5/15 rhythm, session dots, collapsible floating widget.
   State persists in localStorage. Zero dependencies.
   ============================================================ */

(function () {
  "use strict";

  const POMO_KEY = "learningPortPomo.v1";
  const MODES = {
    focus: { label: "Focus", secs: 25 * 60 },
    short: { label: "Break", secs: 5 * 60 },
    long:  { label: "Long break", secs: 15 * 60 }
  };

  const defaults = () => ({
    mode: "focus",
    remaining: MODES.focus.secs,
    running: false,
    endsAt: null,
    sessions: 0,          // completed focus sessions (mod 4 for dots)
    open: false
  });

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(POMO_KEY));
      if (!raw) return defaults();
      const s = Object.assign(defaults(), raw);
      // if it was running when we left, catch up
      if (s.running && s.endsAt) {
        const left = Math.round((s.endsAt - Date.now()) / 1000);
        if (left > 0) s.remaining = left;
        else { s.remaining = 0; s.running = false; s.endsAt = null; }
      }
      return s;
    } catch (e) { return defaults(); }
  }
  function save() { localStorage.setItem(POMO_KEY, JSON.stringify(state)); }

  let state = load();
  let tick = null;

  /* ---------------- DOM ---------------- */
  function controlsHTML(prefix) {
    return `
      <div class="pomo-time" id="${prefix}Time">25:00</div>
      <div class="pomo-mode" id="${prefix}Mode">focus</div>
      <div class="pomo-modes">
        <button type="button" class="pomo-mode-btn" data-mode="focus">25m</button>
        <button type="button" class="pomo-mode-btn" data-mode="short">5m</button>
        <button type="button" class="pomo-mode-btn" data-mode="long">15m</button>
      </div>
      <div class="pomo-actions">
        <button type="button" class="pomo-btn main" id="${prefix}Start">Start</button>
        <button type="button" class="pomo-btn sub" id="${prefix}Reset">Reset</button>
      </div>
      <div class="pomo-sessions" id="${prefix}Sessions"><span></span><span></span><span></span><span></span></div>`;
  }

  function wireControls(scope, prefix) {
    scope.querySelector("#" + prefix + "Start").addEventListener("click", (e) => { e.stopPropagation(); toggleRun(); });
    scope.querySelector("#" + prefix + "Reset").addEventListener("click", (e) => { e.stopPropagation(); reset(); });
    scope.querySelectorAll(".pomo-mode-btn").forEach(b =>
      b.addEventListener("click", (e) => { e.stopPropagation(); setMode(b.dataset.mode); })
    );
  }

  function build() {
    /* floating island */
    if (!document.getElementById("pomo")) {
      const root = document.createElement("div");
      root.className = "pomo" + (state.open ? " open" : "");
      root.id = "pomo";
      root.setAttribute("data-state", state.mode === "focus" ? "focus" : "break");
      root.innerHTML = `
        <div class="pomo-head" id="pomoHead">
          <div class="pomo-title"><span class="pomo-dot"></span><span id="pomoHeadLabel">Focus timer</span></div>
          <button class="pomo-toggle" type="button" aria-label="Expand timer" id="pomoToggle">▲</button>
        </div>
        <div class="pomo-body">${controlsHTML("pomo")}</div>`;
      document.body.appendChild(root);

      root.querySelector("#pomoHead").addEventListener("click", (e) => {
        if (e.target.closest(".pomo-toggle") || e.target.closest(".pomo-head")) {
          state.open = !state.open;
          root.classList.toggle("open", state.open);
          save();
        }
      });
      wireControls(root, "pomo");
    }

    /* embedded home panel (if the page has a mount point) */
    const mount = document.getElementById("pomoPanel");
    if (mount && !mount.dataset.built) {
      mount.dataset.built = "1";
      mount.innerHTML = controlsHTML("panel");
      wireControls(mount, "panel");
    }
    paint();
  }

  /* ---------------- logic ---------------- */
  function fmt(s) {
    const m = Math.floor(s / 60), r = s % 60;
    return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
  }

  function paint() {
    const startLabel = state.running ? "Pause" : (state.remaining < MODES[state.mode].secs && state.remaining > 0 ? "Resume" : "Start");
    ["pomo", "panel"].forEach(prefix => {
      const t = document.getElementById(prefix + "Time");
      if (!t) return;
      t.textContent = fmt(state.remaining);
      document.getElementById(prefix + "Start").textContent = startLabel;
      document.getElementById(prefix + "Mode").textContent = MODES[state.mode].label.toLowerCase();
      const scope = t.closest(".pomo") || t.closest(".pomo-panel") || document;
      scope.querySelectorAll(".pomo-mode-btn").forEach(b =>
        b.classList.toggle("active", b.dataset.mode === state.mode));
      const dots = document.getElementById(prefix + "Sessions");
      if (dots) [...dots.children].forEach((d, i) =>
        d.classList.toggle("hit", i < (state.sessions % 4)));
    });
    const head = document.getElementById("pomoHeadLabel");
    const root = document.getElementById("pomo");
    if (head) head.textContent = state.running ? MODES[state.mode].label + " · " + fmt(state.remaining) : "Focus timer";
    if (root) root.setAttribute("data-state", state.mode === "focus" ? "focus" : "break");
    document.title = state.running
      ? fmt(state.remaining) + " · " + MODES[state.mode].label + " — Learning Port"
      : (originalTitle || document.title);
  }

  let originalTitle = "";
  document.addEventListener("DOMContentLoaded", () => { originalTitle = document.title; });

  function toggleRun() {
    if (window.LPSnd) window.LPSnd.play(state.running ? "stop" : "start");
    if (state.running) {
      pause();
    } else {
      if (state.remaining <= 0) state.remaining = MODES[state.mode].secs;
      state.running = true;
      state.endsAt = Date.now() + state.remaining * 1000;
      state.open = true;
      const pomoEl = document.getElementById("pomo");
      if (pomoEl) pomoEl.classList.add("open");
      tick = setInterval(step, 500);
    }
    save(); paint();
  }

  function pause() {
    state.running = false;
    state.endsAt = null;
    clearInterval(tick);
    save(); paint();
  }

  function step() {
    state.remaining = Math.max(0, Math.round((state.endsAt - Date.now()) / 1000));
    if (state.remaining <= 0) complete();
    paint();
  }

  function complete() {
    clearInterval(tick);
    state.running = false;
    state.endsAt = null;
    if (state.mode === "focus") {
      state.sessions++;
      if (window.LPX) window.LPX.add(30, "focus session complete");
      if (typeof showToast === "function") showToast("Focus session complete — take a break");
      setMode(state.sessions % 4 === 0 ? "long" : "short", true);
    } else {
      if (typeof showToast === "function") showToast("Break over — back to it");
      setMode("focus", true);
    }
    chime();
    save(); paint();
  }

  function setMode(m, silent) {
    pause();
    state.mode = m;
    state.remaining = MODES[m].secs;
    if (!silent && typeof showToast === "function") showToast(MODES[m].label + " ready");
    save(); paint();
  }

  function reset() {
    pause();
    state.remaining = MODES[state.mode].secs;
    save(); paint();
  }

  /* completion chime — routed through fx.js if available */
  function chime() {
    if (window.LPSnd) { window.LPSnd.play("unlock"); return; }
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = 660;
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.1);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 1.2);
    } catch (e) { /* audio blocked — fine */ }
  }

  document.addEventListener("DOMContentLoaded", build);
})();
