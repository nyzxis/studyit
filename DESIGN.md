---
name: Learning Port
description: A calm, focused study hub for subjects, topics, notes, and self-tests with a Pomodoro timer and progress tracking.
colors:
  canvas: "#F7F6F3"
  canvas-raised: "#FFFFFF"
  canvas-sunken: "#F1EFEA"
  ink: "#1B1B1A"
  ink-secondary: "#53524E"
  ink-tertiary: "#8B8A84"
  ink-quaternary: "#B6B5AE"
  line: "#E8E6E0"
  line-soft: "#F0EEE9"
  accent: "#4F46E5"
  accent-soft: "#EEF0FE"
  accent-ink: "#3D38C9"
  done: "#3E7B52"
  done-soft: "#E9F2EB"
  warn: "#9A6A00"
  warn-soft: "#FBF3DC"
  danger: "#A63A3A"
  danger-soft: "#F9ECEC"
typography:
  display:
    fontFamily: "'Sora', system-ui, sans-serif"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  serif:
    fontFamily: "'Newsreader', Georgia, serif"
    fontWeight: 500
    fontStyle: italic
  mono:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontWeight: 500
    letterSpacing: "0.1em"
  body:
    fontFamily: "'Sora', system-ui, sans-serif"
    fontSize: "15.5px"
    lineHeight: 1.6
  label:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "10.5px"
    letterSpacing: "0.14em"
    textTransform: uppercase
rounded:
  xs: "5px"
  sm: "10px"
  md: "14px"
  lg: "20px"
  xl: "28px"
  pill: "999px"
spacing:
  container: "1120px"
  section-v: "64px"
  hero-v: "88px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.pill}"
    padding: "13px 22px"
    typography: "{typography.display}"
    fontWeight: 600
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    boxShadow: "0 2px 4px rgba(27,27,26,.03), 0 12px 32px rgba(27,27,26,.06)"
    transform: translateY(-1px)
  button-ghost:
    backgroundColor: "{colors.canvas-raised}"
    textColor: "{colors.ink}"
    borderColor: "{colors.line}"
    rounded: "{rounded.pill}"
    padding: "13px 22px"
  button-ghost-hover:
    borderColor: "{colors.ink-quaternary}"
    backgroundColor: "{colors.canvas-sunken}"
  nav-chip:
    backgroundColor: "{colors.canvas-sunken}"
    borderColor: "{colors.line}"
    rounded: "{rounded.pill}"
    padding: "7px 13px"
  card:
    backgroundColor: "{colors.canvas-raised}"
    borderColor: "{colors.line}"
    rounded: "{rounded.lg}"
    padding: "30px 28px"
    boxShadow: "0 1px 2px rgba(27,27,26,.03), 0 4px 16px rgba(27,27,26,.04)"
---

# Design System: Learning Port

## Overview

**Creative North Star: "The Quiet Dock"**

Learning Port reads like a well-lit study carrel: warm paper, restrained ink, and a single accent that behaves like a highlighter—present only where attention must go. The interface is structurally precise but atmospherically soft; it should feel like opening a favorite notebook, not checking a dashboard.

**Key Characteristics:**
- Warm neutral canvas with ultra-diffuse shadows; depth is tonal, not harsh.
- One restrained accent (indigo) used sparingly for emphasis and feedback.
- Editorial typography pairing: geometric display for structure, serif for emphasis, mono for metadata.
- Spring-physics motion; everything that moves feels physical, not digital.
- Pill-shaped navigation and controls; machined, confident, but never aggressive.

## Colors

Warm paper canvas with ink gradients and a single indigo accent. The palette is intentionally small; its power comes from restraint.

