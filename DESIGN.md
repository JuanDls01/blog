---
name: Juani De los Santos — Portfolio & Blog
description: A grayscale engineer's notebook with one live signal and one pixel-art flourish
colors:
  paper: "#fdfdfc"
  ink: "#1a1a19"
  ink-muted: "#6f6f6c"
  ink-faint: "#a3a39e"
  hairline: "rgba(0, 0, 0, 0.08)"
  surface: "rgba(0, 0, 0, 0.035)"
  surface-hover: "rgba(0, 0, 0, 0.06)"
  accent: "#1a1a19"
  signal-green: "#22c55e"
typography:
  display:
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  title:
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  body:
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.05em"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "12px"
  full: "9999px"
spacing:
  gutter: "24px"
  content-max: "680px"
  section-gap: "64px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-faint}"
    rounded: "{rounded.md}"
    padding: "8px"
  button-ghost-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px"
  nav-pill-active:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "6px 10px"
  spotlight-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "12px"
  chip-draft:
    backgroundColor: "transparent"
    textColor: "{colors.ink-faint}"
    rounded: "{rounded.xs}"
    padding: "2px 6px"
---

# Design System: Juani De los Santos — Portfolio & Blog

## Overview

**Creative North Star: "The Engineer's Notebook"**

This is a grayscale ledger, not a landing page. Nearly every color in the interface is a step of ink-on-paper: near-black text on near-white paper (inverted in dark mode), fading through muted and faint grays for secondary and tertiary information. There is exactly one saturated color in the whole system — a signal green, reserved for the single live-status dot on the profile photo — and exactly one deliberately handmade flourish: a pixel-art hero banner (a sunlit forest in light mode, a dino under a night sky in dark mode) that swaps with the theme. Everything else earns its place through typographic weight, spacing, and hairline dividers, never through boxes, shadows, or brand color.

The system previously used an aurora/gradient hero treatment; that was explicitly replaced (commit `84796bd`, "swap aurora for pixel-art banners and monochrome accent") in favor of this quieter, more literal identity. Gradient hero backgrounds and decorative color are a confirmed rejection, not an unexplored option.

Content reads like status rows in a report: experience entries, training stats, and blog posts are laid out as dividing-line lists rather than cards, with dates and numbers set in tabular figures so they align like a ledger column.

**Key Characteristics:**
- Achromatic by default — color is reserved for live/status signals only (see The One Signal Rule).
- Single-column, narrow measure (680px), generous vertical rhythm between sections.
- No shadows, no cards with fill — depth comes from tonal surface washes and 1px hairlines.
- Restrained, snappy motion (150–250ms) — a one-time load-in stagger, a cursor-following spotlight, a view-transition theme crossfade.
- One handmade pixel-art image is the system's only expressive/decorative element; it is intentionally the exception, not a pattern to repeat elsewhere.

## Colors

The palette reads as ink density on paper: text and chrome are all steps of the same neutral, with light and dark modes as true inversions of each other rather than separate palettes.

### Primary
- **Ink** (`#1a1a19` light / `#ededea` dark): primary text, headings, and the accent role — this system has no separate "brand" hue, so `accent` and `ink` are the same token. Also used as the primary-button fill (inverted: paper-on-ink).

### Neutral
- **Paper** (`#fdfdfc` light / `#111110` dark): page background.
- **Muted Ink** (`#6f6f6c` light / `#9c9c97` dark): secondary text — bios, summaries, descriptions.
- **Faint Ink** (`#a3a39e` light / `#63635e` dark): tertiary text — timestamps, eyebrows, metadata, dividers' label pairing.
- **Hairline** (`rgba(0,0,0,0.08)` light / `rgba(255,255,255,0.09)` dark): 1px dividers and borders. Never a solid opaque gray — always a translucent wash over the current background so it self-adjusts across surfaces.
- **Surface** (`rgba(0,0,0,0.035)` light / `rgba(255,255,255,0.045)` dark): resting tonal wash for hover-adjacent chrome (nav pills, icon buttons) when they need a hint of grouping without a border.
- **Surface Hover** (`rgba(0,0,0,0.06)` light / `rgba(255,255,255,0.08)` dark): the deeper wash for active/pressed states on the same elements.

