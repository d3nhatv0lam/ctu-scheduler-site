---
name: CTU Scheduler — ClickUp Edition
description: Hardworking dashboard on white marble with rotating conic-gradient accents and 9999px pill controls
colors:
  signal-white: "#ffffff"
  ink-black: "#202020"
  onyx: "#090c1d"
  carbon: "#2a2a2a"
  slate: "#646464"
  ash: "#838383"
  fog: "#b3b3b3"
  cloud: "#d4d4d4"
  bone: "#e8e8e8"
  mist: "#f8f9fa"
  plaster: "#e9ebf0"
  mercury: "#eeeeee"
  brand-violet: "#6647f0"
  signal-blue: "#0091ff"
  mint: "#6ee7b7"
  emerald: "#00c07a"
  teal-tag: "#16c0a4"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  h4:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
  category:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.04em"
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
  micro:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
rounded:
  sm: "6px"
  card: "16px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  gap: "80px"
components:
  button-primary:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.signal-white}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-ghost:
    backgroundColor: "transparent"
    borderColor: "{colors.bone}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  pill-tag:
    backgroundColor: "{colors.mist}"
    borderColor: "{colors.bone}"
    textColor: "{colors.carbon}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  card:
    backgroundColor: "{colors.signal-white}"
    borderColor: "{colors.bone}"
    rounded: "{rounded.card}"
    padding: "24px"
---

# ClickUp™ Design System — CTU Scheduler

## Overview

CTU Scheduler — ClickUp Edition is built on the philosophy of a **"hardworking dashboard on white marble"**:
- **Canvas:** Clean Signal White (`#ffffff`) canvas layered with soft neutral section bands (`#e9ebf0` Plaster and `#f8f9fa` Mist).
- **Typography:** Bold, energetic `Plus Jakarta Sans` headings with compressed tracking (`-0.04em`), paired with readable, ergonomic `Inter` body copy and technical metrics (strictly no generic monospace).
- **Relentless 9999px Pill:** Buttons, status badges, filter chips, navigation items, and tags all share the signature 9999px full-radius curve.
- **Color Surgery:** Grayscale dominance with focused chromatic pops — Brand Violet (`#6647f0`) for brand highlights and badges, Signal Blue (`#0091ff`) for verified interactive links and focus states, Mint/Emerald for status, and a rotating Rainbow Conic gradient border around primary hero triggers.
- **Motion:** `@vueuse/motion` physics with smooth scroll-in animations (`0.45s cubic-bezier(0.33, 1, 0.68, 1)`), providing tactile, living feedback as users scroll through the SPA.

## Color Tokens

- **Signal White (`#ffffff`):** Page canvas, dashboard cards, navigation surface.
- **Ink Black (`#202020`):** Primary action fills, headline text, primary CTA buttons (12.9:1 contrast ratio on white).
- **Onyx (`#090c1d`):** Display headings at maximum scale with a slight cool authority.
- **Carbon (`#2a2a2a`):** Heavy borders, card titles, button text on light fills.
- **Slate (`#646464`):** Secondary body text, nav labels, feature descriptions.
- **Ash (`#838383`):** Metadata, helper text, inactive filter pills.
- **Fog (`#b3b3b3`):** Low-contrast dividers, placeholder accents.
- **Bone (`#e8e8e8`):** Canonical border color for cards, buttons, and dashboard tables.
- **Mist (`#f8f9fa`):** Soft elevated surface for badges, preview boxes, and code blocks.
- **Plaster (`#e9ebf0`):** Neutral section alternating band breaking white canvases.
- **Brand Violet (`#6647f0`):** Identity accent for hero badges and active state indicators.
- **Signal Blue (`#0091ff`):** Interactive links, benefit checkmarks, and secondary outlines.
- **Mint (`#6ee7b7`) / Emerald (`#00c07a`):** Auto-update status, success tags, verified indicators.

## Typography Scale

- **Display (`3.75rem` / `60px`):** Plus Jakarta Sans 800, line-height 1.08, letter-spacing -0.04em.
- **Headline (`2.5rem` / `40px`):** Plus Jakarta Sans 700, line-height 1.15, letter-spacing -0.03em.
- **Title (`1.75rem` / `28px`):** Plus Jakarta Sans 700, line-height 1.25, letter-spacing -0.02em.
- **Section Heading H4 (`1.125rem` / `18px`):** Plus Jakarta Sans 600, line-height 1.4, letter-spacing -0.01em.
- **Body (`1rem` / `16px`):** Inter 400/500, line-height 1.6.
- **Small Body / UI (`0.875rem` / `14px`):** Inter 500/600, line-height 1.5.
- **Category Badge (`0.8125rem` / `13px`):** Plus Jakarta Sans 700, letter-spacing 0.04em, uppercase.
- **Micro / Technical Tag (`0.6875rem` / `11px`):** Inter 600, for version pills, checksums, and timetable slots.
