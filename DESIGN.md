---
name: CTU Scheduler — Slash Edition
description: Midnight vault with gilded ledger lines for academic timetable optimization
colors:
  obsidian: "#08080a"
  onyx: "#040406"
  carbon: "#121317"
  graphite: "#1c1d22"
  slate: "#2e3038"
  smoke: "#464853"
  ash: "#5e616e"
  steel: "#777a88"
  fog: "#9194a1"
  mist: "#acafb9"
  silver: "#c7c9d1"
  bone: "#e2e3e9"
  paper-white: "#ffffff"
  copper: "#cc9166"
  gilded: "#ae9357"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "4rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "2.5rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.01em"
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.01em"
  h4:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  category:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "-0.02em"
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
  micro:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 500
rounded:
  sm: "2px"
  card: "10px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  gap: "120px"
components:
  button-primary:
    backgroundColor: "{colors.paper-white}"
    textColor: "#000000"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  card:
    backgroundColor: "{colors.onyx}"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Design System

## Overview

CTU Scheduler — Slash Edition operates in midnight gallery mode: an almost-black obsidian canvas (`#08080a`), bone typography (`#e2e3e9`), and a single warm copper accent (`#cc9166`) that functions as editorial punctuation. Display headings are set in high-contrast didone serif (`Playfair Display`), creating a serif-versus-sans collision with functional `Inter` body text. Hairline graphite borders (`#1c1d22`), pill-shaped controls (9999px), and gilded ledger lines elevate the academic tool into a high-precision, luxury engineering utility.

## Colors

- **Obsidian (`#08080a`):** Page canvas, deepest background.
- **Onyx (`#040406`):** Card surface, timetable showcase background.
- **Carbon (`#121317`):** Elevated panels, input fields, active pill backgrounds.
- **Graphite (`#1c1d22`):** Primary hairline border defining all card and container edges.
- **Slate (`#2e3038`):** Secondary dividers and control borders.
- **Fog (`#9194a1`):** Subdued descriptions, inactive navigation links.
- **Bone (`#e2e3e9`):** Default readable body text.
- **Paper White (`#ffffff`):** Display headings and the single high-contrast primary pill button.
- **Copper (`#cc9166`):** Category labels, editorial punctuation, research topic tags.
- **Gilded Accent (`#ae9357` / gradient):** Timetable data visualization lines.

## Typography

- **Serif vs. Sans Collision:**
  - `Playfair Display`: Used exclusively for headings at 28px and above. Letter-spacing: `+0.01em`.
  - `Inter`: Used for all functional UI text below 28px (body, navigation, buttons, tags).
- **Scale:**
  - `display`: 56px – 64px (`h1`)
  - `headline`: 40px (`h2`)
  - `title`: 28px (`h3`)
  - `h4`: 18px Inter
  - `body`: 16px Inter
  - `category`: 13px Inter semi-bold uppercase in Copper

## Layout

- Max-width: 1216px centered container.
- Section gap: 120px to 160px generous vertical breathing room.
- Single-page application structure with smooth view switching and anchor navigation.

## Elevation & Depth

- **Zero Drop-Shadows:** No blur shadows on cards or buttons.
- **Hairline Framing:** Depth is achieved exclusively through surface stepping (`#08080a` -> `#040406` -> `#121317`) bounded by 1px `#1c1d22` graphite borders.

## Shapes

- Pill Controls: 9999px border-radius for buttons, filter tags, and inputs.
- Cards: 10px border-radius (`rounded-[10px]`).
- Nav: 2px border-radius.

## Components

- **Primary Action Button:** 9999px pill, pure white (`#ffffff`) background with `#000000` text, 14px Inter 500, padding 10px 20px.
- **Ghost Outline Button:** 9999px pill, transparent fill, 1px white border, white text.
- **Pill Filter:** 9999px pill, 1px slate border, muted text, active state in carbon.
- **Slash Card:** Onyx background, 1px graphite border, 10px radius, 24px padding.
- **Ledger Timetable Matrix:** Clean weekly schedule matrix with carbon slot cells and gilded highlight indicators.

## Do's and Don'ts

### Do
- Use Playfair Display for headings at 28px and above.
- Reserve pure white pill buttons for the primary conversion point.
- Keep Copper (`#cc9166`) strictly as an editorial punctuation or category tag.
- Maintain 1px hairline borders for all structural divisions.

### Don't
- Do not introduce drop shadows, colored halos, or glassmorphism blurs.
- Do not use gradient text on general headings.
- Do not use serif fonts on body text under 20px.
- Do not use colorful badges or rainbow course tags.
