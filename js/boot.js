/* ============================================================
   LEARNING PORT — boot.js
   Premium loading screen: brand mark draws in, progress line,
   then lifts away. Rules:
   - Shows on first visit per session (skips on same-tab nav)
   - Never traps the user: hard cap 1400ms + absolute failsafe
   - Respects prefers-reduced-motion (instant pass-through)
   Load this in <head> so it can cover the page before paint.
   ============================================================ */

(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SEEN = "lp_boot_seen";

  let seen = false;
  try { seen = sessionStorage.getItem(SEEN) === "1"; } catch (e) {}

  if (reduced || seen) return;

  /* 1) cover the page immediately (before first paint) */
  const veil = document.createElement("style");
  veil.id = "bootVeil";
  veil.textContent = "body{opacity:0 !important}";
  (document.head || document.documentElement).appendChild(veil);

  /* 2) absolute failsafe — never leave the page hidden */
  const failsafe = setTimeout(reveal, 1600);

  function reveal() {
    clearTimeout(failsafe);
    veil.remove();
    const b = document.querySelector(".boot");
    if (b) dismiss(b);
  }

  function dismiss(boot) {
    if (!boot || boot._done) return;
    boot._done = true;
    boot.classList.add("lift");
    try { sessionStorage.setItem(SEEN, "1"); } catch (e) {}
    setTimeout(() => boot.remove(), 560);
  }

  function boot() {
    const el = document.createElement("div");
    el.className = "boot";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `
      <div class="boot-inner">
        <div class="boot-mark">
          <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect class="bm-frame" x="1" y="1" width="38" height="38" rx="10"/>
            <path class="bm-p" d="M13 27V13h6.2c3.3 0 5.6 2.1 5.6 5.2s-2.3 5.2-5.6 5.2H16v3.6h-3z"/>
            <circle class="bm-dot" cx="29" cy="12" r="2.4"/>
          </svg>
        </div>
        <div class="boot-word">LEARNING&nbsp;PORT</div>
        <div class="boot-bar"><i></i></div>
      </div>`;
    document.body.appendChild(el);

    /* show page behind the boot card, then lift on load */
    veil.remove();

    document.documentElement.style.overflow = "hidden";
    const release = () => { document.documentElement.style.overflow = ""; };

    const t0 = performance.now();
    let done = false;
    function finish() {
      if (done) return;
      done = true;
      const wait = Math.max(0, 650 - (performance.now() - t0));
      setTimeout(() => { dismiss(el); release(); }, wait);
    }
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    setTimeout(finish, 1400); /* hard cap */
    el.addEventListener("click", finish); /* click to skip */
  }

  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
