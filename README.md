# Learning Port

A calm, focused study hub for keeping coursework notes, self-tests and a focus timer in one place. Built for my own study sessions — no sign-up, no server, progress lives in your browser.

**Live:** [studyitpi.vercel.app](https://studyitpi.vercel.app)

---

## What it is

A single-person study dock. Plug in a subject, read through topics, test yourself, and track where you stand — all offline-friendly and saved locally.

The design language is what I call **The Quiet Dock**: paper canvas background, one restrained indigo accent, editorial type pairing (Sora + Newsreader italic + JetBrains Mono), spring-physics motion and ultra-diffuse shadows. Nothing loud. Nothing that fights for your attention while you're trying to learn.

## What's inside

- **Subjects** — each subject is a dock. Pick one and it opens its own topic list.
- **Topic notes** — wide reading pages with a table of contents, key points called out, and tables where they matter. Reading progress is tracked per topic.
- **Self-tests** — every topic has a quiz. Answer with 1-4 or A-D, Enter to move on. You get the correct answer and a short explanation right away.
- **Pomodoro timer** — focus timer live on the dashboard. Keep it running while you read.
- **Progress** — per-subject rings, an overall completion bar, a study activity heatmap, and a streak counter.
- **Badges** — small milestones for reading, testing and connecting topics.
- **Quick jump** — Ctrl+K from anywhere to jump to a subject or topic.
- **Spotlight search** — fuzzy search across subjects and topics.

## Tech

Plain HTML, CSS and JavaScript. No frameworks, no build step, no bundler. Everything is hand-written and runs in the browser.

- `index.html` — home / dashboard
- `subject.html` — subject overview with topic grid
- `topic.html` — full notes page with TOC and reading progress
- `quiz.html` — self-test renderer
- `css/style.css` — design system, layout, components
- `css/enhance.css` — richer interactions and polish
- `css/motion.css` — spring-physics motion layer
- `js/data.js` — subject and topic content (add new subjects by pushing into the `SUBJECTS` array)
- `js/*.js` — feature modules: home, dashboard, topic, quiz, notes, pomodoro, achievements, reveal, spotlight, smart, motion, icons, common, boot

Animation runs on **anime.js v4.5.0** (bundled offline-safe at `js/vendor/anime.umd.min.js`).

Progress is saved in `localStorage` — nothing leaves your machine.

## Adding your own content

Open `js/data.js` and add another object to the `SUBJECTS` array. Each subject needs an id, name, code, tagline, color, icon key, and a list of topics. Each topic needs an id, number, title, summary, and sections with heading + points. Topic content can include `important` flags on key points and `table` blocks for side-by-side data.

## Deployment

Pushing to `main` on GitHub triggers a Vercel deployment automatically — `vercel.json` is just `{ "version": 2 }`, no build step. The live site is [studyitpi.vercel.app](https://studyitpi.vercel.app).

## Status

Early. Three subjects docked, topics and self-tests in place, progress and timer working. It's my own study hub first — the shape will follow what I actually use.

Built for Dani's coursework. Started August 2026.