### Primary
- **Accent Indigo** (#4F46E5): Primary interactive emphasis. Used for focus states, active indicators, and the occasional highlight. Rarity is the point—this color appears on fewer than 10% of any screen's elements.

### Neutral
- **Warm Paper** (#F7F6F3): Page background. The dominant surface.
- **Raised Paper** (#FFFFFF): Elevated cards, panels, and sticky nav.
- **Sunken Paper** (#F1EFEA): Chips, hover states, and inset elements.
- **Ink** (#1B1B1A): Primary text and icon color.
- **Ink Secondary** (#53524E): Body text and secondary labels.
- **Ink Tertiary** (#8B8A84): Captions, metadata, and disabled states.
- **Ink Quaternary** (#B6B5AE): Borders, dividers, and subtle separators.
- **Line** (#E8E6E0): Structural borders and dividers.
- **Line Soft** (#F0EEE9): Inner dividers within raised surfaces.

### Semantic
- **Done Green** (#3E7B52): Completed states, success indicators, progress fill.
- **Warn Amber** (#9A6A00): Caution and pending states.
- **Danger Red** (#A63A3A): Errors and destructive actions.

### Named Rules
**The One-Voice Rule.** The primary accent is used on ≤10% of any given screen. Its rarity is the point.

## Typography

**Display Font:** Sora (with system-ui, sans-serif fallback)  
**Serif Font:** Newsreader (with Georgia, serif fallback)  
**Mono Font:** JetBrains Mono (with ui-monospace, monospace fallback)

Geometric clarity meets editorial warmth. Sora handles structure and hierarchy; Newsreader adds human emphasis at key moments; JetBrains Mono carries all metadata, labels, and numeric readouts.

### Hierarchy
- **Display** (Sora, 700, clamp(38px, 5.6vw, 62px), 1.04): Hero headlines and section titles. Tight tracking (-0.03em) for impact.
- **Headline** (Sora, 700, clamp(26px, 3.4vw, 36px), 1.1): Section headers.
- **Title** (Sora, 600, 16.5px, 1.2): Card titles and subject names.
- **Body** (Sora, 400, 15.5px, 1.6): Reading text. Max line length ~65ch for comprehension.
- **Label** (JetBrains Mono, 500, 10.5px, 0.14em, uppercase): Eyebrows, metadata, captions, and status chips.
- **Serif Emphasis** (Newsreader, 500, italic): Hero subheads and key emotional beats.
- **Data** (Sora, 800, 52px, 1): Quiz scores and achievement numbers. Tightest tracking (-0.04em).
- **Mono Small** (JetBrains Mono, 500, 10px, 0.14em, uppercase): Dense metadata (feature numbers, TOC labels, table captions).
- **Caption** (JetBrains Mono, 500, 9px, 0.1em, uppercase): Tip tags and micro-labels.

### Named Rules
**The Mono Metadata Rule.** Every piece of structural metadata (labels, counts, timestamps, status) lives in JetBrains Mono at 10.5px with 0.14em tracking and uppercase. This creates a quiet instrument-panel feel without adding visual weight.

## Layout

Editorial whitespace with a single contained column. The viewport is never fully edge-to-edge; content lives inside a 1120px max-width container with 28px gutters.

### Grid Behavior
- **Home:** Bento grid with asymmetric card sizing (hero, stats, ring, timer, next).
- **Subject/Topic:** Single-column reading layout with a sticky table-of-contents sidebar on wide viewports.
- **Quiz:** Centered single column, max-width 640px, optimized for focus.
- **Cards:** Grid layouts adapt from 3 columns (features) to 1 column (mobile) with 16px gaps.

### Spacing Rhythm
- Section vertical padding: 64px
- Hero top padding: 88px
- Card internal padding: 30px × 28px
- Component gaps: 12px–26px depending on density tier
- Navigation pill padding: 9px 10px 9px 18px

## Elevation & Depth

Ultra-diffuse shadows only. No hard-edged dropshadows. Depth is conveyed through layered surfaces (canvas → raised → sunken) and subtle border shifts, not dramatic shadow casting.

### Shadow Vocabulary
- **Ambient** (`--sh-1`): Default card and panel elevation. Barely perceptible.
- **Lifted** (`--sh-2`): Hover states and elevated cards. Noticeable but soft.
- **Floating** (`--sh-3`): Modals, overlays, and sticky elements.
- **Pop** (`--sh-pop`): Highest emphasis elements (active modals, alerts).

### Named Rules
**The Flat-By-Default Rule.** Surfaces rest flat. Shadows appear only as response to state (hover, focus, elevation) or as ambient depth for raised panels. Never use shadow as decoration.

## Shapes

Rounded, machined, and pill-forward. Corners are consistently curved; the system moves from tight (10px) to generous (28px) depending on the element's role.

### Radius Scale
- **Extra Small** (5px): Progress bars, heat cells, tip tags, micro-chips.
- **Small** (10px): Icon boxes, small chips, inline badges.
- **Medium** (14px): Default cards, inputs, standard containers.
- **Large** (20px): Feature cards, panels, major containers.
- **Extra Large** (28px): Hero cards and signature surfaces.
- **Pill** (999px): Buttons, navigation chips, progress indicators, and all interactive controls.
- **Micro** (2px): List bullets, subtle borders, and hairline dividers.

### Border Language
- 1px borders using `--line` for structural edges.
- `--line-soft` for inner dividers within raised surfaces.
- Dashed borders reserved for empty-state "add" actions only.
- Radius below 10px is used only for micro-elements (bars, cells, bullets); all interactive controls use 10px or pill.

## Components

### Navigation
- **Style:** Floating glass island. Sticky top, 14px from viewport edge, max-width 1120px, pill-shaped container with `backdrop-filter: blur(14px)`.
- **Brand:** 32px square mark (9px radius) with SVG icon, followed by "LEARNING PORT" in Sora 700 with mono subtitle.
- **Links:** Pill-shaped hover targets, 13px Sora 500, subtle background shift on hover.
- **Progress Chip:** Mono 11.5px chip with LED dot indicator.

### Buttons
- **Shape:** Fully rounded pills (999px radius).
- **Primary:** Ink background (#1B1B1A), canvas text, 13px Sora 600. Hover shifts to accent indigo with lifted shadow and -1px translateY. Active scales to 0.97.
- **Ghost:** Canvas-raised background, ink text, 1px line border. Hover shifts to sunken paper with quaternary border.
- **Motion:** Spring-physics transitions on all state changes (160ms standard, 320ms elevated).

### Cards / Containers
- **Shape:** Large radius (20px) by default. Medium (14px) for dense panels.
- **Background:** Raised paper (#FFFFFF) with 1px line border.
- **Shadow Strategy:** Ambient shadow (`--sh-1`) at rest; lifts to `--sh-2` on hover with -3px translateY.
- **Internal Padding:** 30px × 28px for feature cards; 22px × 20px for readout cells.

### Chips / Tags
- **Style:** Sunken paper background, line border, pill shape.
- **Typography:** Mono 11.5px, uppercase, 0.1em tracking.
- **State:** Background shifts between sunken and soft-accent depending on context.

### Readout / Instrument Panel
- **Style:** Raised card with instrument-panel header (colored dot indicators, mono label, uppercase tracking).
- **Grid:** 4-column grid for stat readouts; separators use `--line-soft`.
- **Numbers:** Sora 700, 30px, tight tracking (-0.03em).

### Bento Grid (Home)
- **Shape:** Mixed card sizes within a CSS grid. Hero card spans dominant width; stat cards uniform; ring and timer as signature elements.
- **Background:** Raised paper with line border and ambient shadow.
- **Reveal:** Scroll-triggered entrance with blur-to-clear and translateY spring animation.

### Icon Box
- **Shape:** Square with 12px radius for subject/topic icons; 9px for brand mark.
- **Background:** Sunken paper, no border, no shadow.
- **Size:** 44–46px default; 32px for brand mark.

## Do's and Don'ts

### Do:
- **Do** keep the accent indigo rare—use it for focus states, active indicators, and key CTAs only.
- **Do** use pill shapes (999px radius) for all interactive controls.
- **Do** maintain the warm neutral canvas; never introduce cool grays or pure black into the UI.
- **Do** use spring-physics motion for all transitions.
- **Do** keep mono metadata at 10.5px with 0.14em tracking and uppercase.
- **Do** use Newsreader italic for emotional emphasis in headlines only.
- **Do** use left-border accents (3px solid) on callout list items to signal importance without adding visual weight.

### Don't:
- **Don't** use the accent color on more than 10% of elements in any viewport.
- **Don't** use hard-edged shadows or drop-shadows with sharp falloff.
- **Don't** mix border-radius values on the same component type.
- **Don't** use pure black (#000) or pure white (#FFF) as text or background outside of specific component overrides.
- **Don't** use more than three font families in a single component or viewport.
- **Don't** use linear or ease-in-out transitions anywhere in the system.
- **Don't** use width-only transitions on elements that aren't progress indicators.
