/* ============================================================
   LEARNING PORT — topic.js (topic.html?subject=..&topic=..)
   ============================================================ */

function pointHtml(text, important){
  let escaped = esc(text);
  if(important){
    const m = escaped.match(/^(.+?)\s[—=]\s/);
    if(m){
      const full = m[0];
      escaped = `<strong>${m[1]}</strong>${full.slice(m[1].length)}` + escaped.slice(full.length);
    }
  }
  return escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

document.addEventListener("DOMContentLoaded", ()=>{
  const subjectId = getParam("subject") || SUBJECTS[0].id;
  const topicId = getParam("topic");
  const subject = SUBJECTS.find(s=>s.id===subjectId) || SUBJECTS[0];

  document.getElementById("crumbSubject").textContent = subject.name;
  document.getElementById("crumbSubject").href = "subject.html?id=" + encodeURIComponent(subject.id);

  if(topicId === "formulas"){
    if(subject.formulaSheet && subject.formulaSheet.length){
      renderFormulaPage(subject);
    }else{
      window.location.href = "subject.html?id=" + encodeURIComponent(subject.id);
    }
  }else{
    const topics = subject.topics || [];
    const chapters = subject.chapters || [];
    const simple = subject.simple || [];
    const topic = topics.find(t=>t.id===topicId) || chapters.find(c=>c.id===topicId) || simple.find(s=>s.id===topicId) || topics[0];
    const isChapter = !!chapters.find(c=>c.id===topicId);
    const isSimple = !!simple.find(s=>s.id===topicId);
    renderTopicPage(subject, topic, isChapter, isSimple);
  }

  // reading progress bar
  const bar = document.getElementById("readingBar");
  if(bar){
    window.addEventListener("scroll", ()=>{
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (scrolled/max)*100 : 0) + "%";
    });
  }
});

