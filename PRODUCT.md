# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS/JS, served via `python -m http.server 8080` (local development). No build step or framework detected.

## Users

Primary user is the owner, studying for a specific course. Self-directed, single-user context; no multi-account or collaboration confirmed.

## Product Purpose

A calm, focused study hub that organizes coursework into subjects, topics, notes, and self-tests, with a Pomodoro timer and progress tracking. Built to reduce distraction while reading and testing knowledge.

## Positioning

Self-hosted, single-file static study dock that keeps notes, quizzes, and a focus timer in one place without accounts or syncing. (Inferred from incumbent implementation; not explicitly confirmed.)

## Operating Context

Used locally in a browser. Progress saved in localStorage. No backend or cloud services confirmed. The footer references "Dani's coursework," suggesting personal academic use.

## Capabilities and Constraints

Confirmed from codebase:
- Subject → topic → notes navigation
- Self-tests with instant feedback
- Pomodoro focus timer
- Progress and badges (localStorage)
- Keyboard shortcuts (e.g., Ctrl+K quick jump)

Not confirmed: real content/assets, future feature plans, or intended course scope.

## Brand Commitments

Name: **Learning Port**. Tagline variants seen in code: "focus study hub", "Plug in a subject. Read. Test. Lock it in." No other explicit brand assets or voice guidelines found.

## Evidence on Hand

Incumbent visual implementation present in `learning-port/`. No DESIGN.md. No confirmed assets, testimonials, or external content. Footer copy: "built for Dani's coursework."

## Product Principles

None explicitly confirmed. Incumbent design suggests: calm minimalism, distraction-free reading, instant feedback, local-only operation.

## Accessibility & Inclusion

No specific requirements confirmed. Incumbent implementation uses semantic HTML and standard contrast; not audited.
