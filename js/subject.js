/* ============================================================
   LEARNING PORT — subject.js (subject.html?id=economics)
   ============================================================ */

function buildCardLink(subject, item, label){
  const read = topicIsRead(subject.id, item.id);
  const quiz = bestQuizScore(subject.id, item.id);
  const passed = quiz && quiz.score/quiz.total >= 0.6;

  const card = el("a","topic-card");
  card.href = "topic.html?subject=" + encodeURIComponent(subject.id) + "&topic=" + encodeURIComponent(item.id);
  card.innerHTML = `
    ${iconMarkup(item.id, 44)}
    <div class="topic-card-body">
      <div class="topic-card-num">${label} ${item.num}</div>
      <div class="topic-card-title">${esc(item.title)}</div>
      <div class="topic-card-summary">${esc(item.summary)}</div>
      <div class="topic-card-status">
        <span class="led ${passed && read ? "on":""}"></span>
        ${read ? "Reviewed" : "Not started"}${quiz ? " · Best score " + quiz.score + "/" + quiz.total : ""} · ${item.quiz && item.quiz.length ? item.quiz.length + " self-test Qs" : "notes only"}
      </div>
    </div>
  `;
  return card;
}

document.addEventListener("DOMContentLoaded", ()=>{
  const subjectId = getParam("id") || SUBJECTS[0].id;
  const subject = SUBJECTS.find(s=>s.id===subjectId) || SUBJECTS[0];

  document.title = subject.name + " — Learning Port";
  document.getElementById("crumbSubject").textContent = subject.name;
  document.getElementById("subjectCode").textContent = subject.code + " · " + subject.tagline;
  document.getElementById("subjectName").textContent = subject.name;
  document.getElementById("subjectTagline").textContent = subject.tagline;
  document.getElementById("subjectIcon").innerHTML = ICONS[subject.id] || ICONS.economics;

  const { done, total } = subjectCompletion(subject);
  document.getElementById("subjectProgressChip").innerHTML = `<b>${done}/${total}</b> ports connected`;
  document.getElementById("subjectProgressBar").style.width = (total ? Math.round((done/total)*100) : 0) + "%";
  const pct = total ? Math.round(done/total*100) : 0;
  const ring = document.getElementById("subjectRing");
  const ringNum = document.getElementById("subjectRingNum");
  if(ring && ringNum){
    ring.style.transition = "stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)";
    ring.dataset.pct = pct;
    ring.style.strokeDashoffset = (131.94689145077132*(1 - pct/100));
    ringNum.textContent = pct + "%";
    ring.style.stroke = pct >= 100 ? "var(--led)" : (subject.color || "var(--signal)");
    if(window.anime){
      const ringObj = { v: 0 };
      window.anime({ targets:ringObj, v:pct, duration:1100, easing:"easeOutExpo",
        update:function(){
          ring.style.strokeDashoffset = 131.94689145077132*(1 - ringObj.v/100);
          ringNum.textContent = Math.round(ringObj.v) + "%";
        }});
    }
  }

  const grid = document.getElementById("topicGrid");
  const hasTabs = !!(subject.chapters && subject.chapters.length) || !!(subject.simple && subject.simple.length);
  const simpleSet = (subject.simple && subject.simple.length) ? subject.simple : subject.topics;
  const detailedSet = (subject.chapters && subject.chapters.length) ? subject.chapters : subject.topics;
  const detailedLabel = subject.chaptersLabel || subject.detailedLabel || "Detailed";
  const detailedWord = (subject.chapters && subject.chapters.length) ? "CHAPTER" : "TOPIC";
  const hasFormulas = !!(subject.formulaSheet && subject.formulaSheet.length);

  simpleSet.forEach(topic=>{
    grid.appendChild(buildCardLink(subject, topic, "TOPIC"));
  });

  if(hasTabs){
    const noteText = (subject.chapters && subject.chapters.length)
      ? `Full chapter-by-chapter notes (${esc(detailedLabel)}) — more depth than the simple topic notes above.`
      : `Full topic notes with self-test quizzes — more depth than the simple summaries in the other tab.`;
    const detailWrap = el("div","dock-panel");
    detailWrap.innerHTML = `<p class="dock-note">${noteText}</p>`;
    const detailGrid = el("div","topic-card-grid");
    detailedSet.forEach(item=>{
      detailGrid.appendChild(buildCardLink(subject, item, detailedWord));
    });
    if(hasFormulas) detailGrid.appendChild(buildFormulaCard(subject));
    detailWrap.appendChild(detailGrid);
    grid.parentNode.insertBefore(detailWrap, grid.nextSibling);

    const tab = el("div","dock-tabs");
    tab.innerHTML = `
      <button type="button" class="dock-tab" data-dock="simple">Simple notes</button>
      <button type="button" class="dock-tab" data-dock="detailed">Detailed · ${esc(detailedLabel)}</button>
    `;
    const sectionHead = document.querySelector(".section-head");
    if(sectionHead) sectionHead.appendChild(tab);

    const defaultDock = subject.dockDefault === "detailed" ? "detailed" : "simple";
    const activeTab = tab.querySelector('[data-dock="' + defaultDock + '"]');
    activeTab.classList.add("active");
    if(defaultDock === "detailed"){
      grid.style.display = "none";
    }else{
      detailWrap.style.display = "none";
    }

    tab.addEventListener("click", (e)=>{
      const btn = e.target.closest(".dock-tab");
      if(!btn) return;
      tab.querySelectorAll(".dock-tab").forEach(b=> b.classList.toggle("active", b === btn));
      const showDetailed = btn.dataset.dock === "detailed";
      grid.style.display = showDetailed ? "none" : "";
      detailWrap.style.display = showDetailed ? "" : "none";
    });
  }else if(hasFormulas){
    grid.appendChild(buildFormulaCard(subject));
  }
});

function buildFormulaCard(subject){
  const card = el("a","topic-card");
  card.href = "topic.html?subject=" + encodeURIComponent(subject.id) + "&topic=formulas";
  card.innerHTML = `
    ${iconMarkup("formulas", 44)}
    <div class="topic-card-body">
      <div class="topic-card-num">REFERENCE</div>
      <div class="topic-card-title">Quick Formula Sheet</div>
      <div class="topic-card-summary">Every formula from the notes, in one place.</div>
      <div class="topic-card-status"><span class="led"></span> Reference page</div>
    </div>
  `;
  return card;
}