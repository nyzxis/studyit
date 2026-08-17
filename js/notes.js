/* ============================================================
   LEARNING PORT — notes.js
   Turns the flat notes list into an interactive reading flow:
   - Sections become collapsible cards with number chips
   - "Important" points render as tappable concept flips
   - Read-along: sections check off as you scroll past them
   - Anchor links on headings (#copy)
   - Per-section read time
   Content is NEVER modified — only re-presented.
   ============================================================ */

(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const READ_KEY = "learningPortSections.v1";

  function loadRead() {
    try { return JSON.parse(localStorage.getItem(READ_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveRead(d) { localStorage.setItem(READ_KEY, JSON.stringify(d)); }

  function sectionKey(subjectId, topicId, idx) {
    return subjectId + "/" + topicId + "#" + idx;
  }

  /* split "Term — definition" / "Term = definition" into parts */
  function splitTerm(text) {
    const clean = text.replace(/^KEY\s*/, "").trim();
    const m = clean.match(/^(.+?)\s[—=]\s(.+)$/);
    if (m && m[1].length >= 3 && m[1].length <= 60) return { term: m[1], def: m[2] };
    return null;
  }

  function estMins(sec) {
    const words = (sec.heading ? sec.heading.split(/\s+/).length : 0) +
      (sec.points || []).reduce((a, p) => a + (typeof p === "object" ? p.t : p).split(/\s+/).length, 0);
    return Math.max(1, Math.round(words / 200));
  }

  function enhance() {
    const main = document.getElementById("notesMain");
    if (!main || !window.LPCurrent) return;
    const { subject, topic } = window.LPCurrent;
    if (!topic || !topic.sections) return;

    const read = loadRead();
    const blocks = [...main.querySelectorAll(".note-block")];
    if (!blocks.length) return;

    const readSet = new Set(read[subject.id + "/" + topic.id] || []);
    let newlyCompleted = 0;

    blocks.forEach((block, i) => {
      const sec = topic.sections[i];
      if (!sec) return;
      const key = sectionKey(subject.id, topic.id, i);

      /* ---------- wrap into section card ---------- */
      block.classList.add("note-sec");
      block.style.setProperty("--sec-i", i);

      const h4 = block.querySelector("h4");
      if (h4) {
        const head = document.createElement("button");
        head.type = "button";
        head.className = "sec-head";
        head.setAttribute("aria-expanded", "true");

        const num = document.createElement("span");
        num.className = "sec-num";
        num.textContent = String(i + 1).padStart(2, "0");

        const title = document.createElement("span");
        title.className = "sec-title";
        title.textContent = h4.textContent;

        /* anchor copy */
        const anchor = document.createElement("a");
        anchor.className = "sec-anchor";
        anchor.href = "#" + block.id;
        anchor.title = "Copy link to section";
        anchor.textContent = "#";
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const url = location.origin + location.pathname + location.search + "#" + block.id;
          if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
          if (typeof showToast === "function") showToast("Link copied");
          if (window.LPSnd) window.LPSnd.play("click");
        });
        title.appendChild(anchor);

        const meta = document.createElement("span");
        meta.className = "sec-meta";
        meta.innerHTML = `<span class="sec-time">${estMins(sec)} min</span><span class="sec-check" aria-hidden="true"></span>`;

        const chev = document.createElement("span");
        chev.className = "sec-chev";
        chev.setAttribute("aria-hidden", "true");
        chev.textContent = "▾";

        head.appendChild(num);
        head.appendChild(title);
        head.appendChild(meta);
        head.appendChild(chev);

        h4.replaceWith(head);

        /* collapse toggle */
        head.addEventListener("click", () => {
          const open = block.classList.toggle("open");
          head.setAttribute("aria-expanded", String(open));
          if (window.LPSnd) window.LPSnd.play("click");
        });
        block.classList.add("open");
      }

      /* ---------- concept flips for important points ---------- */
      const importantLis = [...block.querySelectorAll("li")].filter(n => n.classList.contains("important"));
      importantLis.forEach((li) => {
        /* remove the KEY badge, then read the pure text */
        const badge = li.querySelector(".key-tag");
        const badgeText = badge ? badge.textContent : "";
        let raw = li.textContent;
        if (badgeText) raw = raw.replace(badgeText, "");
        raw = raw.trim();
        const parts = splitTerm(raw);
        if (!parts) return; /* not a term-def pair — leave as styled point */

        const flip = document.createElement("button");
        flip.type = "button";
        flip.className = "concept";
        flip.setAttribute("aria-pressed", "false");

        const front = document.createElement("span");
        front.className = "concept-face concept-front";
        front.innerHTML = `<span class="concept-key">Key term</span>`;
        const frontTerm = document.createElement("span");
        frontTerm.className = "concept-term";
        frontTerm.textContent = parts.term;
        const hint = document.createElement("span");
        hint.className = "concept-hint";
        hint.textContent = "tap to reveal";
        front.appendChild(frontTerm);
        front.appendChild(hint);

        const back = document.createElement("span");
        back.className = "concept-face concept-back";
        const backTerm = document.createElement("span");
        backTerm.className = "concept-term";
        backTerm.textContent = parts.term;
        const def = document.createElement("span");
        def.className = "concept-def";
        def.textContent = parts.def; /* exact text — never modified */
        back.appendChild(backTerm);
        back.appendChild(def);

        flip.appendChild(front);
        flip.appendChild(back);
        flip.addEventListener("click", () => {
          const on = flip.classList.toggle("flip");
          flip.setAttribute("aria-pressed", String(on));
          if (window.LPSnd) window.LPSnd.play(on ? "open" : "close");
        });
        li.replaceWith(flip);
      });

      /* ---------- read-along observer ---------- */
      if (!("IntersectionObserver" in window)) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          /* considered read when its bottom passes 78% of viewport */
          if (en.isIntersecting && !readSet.has(key)) {
            readSet.add(key);
            newlyCompleted++;
            block.classList.add("sec-read");
            const storeKey = subject.id + "/" + topic.id;
            const all = loadRead();
            all[storeKey] = [...readSet];
            saveRead(all);
            io.unobserve(block);
            if (window.LPX) window.LPX.add(3, "section read");
            if (readSet.size === blocks.length) {
              if (typeof showToast === "function") showToast("Every section read — nice focus");
              if (window.LPSnd) window.LPSnd.play("unlock");
            }
          }
        });
      }, { rootMargin: "0px 0px -22% 0px", threshold: 0.6 });
      io.observe(block);

      if (readSet.has(key)) block.classList.add("sec-read");
    });

    /* ---------- reading progress chip in TOC ---------- */
    const toc = document.getElementById("tocLinks");
    if (toc && toc.parentNode && blocks.length && !document.querySelector(".toc-progress")) {
      const chip = document.createElement("div");
      chip.className = "toc-progress";
      toc.parentNode.insertBefore(chip, toc);
      const paintToc = () => {
        chip.innerHTML = `<i style="width:${Math.round(readSet.size / blocks.length * 100)}%"></i><span>${readSet.size}/${blocks.length} sections</span>`;
      };
      paintToc();
      new MutationObserver(paintToc).observe(main, { subtree: true, attributes: true, attributeFilter: ["class"] });
    }

    /* ---------- reveal-all / hide-all for concept flips ---------- */
    const concepts = [...main.querySelectorAll(".concept")];
    if (concepts.length && toc && toc.parentNode) {
      const wrap = document.createElement("div");
      wrap.className = "reveal-all-wrap";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "reveal-all";
      btn.setAttribute("aria-pressed", "false");
      btn.textContent = "Reveal all · " + concepts.length;
      btn.addEventListener("click", () => {
        const on = btn.classList.toggle("active");
        btn.setAttribute("aria-pressed", String(on));
        btn.textContent = on ? "Hide all" : "Reveal all · " + concepts.length;
        concepts.forEach(c => {
          c.classList.toggle("flip", on);
          c.setAttribute("aria-pressed", String(on));
        });
        if (window.LPSnd) window.LPSnd.play(on ? "open" : "close");
      });
      wrap.appendChild(btn);
      toc.parentNode.insertBefore(wrap, toc);
    }
  }

  /* run after topic.js renders (it runs on DOMContentLoaded too,
     so queue behind it) */
  function init() { setTimeout(enhance, 60); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