### Named Rules
**The One Signal Rule.** Color is reserved for live or status information only — never for decoration, brand expression, or emphasis. Today that means exactly one saturated color exists in the entire system: **Signal Green** (`#22c55e` light / `#4ade80` dark, Tailwind's green-500/400), used solely for the "available" status dot on the profile photo (with its ripple pulse) and the current-week bar in the training chart. Do not introduce a second hue, a gradient, or a tinted button anywhere else — if something needs to stand out, reach for weight, size, or ink contrast first.

## Typography

**Display Font:** Geist Sans (`var(--font-geist-sans)`, falling back to `ui-sans-serif, system-ui, sans-serif`)
**Label/Mono Font:** Geist Mono (`var(--font-geist-mono)`), used for numeric/code contexts via `font-mono`, not for UI labels.

**Character:** A single, restrained grotesque carrying the whole system — no serif or display face. Weight and negative tracking at large sizes do the differentiation work instead of a second typeface. Numbers are set `tabular-nums` everywhere they're compared (dates, stats, periods) so columns of figures align like a spreadsheet.

### Hierarchy
- **Display** (600, 2rem → 2.35rem at ≥640px, line-height 1.15, tracking -0.025em): blog post title only — the single largest text in the system.
- **Headline** (600, 19px, tracking -0.01em): page-level h1 (the homepage name, "Work", "Blog" titles).
- **Title** (600, 1.4rem, tracking -0.015em): in-article prose h2 — the frontmatter `title` token. Prose owns a full internal sub-scale around it that the 5-role token schema has no separate slot for: prose h1 steps up to 1.75rem/1.2/-0.02em (the largest heading that can appear *inside* an article body, distinct from Display's post-title-only 2rem), h3 steps down to 1.15rem/1.35/-0.01em, h4 to 1rem/1.5/normal.
- **Body** (400, 15px, line-height 1.65): default UI text — the frontmatter `body` token. Long-form prose runs its own body size, 1rem/16px/1.7, for reading comfort; this is the one place body size flexes, and it's a second literal value by design, not drift.
- **Label** (500, 13px, tracking 0.05em, uppercase): section eyebrows ("Experience", "Now"), tabular metadata (dates, reading time) — the frontmatter `label` token.
- **Micro-label** (500–600, 11px, tracking 0.05–0.08em, uppercase): one step below Label. Used for the draft/status/fallback-language chip and the `Kicker` component's `xs` size. Small enough that it's reserved for single-word or two-word tags, never a sentence.
- **Dense content** (400, 0.875rem/14px): a supporting-content size used consistently inside articles — Shiki code blocks, prose tables, and the "On this page" TOC rail all run at this size, one step below Body, to read as reference material rather than prose.

### Named Rules
**The Tabular Rule.** Any number that could be compared to another number — dates, durations, distances, counts — is set with `font-variant-numeric: tabular-nums`. Ragged numeral widths are treated as a bug.

## Layout

Single-column throughout — there is no multi-column grid, only a centered content well (`max-width: 680px`) with a 24px horizontal gutter (`min-width: 360px` floor). The one exception is the blog post's table of contents, which floats as a fixed-width (200px) rail 48px to the right of the column on viewports ≥1180px — an aside, not a second grid track.

Vertical rhythm is deliberately large between major sections (64px between homepage sections, e.g. Experience → Beyond Code → Contact) and tight within them (12–24px between related rows), so the page reads in clear chapters. Lists of like items (experience rows, blog posts, work history) are separated by hairline dividers rather than gaps or cards — `border-top` on every item after the first, not `border` around each.

The header is sticky with a translucent, blurred backdrop (`backdrop-blur-lg backdrop-saturate-150` over `nav-bg` at 70% opacity) and a soft gradient fade at its lower edge instead of a hard border — content passing beneath it dissolves rather than cutting off.

## Elevation & Depth

Flat by design — there are no shadows anywhere in the system. Depth is conveyed entirely through tonal layering: a resting surface wash (`--surface`) and a deeper hover wash (`--surface-hover`), both translucent so they inherit whichever background they sit on, plus 1px hairline borders at the same translucency logic. The one quasi-elevated treatment is the sticky header's blur/saturate backdrop, which reads as glass rather than a raised layer.

### Named Rules
**The Flat-By-Default Rule.** Never add `box-shadow` to communicate elevation. If something needs to separate from its background, use a `surface` tonal wash or a `hairline` border — both already scale correctly across light and dark mode; a fixed-color shadow does not.

## Shapes

Small, soft radii throughout — nothing sharp, nothing heavily rounded except true circles. Chips and the draft/status badge use the tightest radius (4px); buttons, icon buttons, and bordered note boxes use 8px; interactive list rows (spotlight rows, adjacent-post cards) use 10px; the one large photographic element (the pixel-art hero banner) uses 12px. True circles (`rounded-full`) are reserved for the profile photo, the status dot, and its ripple — never used for pill-shaped buttons or tags.

Borders are always 1px and always the translucent `hairline` color — never a solid opaque gray, never thicker than 1px except the 2px focus ring (`outline: 2px solid var(--accent)`), which is the one place border weight steps up, deliberately, for accessibility.

Two elements round below the 4px content-shape floor on purpose, because they're not content shapes: the focus-visible outline itself takes a bare 2px `border-radius` (barely softened, so it stays an unmistakable browser-affordance outline rather than reading as a rounded container), and the 2px-wide TOC active-indicator bar takes 1px (just enough to avoid a hard square-cut end on a hairline).

## Components

Buttons, rows, and interactive chrome are restrained and precise: minimal visual weight at rest, subtle feedback on interaction (a tonal wash on hover, a 0.96 scale-down on press), and nothing that reads as decorative. No component in this system uses a shadow, a gradient, or a border heavier than 1px.

### Buttons
- **Shape:** 8px radius (`rounded-lg`).
- **Primary** (e.g. "Get in touch"): ink-filled, paper text, `padding: 8px 14px`, `text-sm font-medium`. Hover drops opacity to 85%, not a color or shadow change.
- **Ghost / Icon** (social links, theme toggle, nav pills): transparent at rest, faint-ink icon/text; hover adds `surface` wash and shifts text to full ink. All buttons scale to 0.96 on `:active` (150ms, `ease-out-strong`) — the system's one universal press-feedback rule.

### Chips
- **Draft/status badge:** transparent background, 1px hairline border, faint-ink uppercase label text, 4px radius, `2px 6px` padding. Used sparingly — only to flag unpublished content.

### Cards / Containers
This system avoids boxed cards. Grouped content (experience list, blog list, work history) is separated by hairline top-borders between siblings, not by individually-bordered containers. The one bordered container that does exist — the "showing fallback-language content" notice on a blog post — uses a 1px hairline border, 8px radius, no fill, `padding: 12px 16px`, signaling "note" rather than "card."

### Navigation
- **Style:** text-only pills, `text-sm`, 8px radius, `padding: 6px 10px`. Active route is full-ink + medium weight with no background; inactive routes are muted-ink, gaining a `surface` hover wash and full-ink text on hover.
- **Locale switcher:** inline uppercase text links (`en` / `es`), each with the same ghost-button treatment as an icon button (small radius, `surface` hover wash, active-scale press) rather than bare unpadded text — the hit target and feedback must match every other clickable control in the system. Active locale is full-ink + medium weight, inactive is faint-ink; a middle dot separates the pair.
- **Mobile:** no separate mobile nav pattern — the same pill row reflows within the narrow single-column layout down to the 360px floor.

### Spotlight Row (signature component)
The list-row pattern used for blog posts and adjacent-post links: a radial highlight (`180px` circle, `--spot` tonal color) follows the pointer via `--mx`/`--my` custom properties set on `pointermove`, visible only on hover-capable pointers. A trailing `→` arrow fades and slides in on hover. 10px radius, `12px` padding, active state deepens to `surface-hover`. This is the system's primary "this is clickable, browse me" affordance, and the closest thing it has to a signature interaction beyond the pixel-art banner.

### Pixel-Art Hero Banner (signature asset)
A single full-width pixel-art image (1200:352 aspect ratio, `image-rendering: pixelated`, 12px radius) that swaps entirely between light (forest, daytime) and dark (the same forest, night, with a dino) themes. This is the system's one licensed decorative/expressive element — deliberately singular. Do not add a second illustrated or gradient element elsewhere; the banner's rarity is what makes it read as intentional rather than a template default.

### Code Blocks
Fenced code blocks (Shiki, `github-dark` theme) stay a fixed dark background (`#0d1117`) in both light and dark mode, with a hairline border and 8px radius. This is the system's one deliberate exception to the achromatic/theme-adaptive rule — syntax-highlighted code needs a stable, high-contrast surface, and a second dark-mode-only background would fight the highlighter's own palette. Inline code instead uses the regular `surface` wash, staying theme-adaptive.

## Do's and Don'ts

### Do:
- **Do** keep all UI chrome grayscale (ink/paper/muted/faint) and reserve Signal Green strictly for live-status information (The One Signal Rule).
- **Do** set every comparable number — dates, distances, counts, periods — with tabular figures (The Tabular Rule).
- **Do** convey depth with `surface`/`surface-hover` tonal washes and 1px hairlines, never `box-shadow` (The Flat-By-Default Rule).
- **Do** separate list items with hairline top-borders rather than wrapping each in its own bordered card.
- **Do** keep radii in the 4–12px range, reserving true circles for photos/dots/rings only.
- **Do** keep motion snappy and purposeful (150–250ms, `ease-out-strong`/`ease-in-out-strong`) and respect `prefers-reduced-motion` (already wired for reveal, shine, ripple, and view-transitions).
- **Do** treat the pixel-art banner as the one deliberate ornament — everything else should stay plain by comparison.

### Don't:
- **Don't** reintroduce gradient/aurora backgrounds or any decorative color wash — explicitly rejected in favor of this monochrome + pixel-art direction.
- **Don't** add a second saturated/brand hue, tinted button, or colored badge outside the Signal Green status use.
- **Don't** add `box-shadow` anywhere, including on hover/focus states — use tonal surface or hairline border instead.
- **Don't** wrap list rows (experience, blog posts, work history) in individually bordered/filled cards; keep the divided-list pattern.
- **Don't** widen the content column past 680px or introduce a multi-column grid on the main content well; the TOC rail is the one sanctioned exception, and only ≥1180px.
