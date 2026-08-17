/* ============================================================
   LEARNING PORT — logo & icon library (inline SVG, currentColor)
   ============================================================ */

const LOGO_SVG = `
<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="38" height="38" rx="10" fill="url(#lp-grad)"/>
  <path d="M13 27V13h6.2c3.3 0 5.6 2.1 5.6 5.2s-2.3 5.2-5.6 5.2H16v3.6h-3z" fill="#fff"/>
  <path d="M16 15.8v4.9h3.1c1.6 0 2.7-1 2.7-2.45s-1.1-2.45-2.7-2.45H16z" fill="url(#lp-grad)"/>
  <circle cx="29" cy="12" r="2.4" fill="#fff"/>
  <defs>
    <linearGradient id="lp-grad" x1="1" y1="1" x2="39" y2="39" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7c3aed"/>
      <stop offset="1" stop-color="#9b6bff"/>
    </linearGradient>
  </defs>
</svg>`;

/* Simple two-color line illustrations, one per Economics topic.
   Sized on a 64x64 canvas, currentColor for strokes, accent via var(--icon-accent) */
const ICONS = {
  t1: `<svg viewBox="0 0 64 64" fill="none"><path d="M8 48 L26 30 L36 40 L56 16" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 16h12v12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="26" cy="30" r="3" fill="var(--icon-accent)"/><circle cx="36" cy="40" r="3" fill="var(--icon-accent)"/></svg>`,

  t6: `<svg viewBox="0 0 64 64" fill="none"><rect x="10" y="34" width="9" height="20" rx="1.5" stroke="currentColor" stroke-width="3"/><rect x="27.5" y="22" width="9" height="32" rx="1.5" stroke="currentColor" stroke-width="3"/><rect x="45" y="10" width="9" height="44" rx="1.5" fill="var(--icon-accent)" stroke="var(--icon-accent)" stroke-width="3"/></svg>`,

  t7: `<svg viewBox="0 0 64 64" fill="none"><path d="M8 46 L22 32 L32 40 L54 14" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 14h14v14" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  t8: `<svg viewBox="0 0 64 64" fill="none"><path d="M10 26 L32 12 L54 26" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="10" y="26" width="44" height="4" fill="currentColor"/><rect x="14" y="30" width="5" height="18" fill="var(--icon-accent)"/><rect x="29.5" y="30" width="5" height="18" fill="var(--icon-accent)"/><rect x="45" y="30" width="5" height="18" fill="var(--icon-accent)"/><rect x="8" y="48" width="48" height="4" rx="1" fill="currentColor"/></svg>`,

  t9: `<svg viewBox="0 0 64 64" fill="none"><path d="M8 32h6l6-14 8 26 8-20 6 12h14" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="28" cy="44" r="2.5" fill="var(--icon-accent)"/><circle cx="36" cy="24" r="2.5" fill="var(--icon-accent)"/></svg>`,

  t10: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="22" stroke="currentColor" stroke-width="3"/><path d="M10 32h44M32 10c6 6 9 14 9 22s-3 16-9 22c-6-6-9-14-9-22s3-16 9-22z" stroke="currentColor" stroke-width="2.4"/><circle cx="32" cy="32" r="4" fill="var(--icon-accent)"/></svg>`,

  formulas: `<svg viewBox="0 0 64 64" fill="none"><rect x="10" y="10" width="44" height="44" rx="6" stroke="currentColor" stroke-width="3"/><path d="M20 24h24M20 32h16M20 40h20" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round"/></svg>`,

  economics: `<svg viewBox="0 0 64 64" fill="none"><circle cx="24" cy="40" r="14" stroke="currentColor" stroke-width="3"/><circle cx="40" cy="24" r="14" stroke="var(--icon-accent)" stroke-width="3"/></svg>`,

  thinking: `<svg viewBox="0 0 64 64" fill="none"><path d="M32 8c-9 0-15 6.5-15 14 0 4 1.8 7.4 4.8 9.8-1.4 4.6-3.4 7.6-3.4 7.6l5.6 1.2c2.9 1.9 6.2 3.2 8 3.2 6.8 0 12-5.4 12-12.2 0-2.9-1-5.5-2.6-7.6C44.5 11.4 39.4 8 32 8z" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="23" r="2.6" fill="var(--icon-accent)"/><circle cx="32" cy="28" r="2.6" fill="var(--icon-accent)"/><circle cx="40" cy="23" r="2.6" fill="var(--icon-accent)"/></svg>`,

  h1: `<svg viewBox="0 0 64 64" fill="none"><rect x="10" y="14" width="44" height="30" rx="4" stroke="currentColor" stroke-width="3"/><path d="M32 44v8M24 52h16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="24" r="3" fill="var(--icon-accent)"/><circle cx="38" cy="31" r="3" fill="var(--icon-accent)"/><path d="M22 35l7-7 4 4 8-9" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  h2: `<svg viewBox="0 0 64 64" fill="none"><path d="M8 20h48M20 20l12 24 12-24" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="42" r="3" fill="var(--icon-accent)"/><path d="M32 16v4" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round"/></svg>`,

  h3: `<svg viewBox="0 0 64 64" fill="none"><circle cx="24" cy="26" r="10" stroke="currentColor" stroke-width="3"/><path d="M8 50c2-8 9-12 16-12s14 4 16 12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="44" cy="24" r="9" stroke="var(--icon-accent)" stroke-width="3"/><path d="M40 46c1-6 5-9 10-9s7 4 8 9" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round"/></svg>`,

  h4: `<svg viewBox="0 0 64 64" fill="none"><path d="M14 10c6 0 10 3 10 7v36c-2.5-2.5-6-4-10-4V10z" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M50 10c-6 0-10 3-10 7v36c2.5-2.5 6-4 10-4V10z" stroke="var(--icon-accent)" stroke-width="3" stroke-linejoin="round"/></svg>`,

  h5: `<svg viewBox="0 0 64 64" fill="none"><rect x="10" y="10" width="18" height="18" rx="4" stroke="currentColor" stroke-width="3"/><rect x="36" y="10" width="18" height="18" rx="4" stroke="currentColor" stroke-width="3"/><rect x="10" y="36" width="18" height="18" rx="4" stroke="currentColor" stroke-width="3"/><rect x="36" y="36" width="18" height="18" rx="4" stroke="var(--icon-accent)" stroke-width="3"/><path d="M28 19h8M28 45h8M19 28v8M45 28v8" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round"/></svg>`,

  s1: `<svg viewBox="0 0 64 64" fill="none"><rect x="10" y="14" width="44" height="30" rx="4" stroke="currentColor" stroke-width="3"/><path d="M32 44v8M24 52h16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="24" r="3" fill="var(--icon-accent)"/><circle cx="38" cy="31" r="3" fill="var(--icon-accent)"/><path d="M22 35l7-7 4 4 8-9" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  s2: `<svg viewBox="0 0 64 64" fill="none"><path d="M8 20h48M20 20l12 24 12-24" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="42" r="3" fill="var(--icon-accent)"/><path d="M32 16v4" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round"/></svg>`,

  s3: `<svg viewBox="0 0 64 64" fill="none"><circle cx="24" cy="26" r="10" stroke="currentColor" stroke-width="3"/><path d="M8 50c2-8 9-12 16-12s14 4 16 12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="44" cy="24" r="9" stroke="var(--icon-accent)" stroke-width="3"/><path d="M40 46c1-6 5-9 10-9s7 4 8 9" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round"/></svg>`,

  s4: `<svg viewBox="0 0 64 64" fill="none"><path d="M14 10c6 0 10 3 10 7v36c-2.5-2.5-6-4-10-4V10z" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M50 10c-6 0-10 3-10 7v36c2.5-2.5 6-4 10-4V10z" stroke="var(--icon-accent)" stroke-width="3" stroke-linejoin="round"/></svg>`,

  s5: `<svg viewBox="0 0 64 64" fill="none"><rect x="10" y="10" width="18" height="18" rx="4" stroke="currentColor" stroke-width="3"/><rect x="36" y="10" width="18" height="18" rx="4" stroke="currentColor" stroke-width="3"/><rect x="10" y="36" width="18" height="18" rx="4" stroke="currentColor" stroke-width="3"/><rect x="36" y="36" width="18" height="18" rx="4" stroke="var(--icon-accent)" stroke-width="3"/><path d="M28 19h8M28 45h8M19 28v8M45 28v8" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round"/></svg>`,

  h6: `<svg viewBox="0 0 64 64" fill="none"><rect x="16" y="8" width="32" height="48" rx="4" stroke="currentColor" stroke-width="3"/><path d="M24 22l5 5 9-10" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 36h16M24 44h16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,

  h7: `<svg viewBox="0 0 64 64" fill="none"><rect x="24" y="8" width="16" height="12" rx="3" stroke="currentColor" stroke-width="3"/><path d="M32 20v8M14 32h10M40 32h10M14 38l10-4 10 8" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="8" y="38" width="12" height="14" rx="3" stroke="currentColor" stroke-width="3"/><rect x="44" y="34" width="12" height="14" rx="3" stroke="currentColor" stroke-width="3"/></svg>`,

  hci: `<svg viewBox="0 0 64 64" fill="none"><rect x="8" y="10" width="40" height="30" rx="4" stroke="currentColor" stroke-width="3"/><path d="M28 40v10M20 50h16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M44 28c5 2 8 7 9 13" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round"/><circle cx="49" cy="44" r="7" stroke="var(--icon-accent)" stroke-width="3"/><path d="M47 44l4 4 5-7" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  mw: `<svg viewBox="0 0 64 64" fill="none"><path d="M8 56h48M24 8l8 16 8-16M16 24h16M40 24h16M16 40h16M40 40h16M24 32l12 8v16l-12-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="24" r="6" fill="var(--icon-accent)"/><circle cx="32" cy="40" r="6" fill="var(--icon-accent)"/><path d="M8 24l8 8v8M56 24l-8 8v8" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,

  m1: `<svg viewBox="0 0 64 64" fill="none"><circle cx="26" cy="26" r="12" stroke="currentColor" stroke-width="3"/><circle cx="42" cy="40" r="12" stroke="currentColor" stroke-width="3"/><path d="M36 32l6-6M38 32h4v-4" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 54h48" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  m2: `<svg viewBox="0 0 64 64" fill="none"><rect x="10" y="10" width="44" height="44" rx="8" stroke="currentColor" stroke-width="3"/><path d="M20 24h24M20 32h24M20 40h14" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round"/><circle cx="46" cy="42" r="4" fill="var(--icon-accent)"/></svg>`,
  m3: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="22" stroke="currentColor" stroke-width="3"/><path d="M10 32h44M32 10c6 6 9 14 9 22s-3 16-9 22c-6-6-9-14-9-22s3-16 9-22z" stroke="currentColor" stroke-width="2.4"/><circle cx="32" cy="32" r="4" fill="var(--icon-accent)"/></svg>`,
  m4: `<svg viewBox="0 0 64 64" fill="none"><path d="M10 12h44M10 12v40M10 32h44M32 12v40" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><circle cx="22" cy="22" r="2" fill="var(--icon-accent)"/><circle cx="42" cy="22" r="2" fill="var(--icon-accent)"/></svg>`,
  m5: `<svg viewBox="0 0 64 64" fill="none"><path d="M14 16l6 5-6 5M24 18h26M14 32l6 5-6 5M24 34h26M14 48l6 5-6 5M24 50h26" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="48" cy="21" r="3" fill="var(--icon-accent)"/></svg>`,
  m6: `<svg viewBox="0 0 64 64" fill="none"><rect x="8" y="14" width="20" height="14" rx="3" stroke="currentColor" stroke-width="3"/><rect x="36" y="36" width="20" height="14" rx="3" stroke="currentColor" stroke-width="3"/><path d="M28 21h8M36 43h8M32 28v8" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="21" r="2.5" fill="var(--icon-accent)"/><circle cx="32" cy="43" r="2.5" fill="var(--icon-accent)"/></svg>`,
  m7: `<svg viewBox="0 0 64 64" fill="none"><path d="M8 20h32l8 12H8zM14 20V14h24v6" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><rect x="8" y="32" width="40" height="18" rx="3" stroke="var(--icon-accent)" stroke-width="3"/><path d="M48 26h8v16M16 40h24" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  m8: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="7" fill="var(--icon-accent)" stroke="var(--icon-accent)" stroke-width="3"/><circle cx="12" cy="14" r="5" stroke="currentColor" stroke-width="3"/><circle cx="52" cy="14" r="5" stroke="currentColor" stroke-width="3"/><circle cx="12" cy="50" r="5" stroke="currentColor" stroke-width="3"/><circle cx="52" cy="50" r="5" stroke="currentColor" stroke-width="3"/><path d="M15 17l10 10M49 17L39 27M15 47l10-10M49 47L39 37" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  m9: `<svg viewBox="0 0 64 64" fill="none"><circle cx="26" cy="26" r="12" stroke="currentColor" stroke-width="3"/><path d="M22 26h8M26 22v8" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round"/><rect x="36" y="36" width="18" height="18" rx="4" stroke="currentColor" stroke-width="3"/><path d="M45 40v10M40 45h10" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round"/></svg>`,
  c1: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="22" stroke="currentColor" stroke-width="3"/><path d="M10 32h44M32 10c6 6 9 14 9 22s-3 16-9 22c-6-6-9-14-9-22s3-16 9-22z" stroke="currentColor" stroke-width="2.4"/><path d="M40 42l6 4-4-6" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  c2: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="8" fill="var(--icon-accent)" stroke="var(--icon-accent)" stroke-width="3"/><circle cx="14" cy="14" r="6" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="14" r="6" stroke="currentColor" stroke-width="3"/><circle cx="14" cy="50" r="6" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="50" r="6" stroke="currentColor" stroke-width="3"/><path d="M18 18l9 9M46 18l-9 9M18 46l9-9M46 46l-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  c3: `<svg viewBox="0 0 64 64" fill="none"><rect x="10" y="18" width="44" height="30" rx="4" stroke="currentColor" stroke-width="3"/><path d="M12 20l20 14 20-14" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 33l-10 11M42 33l10 11" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  c4: `<svg viewBox="0 0 64 64" fill="none"><path d="M10 16h6l6 26h28l6-18H20" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24" cy="50" r="4" fill="var(--icon-accent)"/><circle cx="48" cy="50" r="4" fill="var(--icon-accent)"/></svg>`,
  c5: `<svg viewBox="0 0 64 64" fill="none"><rect x="12" y="12" width="28" height="20" rx="3" stroke="currentColor" stroke-width="3"/><path d="M48 12v44M36 34l12 12M48 46l8 8" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 16v12M18 22h12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  c6: `<svg viewBox="0 0 64 64" fill="none"><path d="M32 8l20 7v16c0 14-8 21-20 25-12-4-20-11-20-25V15z" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M26 32l5 5 8-10" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  c7: `<svg viewBox="0 0 64 64" fill="none"><rect x="8" y="12" width="48" height="40" rx="5" stroke="currentColor" stroke-width="3"/><path d="M8 24h48M22 24v28" stroke="currentColor" stroke-width="3"/><rect x="10" y="14" width="10" height="8" rx="1" fill="var(--icon-accent)"/><path d="M28 36h14M28 44h10" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round"/></svg>`,
  c8: `<svg viewBox="0 0 64 64" fill="none"><path d="M22 18l-12 14 12 14M42 18l12 14-12 14" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 14l-4 36" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round"/></svg>`,
  c9: `<svg viewBox="0 0 64 64" fill="none"><path d="M14 18l-6 14 6 14" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 18l6 14-6 14" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 14l-12 36" stroke="var(--icon-accent)" stroke-width="3" stroke-linecap="round"/></svg>`
};

function iconMarkup(id, size){
  const svg = ICONS[id] || ICONS.economics;
  return `<span class="icon-box" style="width:${size||40}px;height:${size||40}px;">${svg}</span>`;
}
