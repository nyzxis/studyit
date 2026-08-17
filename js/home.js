/* ============================================================
   LEARNING PORT — home.js (index.html)
   ============================================================ */

function renderSubjectsGrid(){
  const grid = document.getElementById("subjectsGrid");
  if(!grid) return;
  grid.innerHTML = "";

  SUBJECTS.forEach(subject=>{
    const { done, total } = subjectCompletion(subject);
    const pct = total ? Math.round((done/total)*100) : 0;
    const card = el("a","subject-card");
    card.href = "subject.html?id=" + encodeURIComponent(subject.id);
    card.innerHTML = `
      <div class="port-holes"><span></span><span></span><span></span></div>
      ${iconMarkup(subject.id, 34)}
      <div class="subject-code" style="margin-top:14px;">${esc(subject.code)}</div>
      <div class="subject-name">${esc(subject.name)}</div>
      <div class="subject-tagline">${esc(subject.tagline)}</div>
      <div class="subject-bar"><i style="width:${pct}%"></i></div>
      <div class="subject-meta">
        <span>${subject.topics.length} topics docked</span>
        <span>${done}/${total} connected</span>
      </div>
    `;
    grid.appendChild(card);
  });

  const addCard = el("div","subject-card add");
  addCard.innerHTML = `<span style="font-size:22px;">+</span><span>More subjects plug in here</span>`;
  grid.appendChild(addCard);

  document.getElementById("heroSubjectCount").textContent = SUBJECTS.length;
  const totalTopics = SUBJECTS.reduce((a,s)=>a+s.topics.length,0);
  const totalQuizzes = SUBJECTS.reduce((a,s)=>a+s.topics.filter(t=>t.quiz && t.quiz.length).length,0);
  document.getElementById("heroTopicCount").textContent = totalTopics;
  document.getElementById("heroQuizCount").textContent = totalQuizzes;

  const stats = overallStats();
  const left = stats.total - stats.done;
  const portsLeft = document.getElementById("heroPortsLeft");
  if(portsLeft) portsLeft.textContent = left > 0 ? left : "0";

  const continueBtn = document.getElementById("continueBtn");
  const up = nextUpTopic();
  if(continueBtn && up){
    continueBtn.href = "topic.html?subject=" + encodeURIComponent(up.subject.id) + "&topic=" + encodeURIComponent(up.topic.id);
  }
}

document.addEventListener("DOMContentLoaded", renderSubjectsGrid);
