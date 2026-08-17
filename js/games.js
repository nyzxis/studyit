/* ============================================================
   LEARNING PORT — games.js (mini-games for topic.html)
   Flashcards · Matching · Typing drill
   Renders into #studyGames panels using window.LPCurrent data.
   ============================================================ */
(function(){
  "use strict";
  if(typeof window === "undefined") return;

  var S = null, T = null;

  function shuffle(a){
    var arr = a.slice();
    for(var i = arr.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }
  function stk(game){
    var k = "lpGames:" + S.id + ":" + T.id + ":" + game;
    try{ return Number(localStorage.getItem(k) || 0); }catch(e){ return 0; }
  }
  function setBest(game, val){
    var k = "lpGames:" + S.id + ":" + T.id + ":" + game;
    try{
      var prev = Number(localStorage.getItem(k) || 0);
      if(val > prev){ localStorage.setItem(k, String(val)); return val; }
    }catch(e){}
    return null;
  }

  /* ---------- data helpers ---------- */
  function termsFrom(topic){
    var out = [];
    (topic.sections || []).forEach(function(sec){
      (sec.points || []).forEach(function(p){
        var important = typeof p === "object" && p.important;
        if(!important) return;
        var text = (typeof p === "object" ? p.t : p) || "";
        var parts = text.split(/\s*[—=]\s*/);
        if(parts.length >= 2){
          var term = parts[0].replace(/[.:]+$/,"").trim();
          var def = parts.slice(1).join(" — ").trim();
          if(term && def) out.push({ term: term, def: def });
        }
      });
    });
    var seen = {}, uniq = [];
    out.forEach(function(o){
      var k = o.term.toLowerCase().slice(0, 40);
      if(!seen[k]){ seen[k] = 1; uniq.push(o); }
    });
    return uniq;
  }

  function buildPairs(topic){
    var pairs = termsFrom(topic).slice(0, 8);
    if(pairs.length < 4 && topic.quiz){
      (topic.quiz || []).forEach(function(q){
        if(q.explain && q.options && q.options[q.answer] !== undefined){
          pairs.push({ term: q.q, def: q.explain });
        }
      });
    }
    if(pairs.length < 4 && topic.takeaways){
      (topic.takeaways || []).forEach(function(tk){
        var s = String(tk);
        var parts = s.split(/\s*:\s*/);
        if(parts.length >= 2) pairs.push({ term: parts[0].trim(), def: parts.slice(1).join(": ").trim() });
        else pairs.push({ term: s.slice(0, 40), def: s });
      });
    }
    return pairs;
  }

  /* ==================== FLASHCARDS ==================== */
  function renderFlash(panel){
    var deck = buildPairs(T);
    if(!deck.length){
      panel.innerHTML = '<p class="sg-empty">Nothing to flip yet — this topic has no key terms.</p>';
      return;
    }
    var best = stk("flash");
    var i = 0, got = 0;

    function paint(){
      var b = document.getElementById("fpBack");
      var f = document.getElementById("fpFront");
      var idx = document.getElementById("fpIdx");
      var g = document.getElementById("fpGot");
      var card = document.getElementById("flipCard");
      if(f) f.textContent = deck[i].term;
      if(b) b.textContent = deck[i].def;
      if(idx) idx.textContent = (i + 1) + "/" + deck.length;
      if(g) g.textContent = got;
      if(card) card.classList.remove("flipped");
    }

    panel.innerHTML =
      '<div class="flip-meta">card <b id="fpIdx">1/' + deck.length + '</b> · got <b id="fpGot">0</b> · best <b>' + best + '</b></div>' +
      '<div class="flip-deck"><div class="flip-card" id="flipCard" role="button" tabindex="0" aria-label="flashcard">' +
        '<div class="flip-inner">' +
          '<div class="flip-face front"><div><div class="fsmall">term</div><div class="fmain" id="fpFront"></div></div></div>' +
          '<div class="flip-face back"><div><div class="fsmall">meaning</div><div class="fmain" id="fpBack"></div></div></div>' +
        '</div>' +
      '</div></div>' +
      '<div class="flip-actions">' +
        '<button type="button" class="btn btn-ghost" id="fpNo">Still learning</button>' +
        '<button type="button" class="btn btn-primary" id="fpYes">Got it · +1</button>' +
      '</div>';

    paint();

    var card = document.getElementById("flipCard");
    function flip(){ if(card) card.classList.toggle("flipped"); }
    if(card){
      card.addEventListener("click", flip);
      card.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
    }

    function advance(gotIt){
      if(gotIt){
        got++;
        var nb = setBest("flash", got);
        if(nb) showToast("New best — " + nb + " cards!");
      }
      i++;
      if(i >= deck.length){
        panel.innerHTML =
          '<div class="sg-done">' +
            '<h4>Deck complete!</h4>' +
            '<p>You got ' + got + ' of ' + deck.length + ' cards this run.</p>' +
            '<button type="button" class="btn btn-primary" id="fpAgain">Play again</button>' +
          '</div>';
        document.getElementById("fpAgain").addEventListener("click", function(){ renderFlash(panel); });
        return;
      }
      paint();
    }

    var no = document.getElementById("fpNo");
    var yes = document.getElementById("fpYes");
    if(no) no.addEventListener("click", function(){ advance(false); });
    if(yes) yes.addEventListener("click", function(){ advance(true); });
  }

  /* ==================== MATCHING ==================== */
  function renderMatch(panel){
    var pairs = buildPairs(T).slice(0, 6);
    if(pairs.length < 4){
      panel.innerHTML = '<p class="sg-empty">Not enough terms to match yet.</p>';
      return;
    }
    var n = pairs.length;
    var best = stk("match");
    var mistakes = 0;

    var termCards = shuffle(pairs.map(function(p, i){ return { k: i, label: p.term }; }));
    var defCards  = shuffle(pairs.map(function(p, i){ return { k: i, label: p.def }; }));

    panel.innerHTML =
      '<div class="match-meta">pairs <b>' + n + '</b> · mistakes <b id="fpMistakes">0</b> · best <b>' + best + '</b></div>' +
      '<div class="match-board" id="matchBoard"></div>' +
      '<div class="match-actions"><button type="button" class="btn btn-ghost" id="mRestart">Restart</button></div>';

    var board = document.getElementById("matchBoard");
    var chosen = null, locked = false, found = 0;

    function cellHtml(c){
      return '<button type="button" class="match-card" data-kind="' + c.kind + '" data-k="' + c.k + '">' + esc(c.label) + '</button>';
    }
    board.innerHTML = termCards.map(function(c){ c.kind = "term"; return cellHtml(c); }).join("")
                    + defCards.map(function(c){ c.kind = "def"; return cellHtml(c); }).join("");

    board.addEventListener("click", function(ev){
      var btn = ev.target.closest ? ev.target.closest(".match-card") : null;
      if(!btn || locked || btn.classList.contains("found")) return;

      if(!chosen || chosen.classList.contains("found")){
        var all = board.querySelectorAll(".match-card");
        for(var x = 0; x < all.length; x++) all[x].classList.remove("wrong");
        chosen = btn;
        btn.classList.add("selected");
        return;
      }

      var a = chosen, b = btn;
      if(a === b) return;
      if(a.dataset.k === b.dataset.k && a.dataset.kind !== b.dataset.kind){
        a.classList.remove("selected");
        a.classList.add("found");
        b.classList.add("found");
        chosen = null;
        found++;
        if(found === n){
          var score = Math.max(0, n * 100 - mistakes * 10);
          var nb = setBest("match", score);
          panel.innerHTML =
            '<div class="sg-done">' +
              '<h4>All matched!</h4>' +
              '<p>Score: <b>' + score + '</b> with ' + mistakes + ' mistake' + (mistakes === 1 ? "" : "s") + '.</p>' +
              '<button type="button" class="btn btn-primary" id="mAgain">Play again</button>' +
            '</div>';
          if(nb) showToast("New matching best — " + nb + " points!");
          document.getElementById("mAgain").addEventListener("click", function(){ renderMatch(panel); });
          return;
        }
      }else{
        mistakes++;
        var mb = document.getElementById("fpMistakes");
        if(mb) mb.textContent = mistakes;
        a.classList.add("wrong");
        b.classList.add("wrong");
        a.classList.remove("selected");
        locked = true;
        chosen = null;
        setTimeout(function(){
          a.classList.remove("wrong");
          b.classList.remove("wrong");
          locked = false;
        }, 380);
      }
    });

    var r = document.getElementById("mRestart");
    if(r) r.addEventListener("click", function(){ renderMatch(panel); });
  }

  /* ==================== TYPING DRILL ==================== */
  function renderType(panel){
    var sentences = [];
    (T.takeaways || []).forEach(function(tk){ sentences.push(String(tk)); });
    (termsFrom(T) || []).slice(0, 6).forEach(function(p){ sentences.push(p.def + " (" + p.term + ")."); });
    if(!sentences.length){
      panel.innerHTML = '<p class="sg-empty">Nothing to type yet.</p>';
      return;
    }

    var best = stk("type");
    var target = sentences[Math.floor(Math.random() * sentences.length)];
    var started = false, t0 = 0, elapsed = 0, done = false, timer = null;

    panel.innerHTML =
      '<div class="type-meta">goal: type it fast &amp; accurately · best <b>' + (best ? best + " wpm" : "—") + '</b></div>' +
      '<div class="type-target" id="typeTarget"></div>' +
      '<input class="type-input" id="typeInput" type="text" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="Start typing to begin the timer…">' +
      '<div class="type-stats">' +
        '<span>time <b id="tt">0s</b></span>' +
        '<span>accuracy <b id="ta">—</b></span>' +
        '<span>wpm <b id="tw">—</b></span>' +
      '</div>' +
      '<div class="match-actions"><button type="button" class="btn btn-ghost" id="tRestart">New sentence</button></div>';

    var zone = document.getElementById("typeTarget");
    var input = document.getElementById("typeInput");

    function paintZone(){
      var typed = input.value;
      var htmlarr = [];
      var correct = 0;
      for(var i = 0; i < target.length; i++){
        var tc = target.charAt(i);
        var uc = i < typed.length ? typed.charAt(i) : null;
        if(uc === null) htmlarr.push('<span class="pending"></span>');
        else if(uc === tc){ htmlarr.push('<span class="ok">' + esc(tc) + '</span>'); correct++; }
        else htmlarr.push('<span class="bad">' + esc(tc) + '</span>');
      }
      zone.innerHTML = htmlarr.join("");
      return correct;
    }

    function finish(){
      if(done) return;
      done = true;
      clearInterval(timer);
      elapsed = Math.max(0.5, (Date.now() - t0) / 1000);
      var len = input.value.length;
      var correct = 0;
      for(var i = 0; i < target.length; i++){
        if(input.value.charAt(i) === target.charAt(i)) correct++;
      }
      var acc = len ? Math.round((correct / target.length) * 100) : 0;
      var words = target.split(/\s+/).length;
      var wpm = Math.round(words / (elapsed / 60));

      var nbWpm = setBest("type", wpm);
      var ttz = document.getElementById("tt");
      var tta = document.getElementById("ta");
      var ttw = document.getElementById("tw");
      if(ttz) ttz.textContent = elapsed.toFixed(1) + "s";
      if(tta) tta.textContent = acc + "%";
      if(ttw) ttw.textContent = wpm + " wpm";
      input.disabled = true;
      if(nbWpm) showToast("New typing best — " + nbWpm + " wpm!");
    }

    input.addEventListener("input", function(){
      if(done) return;
      if(!started){
        started = true;
        t0 = Date.now();
        timer = setInterval(function(){
          var el = document.getElementById("tt");
          if(el) el.textContent = Math.max(0, (Date.now() - t0) / 1000).toFixed(1) + "s";
        }, 100);
      }
      if(input.value.length >= target.length && input.value === target){
        finish();
      }else{
        paintZone();
      }
    });

    paintZone();

    var r = document.getElementById("tRestart");
    if(r) r.addEventListener("click", function(){ renderType(panel); });
  }

  /* ---------- boot: tab switching ---------- */
  document.addEventListener("DOMContentLoaded", function(){
    var sec = document.getElementById("studyGames");
    if(!sec) return;
    if(window.LPCurrent && window.LPCurrent.subject && window.LPCurrent.topic){
      S = window.LPCurrent.subject;
      T = window.LPCurrent.topic;
    }else{
      return;
    }

    var tabs = document.getElementById("sgTabs");
    var panels = sec.querySelectorAll(".sg-panel");

    function active(game){
      var idx = { flash: 0, match: 1, type: 2 }[game] || 0;
      panels.forEach(function(p, i){
        p.classList.toggle("active", i === idx);
      });
      tabs.querySelectorAll(".sg-tab").forEach(function(t){
        t.classList.toggle("active", t.dataset.game === game);
      });
      if(game === "flash") renderFlash(panels[0]);
      else if(game === "match") renderMatch(panels[1]);
      else renderType(panels[2]);
    }

    tabs.addEventListener("click", function(ev){
      var t = ev.target.closest ? ev.target.closest(".sg-tab") : null;
      if(t) active(t.dataset.game);
    });

    active("flash");
  });
})();