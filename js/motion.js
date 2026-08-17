/* ==========================================================
   LEARNING PORT — motion choreography v2
   Deeper scroll reveals, grid stagger, quiz flow, topic/
   subject page polish, page transitions, magnetic controls.
   Complements the existing animation layer — does not replace.
   Run after animations.js so both layers coexist.
   ========================================================== */

(function(){
  "use strict";

  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  const hasAnime = typeof window.anime === "function";

  /* ---------- helpers ---------- */
  function onReady(fn){
    if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  function show(el){
    if(!el) return;
    el.style.opacity = "1";
    el.style.transform = "";
    el.style.filter = "";
  }
  function prefersReduced(){ return reduced; }

  /* ---------- page transition ---------- */
  let currentUrl = location.href;
  function onPageNav(){
    window.addEventListener("click", function(e){
      const link = e.target.closest && e.target.closest("a[href]");
      if(!link) return;
      const href = link.getAttribute("href");
      if(!href || href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:")) return;
      const url = link.href;
      if(url === currentUrl) return;
      // only handle internal links
      if(!url.startsWith(location.origin) && !url.startsWith("/")) return;
      e.preventDefault();
      // add leaving class
      document.body.classList.add("page-leaving");
      setTimeout(function(){
        window.location.href = url;
      }, 160);
    }, { passive: true });
  }

  /* ---------- directional scroll reveal ----------
     Adds .in to .rv elements when they intersect.
     Assigns data-direction based on scroll position relative to center. */
  function scrollReveal(){
    if(reduced) return;
    var targets = document.querySelectorAll(".rv, .subject-card:not(.add), .badge, .topic-card, .note-block, .section-head");
    if(!targets.length) return;

    // assign directional class based on which side of viewport center the element enters
    function assignDirection(el){
      var r = el.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var vw = window.innerWidth;
      var threshold = 0.45;
      if(cx < vw * threshold){
        el.classList.add("dir-left");
        el.setAttribute("data-direction", "left");
      }else if(cx > vw * (1 - threshold)){
        el.classList.add("dir-right");
        el.setAttribute("data-direction", "right");
      }else{
        el.setAttribute("data-direction", "up");
      }
    }

    targets.forEach(function(el){ assignDirection(el); });

    var visible = new Set();
    function play(el){
      if(visible.has(el)) return;
      visible.add(el);
      assignDirection(el);
      if(reduced){
        el.classList.add("in");
        return;
      }
      var delay = parseInt(el.style.transitionDelay) || 0;
      el.style.opacity = "0";
      el.style.transform = el.classList.contains("dir-left")
        ? "translateX(-18px)" : el.classList.contains("dir-right")
        ? "translateX(18px)" : "translateY(20px)";
      if(hasAnime){
        var anim = window.anime({
          targets: el,
          opacity: [0, 1],
          translateX: el.classList.contains("dir-left") ? [-18, 0]
            : el.classList.contains("dir-right") ? [18, 0] : [20, 0],
          duration: 520,
          delay: delay,
          easing: "easeOutCubic",
          complete: function(){ el.classList.add("in"); }
        });
      }else{
        setTimeout(function(){
          el.style.opacity = "1";
          el.style.transform = "";
          el.classList.add("in");
        }, delay);
      }
    }

    var io = null;
    try{
      io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if(en.isIntersecting) play(en.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      targets.forEach(function(t){ if(io) io.observe(t); });
    }catch(e){}

    // immediate pass for already-visible elements
    targets.forEach(function(t){
      var r = t.getBoundingClientRect();
      if(r.top < window.innerHeight * 0.85 && r.bottom > 0) play(t);
    });
  }

  /* ---------- subject grid: L→R stagger on enter ----------
     Called after subjectsGrid is populated. Each card gets a delay. */
  function staggerSubjectGrid(){
    var grid = document.getElementById("subjectsGrid");
    if(!grid) return;
    var cards = Array.from(grid.querySelectorAll(".subject-card:not(.add)"));
    cards.forEach(function(card, i){
      card.style.transitionDelay = (i * 90) + "ms";
      // trigger entrance by adding .in after a tick
      setTimeout(function(){
        if(!reduced) card.classList.add("in");
      }, 80 + i * 90);
    });
  }

  /* ---------- badge tray stagger ---------- */
  function staggerBadges(){
    var tray = document.getElementById("badgeTray");
    if(!tray) return;
    var badges = Array.from(tray.querySelectorAll(".badge"));
    badges.forEach(function(badge, i){
      badge.style.transitionDelay = (i * 60) + "ms";
    });
  }

  /* ---------- topic card grid stagger ---------- */
  function staggerTopicGrid(){
    var grids = document.querySelectorAll("#topicGrid, .topic-card-grid");
    grids.forEach(function(grid){
      var cards = Array.from(grid.querySelectorAll(".topic-card"));
      cards.forEach(function(card, i){
        card.style.transitionDelay = (i % 2 === 0 ? i * 70 : i * 60) + "ms";
      });
    });
  }

  /* ---------- note block entrances (topic page) ---------- */
  function revealNoteBlocks(){
    if(reduced) return;
    var blocks = document.querySelectorAll(".note-block");
    if(!blocks.length) return;
    blocks.forEach(function(block, i){
      block.style.transitionDelay = (i * 50) + "ms";
      setTimeout(function(){
        block.classList.add("in");
      }, 120 + i * 50);
    });
  }

  /* ---------- reading bar glow (runs on topic page) ---------- */
  function readingBarGlow(){
    var bar = document.getElementById("readingBar");
    if(!bar || reduced || !hasAnime) return;
    window.anime({
      targets: bar,
      opacity: [0.55, 1],
      duration: 900,
      direction: "alternate",
      easing: "easeInOutSine",
      loop: true
    });
  }

  /* ---------- TOC scroll-spy highlight transition ----------
     Already handled by topic.js IntersectionObserver.
     This adds a smooth class transition on the active link. */
  function enhanceToc(){
    var toc = document.getElementById("toc");
    if(!toc) return;
    var links = Array.from(toc.querySelectorAll("a"));
    links.forEach(function(link){
      link.addEventListener("transitionend", function(e){
        if(e.propertyName === "border-left-color" || e.propertyName === "background"){
          // fine
        }
      });
    });
  }

  /* ---------- section head fade on scroll ---------- */
  function sectionHeadReveal(){
    if(reduced) return;
    var heads = document.querySelectorAll(".section-head");
    if(!heads.length) return;
    var io = null;
    try{
      io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if(en.isIntersecting){
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -30px 0px" });
      heads.forEach(function(h){ if(io) io.observe(h); });
    }catch(e){}
    // immediate pass
    heads.forEach(function(h){
      var r = h.getBoundingClientRect();
      if(r.top < window.innerHeight * 0.85) h.classList.add("in");
    });
  }

  /* ---------- magnetic button (extended set) ---------- */
  function magneticButtons(){
    if(reduced || !finePointer) return;
    var els = document.querySelectorAll(".btn, .pager-link, .mark-done, .sg-tab, .pomo-btn, .topic-pager a, .subject-card .go, .nav-kbd");
    els.forEach(function(el){
      var raf = null;
      el.addEventListener("mousemove", function(e){
        if(raf) return;
        raf = requestAnimationFrame(function(){
          raf = null;
          var r = el.getBoundingClientRect();
          var cx = r.left + r.width / 2;
          var cy = r.top + r.height / 2;
          var dx = e.clientX - cx;
          var dy = e.clientY - cy;
          var dist = Math.hypot(dx, dy);
          if(dist < 2){
            el.style.transform = "";
            return;
          }
          var pull = Math.min(1, dist / 80);
          var tx = dx * 0.10;
          var ty = dy * 0.14;
          el.style.transform = "translate(" + tx + "px," + ty + "px)";
        });
      });
      el.addEventListener("mouseleave", function(){
        if(raf) cancelAnimationFrame(raf);
        raf = null;
        el.style.transform = "";
      });
    });
  }

  /* ---------- progress chip LED pulse (CSS handles it, but ensure class) ---------- */
  function ledPulse(){
    var chips = document.querySelectorAll(".progress-chip");
    chips.forEach(function(chip){
      var led = chip.querySelector(".led");
      if(led && chip.textContent.trim().match(/\d+\/\d+/)){
        led.classList.add("on");
      }
    });
  }

  /* ---------- ring draw-in for subject page ---------- */
  function subjectRingDraw(){
    var ring = document.getElementById("subjectRing");
    var ringNum = document.getElementById("subjectRingNum");
    if(!ring || !ringNum || reduced) return;
    var pct = parseInt(ring.dataset.pct || "0", 10);
    if(isNaN(pct)) return;
    ring.classList.add("subject-ring");
    if(hasAnime){
      var obj = { v: 0 };
      window.anime({
        targets: obj,
        v: pct,
        duration: 1100,
        delay: 200,
        easing: "easeOutExpo",
        update: function(){
          var c = 131.94689145077132;
          ring.style.strokeDashoffset = c * (1 - obj.v / 100);
          ringNum.textContent = Math.round(obj.v) + "%";
        }
      });
    }else{
      setTimeout(function(){
        var c = 131.94689145077132;
        ring.style.strokeDashoffset = c * (1 - pct / 100);
        ringNum.textContent = pct + "%";
      }, 200);
    }
  }

  /* ---------- nav link hover underline (CSS ::after, but ensure class readiness) ---------- */
  function navHover(){ /* pure CSS now */ }

  /* ---------- Pomodoro magnetic button ---------- */
  function pomoMagnetic(){
    if(reduced || !finePointer) return;
    var startBtn = document.getElementById("pomoStart");
    if(startBtn){
      var raf = null;
      startBtn.addEventListener("mousemove", function(e){
        if(raf) return;
        raf = requestAnimationFrame(function(){
          raf = null;
          var r = startBtn.getBoundingClientRect();
          var dx = e.clientX - (r.left + r.width / 2);
          var dy = e.clientY - (r.top + r.height / 2);
          var pull = Math.min(1, Math.hypot(dx, dy) / 70);
          startBtn.style.transform = "translate(" + (dx * 0.12) + "px," + (dy * 0.16) + "px)";
        });
      });
      startBtn.addEventListener("mouseleave", function(){
        if(raf) cancelAnimationFrame(raf);
        raf = null;
        startBtn.style.transform = "";
      });
    }
  }

  /* ---------- quiz flow enhancements ----------
     The quiz.js already renders questions one at a time.
     This adds a smooth card entrance and brighter answer feedback. */
  function quizEnhancements(){
    var holder = document.getElementById("quizHolder");
    if(!holder) return;

    // observe new cards appearing
    try{
      var cardIO = new MutationObserver(function(){
        var card = holder.querySelector(".quiz-card:not([data-card-anim])");
        if(card){
          card.setAttribute("data-card-anim", "1");
          if(hasAnime){
            window.anime({
              targets: card,
              opacity: [0, 1],
              translateY: [10, 0],
              scale: [0.98, 1],
              duration: 320,
              easing: "easeOutCubic"
            });
          }
        }
      });
      cardIO.observe(holder, { childList: true, subtree: true });
    }catch(e){}

    // observe answer state changes for pop animation
    try{
      var answerIO = new MutationObserver(function(){
        var opts = holder.querySelectorAll(".quiz-opt.correct:not([data-opt-pop]), .quiz-opt.wrong:not([data-opt-pop])");
        opts.forEach(function(opt){
          opt.setAttribute("data-opt-pop", "1");
          if(hasAnime){
            window.anime({
              targets: opt,
              scale: [1, 1.035, 1],
              duration: 280,
              easing: "easeOutQuad"
            });
          }
        });
      });
      answerIO.observe(holder, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    }catch(e){}
  }

  /* ---------- hero entrance (coordinated with CSS animations) ---------- */
  function heroEntrance(){
    if(reduced) return;
    var eyebrow = document.querySelector(".hero-eyebrow");
    var title = document.querySelector(".hero-title");
    var sub = document.querySelector(".hero-sub");
    var actions = document.querySelector(".hero-actions");
    // CSS handles the @keyframes; this just ensures content is visible
    // if animation fails
    setTimeout(function(){
      if(eyebrow) eyebrow.style.opacity = "1";
      if(title) title.style.opacity = "1";
      if(sub) sub.style.opacity = "1";
      if(actions) actions.style.opacity = "1";
    }, 2000);
  }

  /* ---------- init: run the right enhancers per page ---------- */
  function init(){
    if(document.querySelector("#subjectsGrid")){
      staggerSubjectGrid();
      setTimeout(function(){ staggerBadges(); }, 600);
    }
    if(document.querySelector("#topicGrid")){
      setTimeout(function(){ staggerTopicGrid(); }, 100);
    }
    if(document.querySelector(".note-block")){
      setTimeout(function(){ revealNoteBlocks(); }, 150);
    }
    if(document.getElementById("readingBar")){
      readingBarGlow();
      enhanceToc();
    }
    if(document.getElementById("subjectRing")){
      subjectRingDraw();
    }
    if(document.getElementById("quizHolder")){
      quizEnhancements();
    }
    scrollReveal();
    sectionHeadReveal();
    magneticButtons();
    pomoMagnetic();
    ledPulse();
    heroEntrance();
    onPageNav();
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  }else{
    init();
  }

  // expose for use from other scripts
  window.LPMotion = {
    staggerSubjectGrid: staggerSubjectGrid,
    staggerBadges: staggerBadges,
    staggerTopicGrid: staggerTopicGrid,
    revealNoteBlocks: revealNoteBlocks,
    subjectRingDraw: subjectRingDraw,
    ledPulse: ledPulse
  };

})();
