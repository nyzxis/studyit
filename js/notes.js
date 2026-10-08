/* ============================================================
   LEARNING PORT — notes.js
   Turns the flat notes list into an interactive reading flow:
   - Sections become collapsible cards with number chips
   - Key terms render as crisp, compact, readable concept cards
   - Dedicated Sub-topic Stepper Bar with Prev / Next snap navigation
   - Focus Mode vs View All modes (avoids getting stuck between cards)
   - Read-along: sections check off as you scroll past them
   - Anchor links on headings (#copy)
   - Per-section read time
   Content is NEVER modified — only re-presented.
   ============================================================ */

(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const READ_KEY = "learningPortSections.v1";
  const MODE_KEY = "learningPortViewMode.v1";

  function loadRead() {
    try { return JSON.parse(localStorage.getItem(READ_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveRead(d) { localStorage.setItem(READ_KEY, JSON.stringify(d)); }

  function loadMode() {
    try { return localStorage.getItem(MODE_KEY) || "all"; }
    catch (e) { return "all"; }
  }
  function saveMode(m) {
    try { localStorage.setItem(MODE_KEY, m); } catch (e) {}
  }

  function sectionKey(subjectId, topicId, idx) {
    return subjectId + "/" + topicId + "#" + idx;
  }

  /* split "Term — definition" / "Term = definition" into parts */
  function splitTerm(text) {
    const clean = text.replace(/^KEY\s*/, "").trim();
    // 1) Explicit equals definitions: "Sender = the person who..."
    let m = clean.match(/^(\d+\.\s*)?([A-Za-z0-9\s\/\(\)-]+?)\s*=\s*(.+)$/);
    if (m) {
      const term = (m[1] || "") + m[2].trim();
      return { term: term, def: m[3].trim() };
    }
    // 2) Em-dash / en-dash definitions only for concise noun terms (not full sentences or questions)
    m = clean.match(/^([A-Za-z0-9\s\/\(\)-]{2,20})\s[—–-]\s(.+)$/);
    if (m && !/\b(is|are|was|were|happens|exist|we|to|why|can|both|often)\b/i.test(m[1]) && !/^\d+\./.test(m[1])) {
      return { term: m[1].trim(), def: m[2].trim() };
    }
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
    let currentMode = loadMode(); // "all" or "focus"
    let activeSecIndex = 0;

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
          if (currentMode === "focus") {
            // In focus mode, opening this block closes others
            blocks.forEach((b, idx) => {
              const openThis = (idx === i);
              b.classList.toggle("open", openThis);
              const btn = b.querySelector(".sec-head");
              if (btn) btn.setAttribute("aria-expanded", String(openThis));
            });
            activeSecIndex = i;
            updateSubtopicBar(i);
            snapToSection(i, false);
          } else {
            const open = block.classList.toggle("open");
            head.setAttribute("aria-expanded", String(open));
          }
          if (window.LPSnd) window.LPSnd.play("click");
        });

        // Set initial open state
        if (currentMode === "focus") {
          block.classList.toggle("open", i === 0);
          head.setAttribute("aria-expanded", i === 0 ? "true" : "false");
        } else {
          block.classList.add("open");
          head.setAttribute("aria-expanded", "true");
        }
      }

      /* ---------- concept cards for important points (compact & readable) ---------- */
      const importantLis = [...block.querySelectorAll("li")].filter(n => n.classList.contains("important"));
      importantLis.forEach((li) => {
        /* remove the KEY badge, then read the pure text */
        const badge = li.querySelector(".key-tag");
        const badgeText = badge ? badge.textContent : "";
        let raw = li.textContent;
        if (badgeText) raw = raw.replace(badgeText, "");
        raw = raw.trim();
        const parts = splitTerm(raw);
        if (!parts) return; /* not a pure term-def pair — leave as styled point */

        const chip = document.createElement("div");
        chip.className = "concept-chip";
        chip.setAttribute("role", "note");
        chip.innerHTML = `
          <div class="concept-head">
            <span class="concept-key">Key Term</span>
            <strong class="concept-term">${parts.term}</strong>
          </div>
          <div class="concept-def">${parts.def}</div>
        `;
        // Allow clicking chip in self-test mode to toggle peek
        chip.addEventListener("click", () => {
          if (main.classList.contains("self-test-mode")) {
            chip.classList.toggle("revealed");
            if (window.LPSnd) window.LPSnd.play("click");
          }
        });
        li.replaceWith(chip);
      });

      /* ---------- read-along observer ---------- */
      if (!("IntersectionObserver" in window)) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
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

    /* ==========================================================
       SUB-TOPIC STEPPER BAR & FOCUS NAVIGATION DOCK
       ========================================================== */
    let bar = document.getElementById("subtopicBar");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "subtopicBar";
      bar.className = "subtopic-bar";
      bar.innerHTML = `
        <div class="subtopic-info">
          <span class="subtopic-pill" id="subtopicPill">Sub-topic 1 / ${blocks.length}</span>
          <span class="subtopic-active-title" id="subtopicActiveTitle">${topic.sections[0]?.heading || "Introduction"}</span>
        </div>
        <div class="subtopic-controls">
          <div class="subtopic-mode-toggle" id="subtopicModeToggle" role="group" aria-label="View mode">
            <button type="button" class="mode-btn ${currentMode === 'all' ? 'active' : ''}" data-mode="all" title="View all sub-topics expanded">All</button>
            <button type="button" class="mode-btn ${currentMode === 'focus' ? 'active' : ''}" data-mode="focus" title="Focus on one sub-topic at a time">Focus</button>
          </div>
          <div class="subtopic-nav-btns">
            <button type="button" class="subtopic-btn prev" id="subtopicPrevBtn" title="Previous sub-topic (k / ↑)" aria-label="Previous sub-topic" disabled>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
              <span>Prev</span>
            </button>
            <button type="button" class="subtopic-btn next" id="subtopicNextBtn" title="Next sub-topic (j / ↓)" aria-label="Next sub-topic">
              <span>Next</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      `;
      main.insertBefore(bar, main.firstChild);
    }

    function updateSubtopicBar(index) {
      activeSecIndex = index;
      const pill = document.getElementById("subtopicPill");
      const title = document.getElementById("subtopicActiveTitle");
      const prevBtn = document.getElementById("subtopicPrevBtn");
      const nextBtn = document.getElementById("subtopicNextBtn");

      if (pill) pill.textContent = `Sub-topic ${index + 1} / ${blocks.length}`;
      if (title) title.textContent = topic.sections[index]?.heading || "";
      if (prevBtn) prevBtn.disabled = (index <= 0);
      if (nextBtn) nextBtn.disabled = (index >= blocks.length - 1);

      // Also highlight TOC
      const tocLinks = document.getElementById("tocLinks");
      if (tocLinks) {
        const links = tocLinks.querySelectorAll("a");
        links.forEach((l, i) => l.classList.toggle("active", i === index));
      }
    }

    function snapToSection(index, smooth = true) {
      if (index < 0 || index >= blocks.length) return;
      const target = blocks[index];
      if (!target) return;

      if (currentMode === "focus") {
        blocks.forEach((b, i) => {
          const isOpen = (i === index);
          b.classList.toggle("open", isOpen);
          const btn = b.querySelector(".sec-head");
          if (btn) btn.setAttribute("aria-expanded", String(isOpen));
        });
      } else {
        target.classList.add("open");
        const btn = target.querySelector(".sec-head");
        if (btn) btn.setAttribute("aria-expanded", "true");
      }

      updateSubtopicBar(index);

      // Snap with top navbar offset (78px)
      const rect = target.getBoundingClientRect();
      const targetY = rect.top + window.scrollY - 78;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: smooth && !reduced ? "smooth" : "auto"
      });
      if (window.LPSnd) window.LPSnd.play("click");
    }

    // Prev / Next button listeners
    const prevBtn = document.getElementById("subtopicPrevBtn");
    const nextBtn = document.getElementById("subtopicNextBtn");
    if (prevBtn) prevBtn.addEventListener("click", () => snapToSection(activeSecIndex - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => snapToSection(activeSecIndex + 1));

    // Mode toggle listeners (All vs Focus)
    const modeBtns = bar.querySelectorAll(".mode-btn");
    modeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const mode = btn.dataset.mode;
        currentMode = mode;
        saveMode(mode);
        modeBtns.forEach(b => b.classList.toggle("active", b.dataset.mode === mode));

        if (mode === "focus") {
          blocks.forEach((b, i) => {
            const isOpen = (i === activeSecIndex);
            b.classList.toggle("open", isOpen);
            const head = b.querySelector(".sec-head");
            if (head) head.setAttribute("aria-expanded", String(isOpen));
          });
          snapToSection(activeSecIndex, true);
        } else {
          blocks.forEach(b => {
            b.classList.add("open");
            const head = b.querySelector(".sec-head");
            if (head) head.setAttribute("aria-expanded", "true");
          });
        }
        if (window.LPSnd) window.LPSnd.play("click");
      });
    });

    // Keyboard shortcuts (j/k or ArrowDown/ArrowUp when reading)
    document.addEventListener("keydown", (e) => {
      const isInput = ["INPUT", "TEXTAREA"].includes((e.target || {}).tagName);
      if (isInput) return;
      if (e.key === "j" || (e.altKey && e.key === "ArrowDown")) {
        e.preventDefault();
        if (activeSecIndex < blocks.length - 1) snapToSection(activeSecIndex + 1);
      } else if (e.key === "k" || (e.altKey && e.key === "ArrowUp")) {
        e.preventDefault();
        if (activeSecIndex > 0) snapToSection(activeSecIndex - 1);
      }
    });

    // TOC link click integration
    const toc = document.getElementById("tocLinks");
    if (toc) {
      toc.querySelectorAll("a").forEach((a, i) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          snapToSection(i);
        });
      });
    }

    /* ---------- reading progress chip in TOC ---------- */
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

    /* ---------- Self-test toggle in TOC ---------- */
    const chipsCount = main.querySelectorAll(".concept-chip").length;
    if (chipsCount && toc && toc.parentNode && !document.querySelector(".self-test-toggle")) {
      const wrap = document.createElement("div");
      wrap.className = "reveal-all-wrap";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "reveal-all self-test-toggle";
      btn.setAttribute("aria-pressed", "false");
      btn.textContent = `Test recall (${chipsCount} terms)`;
      btn.addEventListener("click", () => {
        const on = main.classList.toggle("self-test-mode");
        btn.classList.toggle("active", on);
        btn.setAttribute("aria-pressed", String(on));
        btn.textContent = on ? "Show all definitions" : `Test recall (${chipsCount} terms)`;
        if (!on) {
          main.querySelectorAll(".concept-chip").forEach(c => c.classList.remove("revealed"));
        }
        if (window.LPSnd) window.LPSnd.play(on ? "open" : "close");
      });
      wrap.appendChild(btn);
      toc.parentNode.insertBefore(wrap, toc);
    }

    /* ---------- Smart scroll observer (updates active sub-topic) ---------- */
    let isUserScrolling = false;
    let scrollTimeout = null;

    window.addEventListener("scroll", () => {
      isUserScrolling = true;
      clearTimeout(scrollTimeout);

      // Find which section is currently at the top of the reading viewport
      const offset = 140;
      let currentIndex = 0;
      for (let i = 0; i < blocks.length; i++) {
        const rect = blocks[i].getBoundingClientRect();
        if (rect.top <= offset) {
          currentIndex = i;
        } else {
          break;
        }
      }
      if (currentIndex !== activeSecIndex && !document.body.classList.contains("snapping")) {
        updateSubtopicBar(currentIndex);
      }

      // Gentle auto-snap on scroll end if stopped awkwardly midway between cards
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
        if (reduced) return;

        const mainRect = main.getBoundingClientRect();
        // Only run if user is inside the notes content area
        if (mainRect.top > 200 || mainRect.bottom < 200) return;

        // Check if nearest card is slightly offset from sticky header
        const activeRect = blocks[currentIndex].getBoundingClientRect();
        const distFromSnap = activeRect.top - 78;

        // If card top is awkwardly cut off (e.g. between 25px and 120px from snap point)
        if (Math.abs(distFromSnap) > 28 && Math.abs(distFromSnap) < 140) {
          document.body.classList.add("snapping");
          window.scrollTo({
            top: window.scrollY + distFromSnap,
            behavior: "smooth"
          });
          setTimeout(() => { document.body.classList.remove("snapping"); }, 350);
        }
      }, 180);
    }, { passive: true });

    updateSubtopicBar(0);
  }

  /* run after topic.js renders (it runs on DOMContentLoaded too,
     so queue behind it) */
  function init() { setTimeout(enhance, 60); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