function renderTopicPage(subject, topic, isChapter, isSimple){
  window.LPCurrent = { subject: subject, topic: topic };
  let collection, labelWord;
  if(isChapter){ collection = subject.chapters || []; labelWord = "CHAPTER"; }
  else if(isSimple){ collection = subject.simple || []; labelWord = "TOPIC"; }
  else { collection = subject.topics || []; labelWord = "TOPIC"; }
  document.title = topic.title + " — Learning Port";
  document.getElementById("crumbTopic").textContent = topic.title;
  document.getElementById("topicIcon").innerHTML = ICONS[topic.id] || ICONS[subject.id] || ICONS.economics;
  document.getElementById("topicEyebrow").textContent = subject.name.toUpperCase() + " · " + labelWord + " " + topic.num;
  document.getElementById("topicTitle").textContent = topic.title;
  document.getElementById("topicSummary").textContent = topic.summary;
  const quizLink = document.getElementById("quizLink");
  if(topic.quiz && topic.quiz.length){
    quizLink.href = "quiz.html?subject=" + subject.id + "&topic=" + topic.id;
  }else{
    quizLink.style.display = "none";
  }

  const quiz = bestQuizScore(subject.id, topic.id);
  if(quiz){
    const chip = document.getElementById("quizScoreChip");
    chip.style.display = "inline-flex";
    chip.innerHTML = `<span class="led ${quiz.score/quiz.total>=0.6 ? "on":""}"></span> Best score: ${quiz.score}/${quiz.total}`;
  }

  /* reading-time chip */
  const metaRow = document.querySelector(".topic-meta-row");
  const words = topic.sections.reduce((a,sec)=>{
    return a + (sec.heading?sec.heading.split(/\s+/).length:0) + (sec.points?sec.points.reduce((x,p)=>{ const s=(typeof p==="object"?p.t:p); return x+s.split(/\s+/).length; },0):0);
  }, 0);
  const mins = Math.max(1, Math.round(words/220));
  if(metaRow){
    const chip = el("span","progress-chip readtime-chip");
    chip.innerHTML = `${words} words · ~${mins} min read`;
    metaRow.appendChild(chip);
  }

  const main = document.getElementById("notesMain");
  const tocLinks = document.getElementById("tocLinks");
  main.innerHTML = "";
  tocLinks.innerHTML = "";

  topic.sections.forEach((sec, i)=>{
    const anchorId = "sec-" + i;
    const block = el("div","note-block");
    block.id = anchorId;
    if(sec.heading) block.appendChild(el("h4", null, esc(sec.heading)));
    if(sec.points && sec.points.length){
      const ul = el("ul");
      sec.points.forEach(p=>{
        const important = typeof p === "object" && p.important;
        const tip = typeof p === "object" && p.tip;
        const text = typeof p === "object" ? p.t : p;
        const cls = tip ? "tip" : (important ? "important" : null);
        const li = el("li", cls);
        const badge = tip ? `<span class="tip-tag">Exam Tips</span>` : (important ? `<span class="key-tag">KEY</span>` : "");
        li.innerHTML = badge + pointHtml(text, important);
        ul.appendChild(li);
      });
      block.appendChild(ul);
    }
    if(sec.table) block.appendChild(renderTable(sec.table));
    main.appendChild(block);

    if(sec.heading){
      const a = el("a", null, esc(sec.heading));
      a.href = "#" + anchorId;
      a.dataset.target = anchorId;
      tocLinks.appendChild(a);
    }
  });

  if(topic.takeaways && topic.takeaways.length){
    const box = el("div","key-takeaways");
    box.appendChild(el("h3", null, "Key takeaways"));
    const ul = el("ul");
    topic.takeaways.forEach(tk=> ul.appendChild(el("li", null, esc(tk))));
    box.appendChild(ul);
    main.appendChild(box);
  }

  // mark as reviewed
  const btn = document.getElementById("markDoneBtn");
  function paintBtn(){
    const read = topicIsRead(subject.id, topic.id);
    btn.textContent = read ? "✓ Marked as reviewed" : "Mark topic as reviewed";
    btn.classList.toggle("done", read);
  }
  paintBtn();
  btn.addEventListener("click", ()=>{
    toggleTopicRead(subject.id, topic.id);
    paintBtn();
    showToast(topicIsRead(subject.id, topic.id) ? (topic.quiz.length ? "Nice — topic reviewed. Now try the self-test." : "Nice — topic reviewed.") : "Unmarked — keep studying!");
  });

  // prev/next pager
  const idx = collection.findIndex(t=>t.id===topic.id);
  const prev = collection[idx-1];
  const next = collection[idx+1];
  const pager = document.getElementById("topicPager");
  pager.innerHTML = "";
  if(prev){
    const a = el("a","pager-link prev");
    a.href = "topic.html?subject=" + subject.id + "&topic=" + prev.id;
    a.innerHTML = `<div class="pager-dir">← Previous</div><div class="pager-title">${esc(prev.title)}</div>`;
    pager.appendChild(a);
  }else{
    pager.appendChild(el("span"));
  }
  if(next){
    const a = el("a","pager-link next");
    a.href = "topic.html?subject=" + subject.id + "&topic=" + next.id;
    a.innerHTML = `<div class="pager-dir">Next →</div><div class="pager-title">${esc(next.title)}</div>`;
    pager.appendChild(a);
  }else if(isChapter){
    pager.appendChild(dockPagerLink(subject, "All chapters →"));
  }else if(isSimple){
    pager.appendChild(dockPagerLink(subject, "All topics →"));
  }else if(subject.formulaSheet && subject.formulaSheet.length){
    const a = el("a","pager-link next");
    a.href = "topic.html?subject=" + subject.id + "&topic=formulas";
    a.innerHTML = `<div class="pager-dir">Next →</div><div class="pager-title">Quick Formula Sheet</div>`;
    pager.appendChild(a);
  }else{
    pager.appendChild(dockPagerLink(subject, "All topics →"));
  }

  // scroll-spy for TOC
  const links = Array.from(tocLinks.querySelectorAll("a"));
  if(links.length){
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        const link = tocLinks.querySelector(`a[data-target="${entry.target.id}"]`);
        if(!link) return;
        if(entry.isIntersecting){
          links.forEach(l=>l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-15% 0px -70% 0px" });
    topic.sections.forEach((sec,i)=>{
      if(sec.heading) observer.observe(document.getElementById("sec-"+i));
    });
  }

  // arrow-key navigation between topics
  const prevLink = pager && pager.querySelector(".pager-link.prev");
  const nextLink = pager && pager.querySelector(".pager-link.next");
  document.addEventListener("keydown", (e)=>{
    const typing = ["INPUT","TEXTAREA"].indexOf((e.target||{}).tagName) !== -1;
    if(typing) return;
    if(e.key === "ArrowLeft" && prevLink) window.location.href = prevLink.href;
    else if(e.key === "ArrowRight" && nextLink) window.location.href = nextLink.href;
  });
}

function renderFormulaPage(subject){
  window.LPCurrent = null;
  document.title = "Quick Formula Sheet — Learning Port";
  document.getElementById("crumbTopic").textContent = "Quick Formula Sheet";
  document.getElementById("topicIcon").innerHTML = ICONS.formulas;
  document.getElementById("topicEyebrow").textContent = subject.name.toUpperCase() + " · REFERENCE";
  document.getElementById("topicTitle").textContent = "Quick Formula Sheet";
  document.getElementById("topicSummary").textContent = "Every formula from the notes, docked in one place for quick lookup before a test.";
  document.getElementById("markDoneBtn").style.display = "none";
  document.getElementById("quizLink").style.display = "none";
  document.getElementById("toc").style.display = "none";

  const main = document.getElementById("notesMain");
  main.innerHTML = "";
  const grid = el("div","formula-grid");
  subject.formulaSheet.forEach(f=>{
    const parts = f.split(" = ");
    const item = el("div","formula-item");
    if(parts.length >= 2) item.innerHTML = `<b>${esc(parts[0])}</b> = ${esc(parts.slice(1).join(" = "))}`;
    else item.textContent = f;
    grid.appendChild(item);
  });
  main.appendChild(grid);
  main.style.maxWidth = "none";

  const pager = document.getElementById("topicPager");
  const last = subject.topics[subject.topics.length-1];
  const a = el("a","pager-link prev");
  a.href = "topic.html?subject=" + subject.id + "&topic=" + last.id;
  a.innerHTML = `<div class="pager-dir">← Back to</div><div class="pager-title">${esc(last.title)}</div>`;
  pager.appendChild(a);
  const b = el("a","pager-link next");
  b.href = "subject.html?id=" + subject.id;
  b.innerHTML = `<div class="pager-dir">All topics →</div><div class="pager-title">${esc(subject.name)} dock</div>`;
  pager.appendChild(b);
}

function dockPagerLink(subject, dirText){
  const a = el("a","pager-link next");
  a.href = "subject.html?id=" + encodeURIComponent(subject.id);
  a.innerHTML = `<div class="pager-dir">${dirText}</div><div class="pager-title">${esc(subject.name)} dock</div>`;
  return a;
}
