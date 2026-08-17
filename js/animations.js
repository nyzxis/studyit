/* ============================================================
   LEARNING PORT — animation layer
   Driven by anime.js (reliable UMD build).
   Motion (motion.dev) is loaded but its UMD `animate` has a
   broken keyframe path in v13, so everything critical is
   anime.js + CSS. Every entrance has a failsafe that forces
   content visible — text can never stay hidden.
   ============================================================ */

(function(){
  "use strict";

  const hasAnime = typeof window.anime === "function";

  function prefersReduced(){
    try{ return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
    catch(e){ return false; }
  }

  function onReady(fn){
    if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  /* ---------------- failsafe: nothing may remain invisible ---------------- */
  function show(el){ if(el){ el.style.opacity = "1"; el.style.transform = ""; } }
  function watchdog(ms){
    // Only element groups that animate immediately on load are watched.
    // Scroll-reveal cards pass through anime's complete() instead, so they
    // never get force-flashed before they scroll into view.
    setTimeout(function(){
      var sel = ".hero-eyebrow, .hero-title, .hero-sub, .hero-actions, .readout, .readout-num";
      document.querySelectorAll(sel).forEach(show);
    }, ms || 2000);
  }

  /* ---------------- generic stagger reveal ---------------- */
  function revealStagger(elements, skip){
    if(prefersReduced()) return;
    var els = Array.from(elements).filter(Boolean);
    if(!els.length) return;
    if(hasAnime){
      els.forEach(function(el, i){
        el.style.opacity = "0";
        el.style.transform = "translateY(18px)";
        anime({
          targets: el,
          opacity: [0, 1],
          translateY: [18, 0],
          duration: 520,
          delay: (skip || 0) + i * 80,
          easing: "easeOutCubic",
          complete: function(){ show(el); }
        });
      });
    }else{
      els.forEach(function(el){ show(el); });
    }
  }

  /* ---------------- fade-up when scrolled into view ---------------- */
  function scrollReveal(){
    if(prefersReduced()) return;
    var targets = document.querySelectorAll(".note-block, .key-takeaways, .rule-card, .formula-item, .subject-card, .topic-card, .pager-link");
    if(!targets.length) return;

    var visible = new Set();
    function play(el){
      if(visible.has(el)) return;
      visible.add(el);
      if(hasAnime){
        el.style.opacity = "0";
        el.style.transform = "translateY(14px)";
        anime({
          targets: el,
          opacity: [0, 1],
          translateY: [14, 0],
          duration: 460,
          easing: "easeOutQuart",
          complete: function(){ show(el); }
        });
      }
    }

    var io = null;
    try{ io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting) play(en.target); });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }); }catch(e){}

    targets.forEach(function(t){ if(io) io.observe(t); });
    targets.forEach(function(t){
      var r = t.getBoundingClientRect();
      if(r.top < window.innerHeight * 0.9) play(t);
    });
  }

  /* ---------------- animated counters ---------------- */
  function animateCounters(){
    if(prefersReduced()) return;
    document.querySelectorAll(".readout-num").forEach(function(el, idx){
      var target = parseInt(el.textContent.trim(), 10);
      if(isNaN(target)) return;
      if(hasAnime){
        var obj = { v: 0 };
        el.setAttribute("data-count-target", String(target));
        anime({
          targets: obj,
          v: target,
          duration: 1100,
          delay: 300 + idx * 120,
          easing: "easeOutExpo",
          update: function(){ el.textContent = Math.round(obj.v); }
        });
      }
    });
  }

  /* ---------------- hero entrance (anime only, no broken Motion) ---------------- */
  function heroEntrance(){
    if(prefersReduced()) return;
    var pieces = document.querySelectorAll(".hero-eyebrow, .hero-title, .hero-sub, .hero-actions, .readout");
    if(!pieces.length) return;
    revealStagger(pieces, 120);
  }

  /* ---------------- hero blob float ---------------- */
  function blobFloat(){
    var blob = document.querySelector(".hero-logo-wrap .blob");
    if(!blob || prefersReduced() || !hasAnime) return;
    anime({
      targets: blob,
      scale: [1, 1.12],
      duration: 2600,
      direction: "alternate",
      easing: "easeInOutSine",
      loop: true
    });
  }

  /* ============================================================
     KokonutUI port — animated light-beams background (canvas)
     ============================================================ */
  function beamsBackground(){
    var hero = document.querySelector(".hero");
    if(!hero || prefersReduced()) return;
    if(hero.querySelector(".lp-beams")) return;
    if(window.__LP_TEST && window.__LP_TEST.disableBeams) return;

    var canvas = document.createElement("canvas");
    canvas.className = "lp-beams";
    canvas.setAttribute("aria-hidden", "true");
    hero.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    var beams = [];
    var w = 0, h = 0, running = true, visible = true, raf = null;

    /* Pre-render each beam's gradient + blur ONCE to an offscreen sprite.
       The draw loop only blits sprites with drawImage — no per-frame
       createLinearGradient / blur(), which were the big lag source. */
    function makeBeams(){
      beams = Array.from({length: Math.max(10, Math.round(w / 90))}, function(_, i){
        var column = i % 3;
        var spacing = w / 3;
        var width = 40 + Math.random() * 70;
        var length = h * 1.35;
        var pad = 40; /* equal to the blur radius */
        var sc = document.createElement("canvas");
        sc.width = Math.max(2, Math.round(width + pad * 2));
        sc.height = Math.max(2, Math.round(length + pad * 2));
        var sctx = sc.getContext("2d");
        var hue = 210 + Math.random() * 40;
        var opacity = 0.05 + Math.random() * 0.1;
        var grad = sctx.createLinearGradient(0, pad, 0, pad + length);
        grad.addColorStop(0, "hsla(" + hue + ", 70%, 55%, 0)");
        grad.addColorStop(0.12, "hsla(" + hue + ", 70%, 55%, " + opacity + ")");
        grad.addColorStop(0.5, "hsla(" + hue + ", 70%, 55%, " + opacity + ")");
        grad.addColorStop(0.88, "hsla(" + hue + ", 70%, 55%, " + opacity + ")");
        grad.addColorStop(1, "hsla(" + hue + ", 70%, 55%, 0)");
        sctx.filter = "blur(30px)";
        sctx.fillStyle = grad;
        sctx.fillRect(0, pad, width, length);
        return {
          y: Math.random() * h,
          x: column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.6,
          speed: 0.4 + Math.random() * 0.5,
          angle: -40 + Math.random() * 12,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          width: sc.width,
          height: sc.height,
          sprite: sc
        };
      });
    }
    function resetBeam(b){
      b.y = h + 140;
      b.x = Math.random() * w;
      return b;
    }
    function resize(){
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      var rect = hero.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeBeams();
    }
    function draw(){
      if(!running) return;
      if(visible){
        ctx.clearRect(0, 0, w, h);
        beams.forEach(function(b){
          b.y -= b.speed;
          if(b.y + b.height < -100) resetBeam(b);
          b.pulse += b.pulseSpeed;
          ctx.globalAlpha = 0.75 + Math.sin(b.pulse) * 0.25;
          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.rotate(b.angle * Math.PI / 180);
          ctx.drawImage(b.sprite, -b.width / 2, -b.height / 2);
          ctx.restore();
        });
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(draw);
    }
    function start(){ if(!raf) draw(); }
    function stop(){ running = false; if(raf){ cancelAnimationFrame(raf); raf = null; } }

    resize();
    window.addEventListener("resize", resize);

    try{
      var io = new IntersectionObserver(function(entries){
        visible = entries[0].isIntersecting;
        if(visible) start();
      }, { threshold: 0 });
      io.observe(hero);
    }catch(e){}
    document.addEventListener("visibilitychange", function(){
      visible = visible && !document.hidden;
    });

    start();
  }

  /* ============================================================
     KokonutUI port — 3D tilt spotlight cards (cursor glow)
     ============================================================ */
  function spotlightTilt(){
    if(prefersReduced()) return;
    if(window.matchMedia && window.matchMedia("(hover: none)").matches) return;
    var cards = document.querySelectorAll(".subject-card:not(.coming):not(.add), .topic-card, .rule-card");
    cards.forEach(function(card){
      var pending = null;
      card.addEventListener("mousemove", function(e){
        if(pending) return;
        pending = requestAnimationFrame(function(){
          pending = null;
          var r = card.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width;
          var y = (e.clientY - r.top) / r.height;
          card.style.setProperty("--mx", (x * 100) + "%");
          card.style.setProperty("--my", (y * 100) + "%");
          card.style.setProperty("--tx", ((x - 0.5) * 5).toFixed(2) + "deg");
          card.style.setProperty("--ty", ((0.5 - y) * 5).toFixed(2) + "deg");
        });
      });
      card.addEventListener("mouseleave", function(){
        if(pending){ cancelAnimationFrame(pending); pending = null; }
        card.style.setProperty("--mx", "50%");
        card.style.setProperty("--my", "50%");
        card.style.setProperty("--tx", "0deg");
        card.style.setProperty("--ty", "0deg");
      });
    });
  }

  /* ============================================================
     KokonutUI port — typewriter hero eyebrow
     ============================================================ */
  function typewriter(){
    var el = document.querySelector(".hero-eyebrow");
    if(!el || prefersReduced()) return;
    var phrases = [
      "Interactive study platform",
      "Read notes -> self-test -> LED green",
      "One subject per port, one topic per slot"
    ];
    var pi = 0, ci = 0, deleting = false;
    var timers = [];
    function delay(){
      return deleting ? 22 : (32 + Math.random() * 40);
    }
    function step(){
      var p = phrases[pi];
      if(deleting){
        ci--;
        if(ci <= 0){ deleting = false; pi = (pi + 1) % phrases.length; timers.push(setTimeout(step, 700)); return; }
      }else{
        ci++;
        if(ci >= p.length){ deleting = true; timers.push(setTimeout(step, 2600)); return; }
      }
      el.textContent = p.slice(0, ci);
      timers.push(setTimeout(step, delay()));
    }
    timers.push(setTimeout(step, 1400));
  }

  /* ============================================================
     KokonutUI port — boot loader splash (rings + logo)
     ============================================================ */
  function bootLoader(){
    if(prefersReduced()) return;
    var load = document.createElement("div");
    load.className = "lp-loader";
    load.setAttribute("aria-hidden", "true");
    load.innerHTML =
      '<div class="lp-loader-rings">' +
        '<span class="lp-ring lp-ring-a"></span>' +
        '<span class="lp-ring lp-ring-b"></span>' +
        '<span class="lp-ring lp-ring-c"></span>' +
        '<span class="lp-loader-logo js-logo"></span>' +
      '</div>' +
      '<div class="lp-loader-text">Learning Port<span>initiating study dock …</span></div>';
    document.body.appendChild(load);

    var logo = load.querySelector(".js-logo");
    if(logo && window.LOGO_SVG) logo.innerHTML = window.LOGO_SVG;

    setTimeout(function(){
      load.classList.add("gone");
      setTimeout(function(){ if(load.parentNode) load.parentNode.removeChild(load); }, 600);
    }, 900);
  }

  /* ---------------- quiz card entrance + LED pulse + confetti ---------------- */
  function quizFeedback(){
    if(prefersReduced()) return;
    var holder = document.getElementById("quizHolder");
    if(!holder) return;

    try{
      var io = new MutationObserver(function(){
        var card = holder.querySelector(".quiz-card:not([data-anim-done])");
        if(card){
          card.setAttribute("data-anim-done", "1");
          if(hasAnime){
            anime({
              targets: card,
              opacity: [0, 1],
              translateY: [12, 0],
              scale: [0.98, 1],
              duration: 360,
              easing: "easeOutCubic"
            });
          }
        }
      });
      io.observe(holder, { childList: true, subtree: true });

      if(hasAnime){
        var pulseIO = new MutationObserver(function(){
          var c = holder.querySelector(".quiz-opt.correct:not([data-pulsed]), .quiz-opt.wrong:not([data-pulsed])");
          if(c){
            c.setAttribute("data-pulsed", "1");
            anime({
              targets: c,
              scale: [1, 1.025, 1],
              duration: 300,
              easing: "easeOutQuad"
            });
          }
        });
        pulseIO.observe(holder, { childList: true, subtree: true, attributes: true });
      }
    }catch(e){}
  }

  function confetti(el){
    if(prefersReduced() || !hasAnime) return;
    var rect = el.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    var colors = ["#2f6fed", "#ff9f1c", "#1fb26a", "#9b59b6", "#4f8fe6", "#ffd166"];
    var parts = [];
    for(var i = 0; i < 26; i++){
      var s = document.createElement("span");
      s.className = "lp-confetti";
      s.style.width = s.style.height = (8 + Math.random() * 6) + "px";
      s.style.background = colors[i % colors.length];
      s.style.left = cx + "px";
      s.style.top = cy + "px";
      document.body.appendChild(s);
      parts.push(s);
    }
    anime({
      targets: parts,
      translateX: function(){ return anime.random(-220, 220); },
      translateY: function(){ return anime.random(-160, -30); },
      rotate: function(){ return anime.random(-180, 180); },
      opacity: { value: [1, 0], duration: 900 },
      duration: function(){ return anime.random(700, 1300); },
      easing: "easeOutCubic",
      delay: anime.stagger(12),
      complete: function(){ parts.forEach(function(p){ if(p.parentNode) p.parentNode.removeChild(p); }); }
    });
  }

  // ---------------- results screen sparkle ----------------
  function observeResults(){
    var holder = document.getElementById("quizHolder");
    if(!holder) return;
    try{
      var io = new MutationObserver(function(){
        var res = holder.querySelector(".quiz-result:not([data-sparkled])");
        if(res){
          res.setAttribute("data-sparkled", "1");
          /* score: from the ring fill's data-pct */
          var fill = res.querySelector(".result-fill");
          var pct = fill ? parseFloat(fill.getAttribute("data-pct") || "0") : NaN;
          if(isNaN(pct)){
            var scoreEl = res.querySelector(".score");
            var m = scoreEl && scoreEl.textContent.trim().match(/(\d+)\s*\/\s*(\d+)/);
            if(m && parseInt(m[2],10) > 0) pct = m[1]/m[2]*100;
          }
          if(pct >= 60) confetti(res);
          var ring = res.querySelector(".result-fill");
          if(ring && hasAnime){
            anime({ targets: ring.parentNode.querySelector(".result-ring"), scale: [0.7, 1], duration: 420, easing: "easeOutBack" });
          }
        }
      });
      io.observe(holder, { childList: true, subtree: true });
    }catch(e){}
  }

  /* ---------------- reading bar shimmer ---------------- */
  function readingBarGlow(){
    var bar = document.getElementById("readingBar");
    if(!bar || prefersReduced() || !hasAnime) return;
    anime({
      targets: bar,
      opacity: [0.6, 1],
      duration: 700,
      direction: "alternate",
      easing: "easeInOutSine",
      loop: true
    });
  }

  /* ---------------- shine on section titles (KokonutUI shimmer port) ---------------- */
  function shineTitles(){
    if(prefersReduced()) return;
    document.querySelectorAll(".hero-title, .section-title").forEach(function(el){
      el.classList.add("lp-shine");
    });
  }

  /* ---------------- magnetic attract buttons (KokonutUI attract-button port) ---------------- */
  function magneticButtons(){
    if(prefersReduced()) return;
    if(window.matchMedia && window.matchMedia("(hover: none)").matches) return;
    document.querySelectorAll(".btn, .pager-link").forEach(function(el){
      var raf = null;
      el.addEventListener("mousemove", function(e){
        if(raf) return;
        raf = requestAnimationFrame(function(){
          raf = null;
          var r = el.getBoundingClientRect();
          var dx = e.clientX - (r.left + r.width / 2);
          var dy = e.clientY - (r.top + r.height / 2);
          var pull = Math.min(1, Math.hypot(dx, dy) / 90);
          el.style.transform = "translate(" + (dx * 0.12) + "px," + (dy * 0.18) + "px)";
          el.style.setProperty("--mag", String(pull));
        });
      });
      el.addEventListener("mouseleave", function(){
        if(raf){ cancelAnimationFrame(raf); raf = null; }
        el.style.transform = "";
      });
    });
  }

  /* ---------------- hero scroll parallax (scroll + opacity) ---------------- */
  function heroParallax(){
    if(prefersReduced()) return;
    var hero = document.querySelector(".hero");
    if(!hero) return;
    var wrap = hero.querySelector(".wrap");
    if(!wrap) return;
    var ticking = false;
    window.addEventListener("scroll", function(){
      if(ticking) return;
      ticking = true;
      requestAnimationFrame(function(){
        ticking = false;
        var y = window.scrollY;
        if(y < window.innerHeight * 1.5){
          wrap.style.transform = "translateY(" + (y * 0.28) + "px)";
          wrap.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.9)));
        }
      });
    }, { passive: true });
  }

  /* ---------------- public init ---------------- */
  window.LPAnim = {
    animateCounters: animateCounters,
    confetti: confetti
  };

  onReady(function(){
    if(document.querySelector(".hero")) heroEntrance();
    blobFloat();
    if(document.querySelector(".readout-num")) animateCounters();
    if(document.querySelector("#subjectsGrid")) scrollReveal();
    if(document.querySelector("#topicGrid")) scrollReveal();
    if(document.querySelector(".notes-main")) scrollReveal();
    if(document.querySelector(".rules-grid")) scrollReveal();
    if(document.querySelector("#quizHolder")){ quizFeedback(); observeResults(); }
    if(document.getElementById("readingBar")) readingBarGlow();
    beamsBackground();
    spotlightTilt();
    typewriter();
    shineTitles();
    magneticButtons();
    heroParallax();
    bootLoader();
    watchdog(2200);
  });

})();