/* ============================================================
   LEARNING PORT — spotlight.js
   Cursor-tracked glow on cards, GPU-safe tilt, animated
   counters. Fine pointers only; reduced-motion aware.
   ============================================================ */

(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- cursor spotlight: sets --mx/--my per card ---------- */
  function spotlight() {
    if (!finePointer || reduced) return;
    let raf = null;
    document.addEventListener("mousemove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const card = el && el.closest ? el.closest(".spot, .subject-card, .feature-card, .topic-card, .dock-panel, .bento-card") : null;
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(2) + "%");
          card.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(2) + "%");
          card.classList.add("spot-on");
        }
      });
    }, { passive: true });
  }

  /* ---------- animated counters: numbers roll up when visible ---------- */
  function counters() {
    if (reduced) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        const el = en.target;
        const target = parseInt(el.textContent.trim(), 10);
        if (isNaN(target)) return;
        const start = performance.now();
        const dur = 900;
        (function tick(now) {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased);
          if (t < 1) requestAnimationFrame(tick);
        })(start);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".readout-num, .count-up").forEach(el => io.observe(el));
  }

  /* ---------- press feedback: buttons dip on pointerdown ---------- */
  function press() {
    document.addEventListener("pointerdown", (e) => {
      const b = e.target.closest && e.target.closest(".btn, .mark-done, .sg-tab, .pomo-btn");
      if (!b) return;
      b.animate(
        [{ transform: "scale(1)" }, { transform: "scale(0.96)" }, { transform: "scale(1)" }],
        { duration: 260, easing: "cubic-bezier(0.32, 0.72, 0, 1)" }
      );
    }, { passive: true });
  }

  function init() { spotlight(); counters(); press(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
