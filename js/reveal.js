/* ============================================================
   LEARNING PORT — motion choreography
   IntersectionObserver reveals (GPU-safe: transform/opacity
   only), staggered children, logo spark. Respects
   prefers-reduced-motion. No scroll listeners.
   ============================================================ */

(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    document.querySelectorAll(".rv").forEach(el => el.classList.add("in"));
    return;
  }

  /* ---------- auto-tag reveal targets ---------- */
  function tag() {
    const selectors = [
      ".hero-eyebrow", ".hero-title", ".hero-sub", ".hero-actions",
      ".readout", ".section-head", ".feature-card", ".subject-card",
      ".dock-panel", ".badge", ".topic-card", ".q-card", ".study-games",
      ".topic-hero", ".heatmap-wrap"
    ];
    document.querySelectorAll(selectors.join(",")).forEach(el => {
      if (!el.classList.contains("rv")) el.classList.add("rv");
    });
    /* stagger siblings */
    [".features-grid", ".subjects-grid", ".topic-card-grid", ".trophy-tray", ".readout-grid"]
      .forEach(sel => {
        document.querySelectorAll(sel).forEach(grid => {
          [...grid.children].forEach((child, i) => {
            child.classList.add("rv");
            child.style.transitionDelay = Math.min(i * 70, 420) + "ms";
          });
        });
      });
  }

  /* ---------- observer ---------- */
  function observe() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".rv").forEach(el => io.observe(el));
  }

  /* ---------- interactive logo: subtle idle pulse + click spin ---------- */
  function logo() {
    document.querySelectorAll(".brand .mark").forEach(mark => {
      mark.style.cursor = "pointer";
      mark.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (mark._spinning) return;
        mark._spinning = true;
        mark.animate(
          [
            { transform: "rotate(0deg) scale(1)" },
            { transform: "rotate(-14deg) scale(1.12)", offset: 0.35 },
            { transform: "rotate(8deg) scale(1.04)", offset: 0.7 },
            { transform: "rotate(0deg) scale(1)" }
          ],
          { duration: 620, easing: "cubic-bezier(0.32, 0.72, 0, 1)" }
        ).onfinish = () => { mark._spinning = false; };
      });
    });
  }

  /* ---------- card magnetic tilt (desktop, fine pointers only) ---------- */
  function tilt() {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.querySelectorAll(".subject-card, .feature-card").forEach(card => {
      let raf = null;
      card.addEventListener("mousemove", (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform =
            `translateY(-3px) rotateX(${(-y * 2.4).toFixed(2)}deg) rotateY(${(x * 2.4).toFixed(2)}deg)`;
          raf = null;
        });
      });
      card.addEventListener("mouseleave", () => {
        if (raf) cancelAnimationFrame(raf), (raf = null);
        card.style.transform = "";
      });
    });
  }

  /* ---------- confetti on quiz pass (ported, GPU-safe transforms) ---------- */
  function confetti(host) {
    const colors = ["#4F46E5", "#3E7B52", "#9A6A00", "#1B1B1A"];
    const parts = [];
    for (let i = 0; i < 26; i++) {
      const p = document.createElement("i");
      p.style.cssText =
        "position:absolute;left:50%;top:38%;width:7px;height:11px;border-radius:2px;" +
        "background:" + colors[i % colors.length] + ";pointer-events:none;z-index:5;";
      host.appendChild(p);
      parts.push(p);
      const dx = (Math.random() - 0.5) * 420;
      const dy = -(60 + Math.random() * 220);
      const rot = (Math.random() - 0.5) * 540;
      p.animate(
        [
          { transform: "translate(-50%,-50%) rotate(0deg)", opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 260}px)) rotate(${rot}deg)`, opacity: 0 }
        ],
        { duration: 850 + Math.random() * 550, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
      ).onfinish = () => p.remove();
    }
  }

  function watchResults() {
    const holder = document.getElementById("quizHolder");
    if (!holder) return;
    new MutationObserver(() => {
      const res = holder.querySelector(".quiz-result:not([data-sparkled])");
      if (!res) return;
      res.setAttribute("data-sparkled", "1");
      res.style.position = "relative";
      res.style.overflow = "hidden";
      const fill = res.querySelector(".result-fill");
      const pct = fill ? parseFloat(fill.getAttribute("data-pct") || "0") : 0;
      if (pct >= 60) confetti(res);
    }).observe(holder, { childList: true, subtree: true });
  }

  function init() { tag(); observe(); logo(); tilt(); watchResults(); }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();

  /* re-tag dynamically rendered content (grids filled by JS) */
  let reTagTimer = null;
  new MutationObserver(() => {
    clearTimeout(reTagTimer);
    reTagTimer = setTimeout(() => { tag(); observe(); }, 120);
  }).observe(document.body, { childList: true, subtree: true });
})();
