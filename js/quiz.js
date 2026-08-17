/* ============================================================
   LEARNING PORT — quiz.js (quiz.html?subject=..&topic=..)
   ============================================================ */

document.addEventListener("DOMContentLoaded", ()=>{
  const subjectId = getParam("subject") || SUBJECTS[0].id;
  const topicId = getParam("topic");
  const subject = SUBJECTS.find(s=>s.id===subjectId) || SUBJECTS[0];
  const topic = subject.topics.find(t=>t.id===topicId) || subject.topics[0];

  document.title = "Self-test · " + topic.title + " — Learning Port";
  document.getElementById("crumbSubject").textContent = subject.name;
  document.getElementById("crumbSubject").href = "subject.html?id=" + subject.id;
  document.getElementById("crumbTopic").textContent = topic.title;
  document.getElementById("crumbTopic").href = "topic.html?subject=" + subject.id + "&topic=" + topic.id;
  document.getElementById("backToNotes").href = "topic.html?subject=" + subject.id + "&topic=" + topic.id;

  document.getElementById("quizIcon").innerHTML = ICONS[topic.id] || ICONS[subject.id] || ICONS.economics;
  document.getElementById("quizEyebrow").textContent = subject.name.toUpperCase() + " · TOPIC " + topic.num;
  document.getElementById("quizTitle").textContent = "Self-test: " + topic.title;

  if(!topic.quiz || !topic.quiz.length){
    document.getElementById("quizHolder").innerHTML =
      "<div class=\"quiz-card quiz-result\"><div class=\"score-pct\">No self-test yet</div>" +
      "<p>This topic is notes-only. There aren't any practice questions docked for it yet.</p>" +
      "<a class=\"btn btn-primary\" href=\"topic.html?subject=" + encodeURIComponent(subject.id) + "&topic=" + encodeURIComponent(topic.id) + "\">Back to notes</a></div>";
    return;
  }

  /* expand with generated question types (term-match, true/false, fill-blank) */
  const expandedTopic = Object.assign({}, topic, {
    quiz: (window.LPQG ? window.LPQG.expand(topic) : topic.quiz.map(q => Object.assign({ type: "mcq" }, q)))
  });

  renderQuiz(subject, expandedTopic, document.getElementById("quizHolder"));
});

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function renderQuiz(subject, topic, holder){
  let qIndex = 0, score = 0, answered = false;
  const answers = [];

  const flameIco = '<svg class="flame-ico" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4.5 13.5H11L9.5 22 19 9.5h-6.5z"/></svg>';
  const timerIco = '<svg class="timer-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/></svg>';

  const track = el("div","quiz-track");
  track.innerHTML = "<i></i>";
  const progressEl = el("div","quiz-progress");
  const topbar = el("div","quiz-topbar");
  topbar.innerHTML = `
    <span class="quiz-top-stat">${timerIco} <b id="topTimer">0s</b></span>
    <span class="quiz-top-stat">${flameIco} <b id="topStreak">0</b> <span>streak</span></span>
  `;
  const cardHolder = el("div");
  holder.appendChild(topbar);
  holder.appendChild(track);
  holder.appendChild(progressEl);
  holder.appendChild(cardHolder);

  const fill = track.querySelector("i");
  let currentKey = null;
  let startedAt = Date.now(), streak = 0, maxStreak = 0, totalMs = 0;

  let timerInt = null;
  function paintTop(){
    const t = document.getElementById("topTimer");
    if(t) t.textContent = Math.max(0, Math.round((Date.now()-startedAt)/1000)) + "s";
    const s = document.getElementById("topStreak");
    if(s) s.textContent = streak;
  }
  function startTimer(){
    startedAt = Date.now();
    paintTop();
    clearInterval(timerInt);
    timerInt = setInterval(paintTop, 1000);
  }
  function stopTimer(){
    clearInterval(timerInt);
    const t = document.getElementById("topTimer");
    if(t) t.textContent = "0s";
  }

  function paintProgress(){
    progressEl.innerHTML = `<span>Question ${qIndex+1} of ${topic.quiz.length}</span><span>Score: ${score}</span>`;
    fill.style.width = ((qIndex + (answered ? 1 : 0)) / topic.quiz.length * 100) + "%";
  }

  const TYPE_BADGES = { mcq: "Multiple choice", term: "Key term", tf: "True or false", blank: "Fill the blank" };

  function renderQuestion(){
    answered = false;
    const q = topic.quiz[qIndex];
    const qType = q.type || "mcq";
    const isBlank = qType === "blank";
    const order = isBlank ? [] : shuffle(q.options.map((_,i)=>i));
    const correctPos = isBlank ? -1 : order.indexOf(q.answer);
    paintProgress();
    paintTop();
    startTimer();
    document.getElementById("topStreak").textContent = streak;
    currentKey = onKey;

    const card = el("div","quiz-card");

    /* type badge */
    const badge = el("div","q-type-badge q-type-" + qType, TYPE_BADGES[qType] || "Question");
    card.appendChild(badge);

    card.appendChild(el("p","quiz-q", esc(q.q)));

    let optsWrap = null, blankInput = null, blankBtn = null;

    if (isBlank) {
      /* ---------- fill-the-blank UI ---------- */
      const wrap = el("div","blank-wrap");
      blankInput = el("input","blank-input");
      blankInput.type = "text";
      blankInput.placeholder = "Type the key term…";
      blankInput.setAttribute("autocomplete","off");
      blankInput.setAttribute("autocapitalize","off");
      blankInput.setAttribute("spellcheck","false");
      blankBtn = el("button","btn btn-primary blank-check","Check");
      wrap.appendChild(blankInput);
      wrap.appendChild(blankBtn);
      card.appendChild(wrap);
      blankInput.addEventListener("keydown", (e)=>{
        if(e.key === "Enter"){ e.preventDefault(); answerQuestion(); }
      });
      blankBtn.addEventListener("click", ()=> answerQuestion());
      setTimeout(()=> blankInput.focus(), 60);
    } else {
      /* ---------- options UI (mcq / term / tf) ---------- */
      optsWrap = el("div","quiz-options");
      const letters = ["A","B","C","D"];
      order.forEach((origIdx, pos)=>{
        const optBtn = el("button","quiz-opt");
        optBtn.innerHTML = `<span class="opt-letter">${letters[pos]}</span><span>${esc(q.options[origIdx])}</span>`;
        optBtn.addEventListener("click", ()=> answerQuestion(pos));
        optsWrap.appendChild(optBtn);
      });
      card.appendChild(optsWrap);
    }

    const explainEl = el("div","quiz-explain", `<strong>Why:</strong> ${esc(q.explain)}`);
    card.appendChild(explainEl);

    const footer = el("div","quiz-footer hidden");
    const nextBtn = el("button","btn btn-primary",
      qIndex === topic.quiz.length-1 ? "See results" : "Next question →");
    nextBtn.addEventListener("click", ()=>{
      if(qIndex === topic.quiz.length-1){
        recordQuizScore(subject.id, topic.id, score, topic.quiz.length);
        renderResult();
      }else{
        qIndex++;
        renderQuestion();
      }
    });
    footer.appendChild(nextBtn);
    card.appendChild(footer);

    cardHolder.innerHTML = "";
    cardHolder.appendChild(card);

    function answerQuestion(pos){
      if(answered) return;
      answered = true;
      totalMs += (Date.now() - startedAt);
      stopTimer();
      let correct = false;

      if (isBlank) {
        const val = (blankInput.value || "").trim().toLowerCase();
        const ok = (q.acceptable || [String(q.answerText).toLowerCase()]).some(a => {
          if (!a) return false;
          if (val === a) return true;
          /* tolerate small typo: 1 char edit distance for terms ≥ 6 chars */
          if (a.length >= 6 && Math.abs(val.length - a.length) <= 1) {
            let diff = 0, i = 0, j = 0;
            while (i < val.length && j < a.length) {
              if (val[i] !== a[j]) { diff++; if (diff > 1) return false; }
              i++; j++;
            }
            return diff <= 1;
          }
          return false;
        });
        correct = ok;
        blankInput.disabled = true; blankBtn.disabled = true;
        blankInput.classList.add(ok ? "correct" : "wrong");
        if (!ok) {
          const show = el("div","blank-answer", "Answer: <b>" + esc(q.answerText) + "</b>");
          card.insertBefore(show, explainEl);
        }
        answers[qIndex] = { blank: true, user: val, correct };
      } else {
        const pickedOrig = order[pos];
        correct = pickedOrig === q.answer;
        answers[qIndex] = { origIdx: pickedOrig, correct };
        const opts = optsWrap.querySelectorAll(".quiz-opt");
        opts.forEach((o, idx)=>{
          o.disabled = true;
          if(idx === correctPos) o.classList.add("correct");
          else if(idx === pos) o.classList.add("wrong");
        });
      }

      if(correct){ score++; streak++; maxStreak = Math.max(maxStreak, streak); if(window.LPSnd) window.LPSnd.play("correct"); }
      else{ streak = 0; if(window.LPSnd) window.LPSnd.play("wrong"); }
      document.getElementById("topStreak").textContent = streak;
      explainEl.classList.add("show");
      paintProgress();
      footer.classList.remove("hidden");
      nextBtn.focus();
    }

    function onKey(e){
      if(document.body.classList.contains("pal-open")) return;
      if(isBlank && !answered) return; /* typing handled by input */
      if(answered){
        if(e.key === "Enter" || e.key === "n" || e.key === "N"){ e.preventDefault(); nextBtn.click(); }
      }else{
        if(["1","2","3","4"].includes(e.key)){
          const pos = parseInt(e.key,10)-1;
          if(pos < q.options.length){ e.preventDefault(); answerQuestion(pos); }
        }else if(/^[a-dA-D]$/.test(e.key)){
          const pos = e.key.toLowerCase().charCodeAt(0) - 97;
          if(pos < q.options.length){ e.preventDefault(); answerQuestion(pos); }
        }
      }
    }
  }

  function renderResult(){
    currentKey = null;
    clearInterval(timerInt);
    const pct = Math.round(score/topic.quiz.length*100);
    const good = pct >= 60;
    track.style.display = "none";
    progressEl.innerHTML = "";
    const box = el("div","quiz-card quiz-result");
    let msg;
    if(pct >= 90) msg = "Excellent — port locked in. You clearly own this topic.";
    else if(pct >= 60) msg = "Port connected — solid grasp of this topic.";
    else msg = "Not quite docked yet — review the notes and try again.";

    const R = 52, C = 2*Math.PI*R;
    const secured = Math.round(totalMs/1000);
    const stars = Math.min(5, Math.max(1, Math.round(score/topic.quiz.length*5)));
    let starHtml = "";
    for(let st=0; st<5; st++){
      starHtml += st<stars
        ? '<svg class="star-on" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.2 6.9.8-5 4.6 1.3 6.8L12 17.2 5.9 20.4 7.2 13.6l-5-4.6 6.9-.8z"/></svg>'
        : '<svg class="star-off" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.2 6.9.8-5 4.6 1.3 6.8L12 17.2 5.9 20.4 7.2 13.6l-5-4.6 6.9-.8z"/></svg>';
    }

    box.innerHTML = `
      <div class="result-wrap">
        <div>
          <svg class="ring result-ring" width="150" height="150" viewBox="0 0 120 120" role="img" aria-label="${pct}%">
            <circle class="ring-track" cx="60" cy="60" r="${R}" style="stroke:var(--line-soft);stroke-width:11;"/>
            <circle class="ring-fill result-fill" cx="60" cy="60" r="${R}" data-pct="${pct}"
                    style="stroke:${good ? "var(--led)" : "var(--signal)"};stroke-width:11;stroke-dasharray:${C};stroke-dashoffset:${C};"/>
            <text x="50%" y="48%" class="ring-num result" style="font-size:26px;font-weight:800;" dominant-baseline="central" text-anchor="middle">0%</text>
            <text x="50%" y="68%" style="font-size:10px;fill:var(--ink-faint);font-family:var(--mono);" text-anchor="middle">${score}/${topic.quiz.length}</text>
          </svg>
          <div class="result-stars">${starHtml}</div>
        </div>
        <div class="result-copy" style="text-align:left;">
          <div class="result-time">Secured in ${secured}s${maxStreak>1 ? " · longest streak " + maxStreak : ""}</div>
          <p>${msg}</p>
          <div class="result-peaks">
            ${maxStreak>1 ? `<div class="result-peak peak-streak"><b>${maxStreak}</b><span>max streak</span></div>` : ""}
            <div class="result-peak peak-time"><b>${Math.round(secured/Math.max(1,score))}s</b><span>per answer</span></div>
            <div class="result-peak"><b>${totalMs>0 ? Math.round(totalMs/1000)+"s" : "—"}</b><span>total time</span></div>
          </div>
        </div>
      </div>
    `;
    const fill = box.querySelector(".result-fill");
    function setRing(v){
      fill.style.strokeDashoffset = C*(1 - v/100);
      const num = box.querySelector(".ring-num.result");
      if(num) num.textContent = Math.round(v) + "%";
    }
    if(window.anime){
      const o = { v: 0 };
      window.anime({ targets:o, v:pct, duration:1200, easing:"easeOutExpo", update:function(){ setRing(o.v); } });
    }else{
      setRing(pct);
    }

    const missed = [];
    topic.quiz.forEach((q, i)=>{
      const a = answers[i];
      if(!a || !a.correct) missed.push({ q, a });
    });
    if(missed.length){
      const review = el("div","quiz-review");
      review.appendChild(el("h4", null, "Review missed (" + missed.length + ")"));
      missed.forEach(({q, a})=>{
        const item = el("div","review-item");
        const isBlankQ = (q.type || "mcq") === "blank";
        const correctText = isBlankQ ? q.answerText : q.options[q.answer];
        const userText = isBlankQ
          ? (a && a.user ? a.user : "No answer given")
          : (a ? q.options[a.origIdx] : "No answer given");
        item.innerHTML = `
          <div class="rv-q">${esc(q.q).replace(/\n/g, "<br>")}</div>
          <div class="rv-line"><b>Your answer:</b><span class="${a && a.correct ? "rv-ok":"rv-no"}">${esc(userText)}</span></div>
          <div class="rv-line"><b>Correct:</b><span class="rv-ok">${esc(correctText)}</span></div>
          <div class="rv-line"><b>Why:</b><span>${esc(q.explain)}</span></div>
        `;
        review.appendChild(item);
      });
      box.appendChild(review);
    }

    const retryBtn = el("button","btn btn-ghost", "Retake quiz");
    retryBtn.addEventListener("click", ()=>{
      qIndex = 0; score = 0; answers.length = 0;
      streak = 0; maxStreak = 0; totalMs = 0;
      track.style.display = "block";
      renderQuestion();
    });
    const notesBtn = el("a","btn btn-primary", "Back to notes");
    notesBtn.href = "topic.html?subject=" + subject.id + "&topic=" + topic.id;
    notesBtn.style.marginLeft = "10px";
    box.appendChild(retryBtn);
    box.appendChild(notesBtn);
    cardHolder.innerHTML = "";
    cardHolder.appendChild(box);
    paintHeaderChrome();
    if(window.LPBadges) setTimeout(()=> window.LPBadges.recheck(), 1200);
  }

  document.addEventListener("keydown", (e)=>{
    if(currentKey) currentKey(e);
  });

  renderQuestion();
}
