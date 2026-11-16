---
name: CTU Scheduler Design System
description: Modern Academic & Engineering Interface for Can Tho University Course Scheduling
colors:
  primary: "#1a56db"
  primary-hover: "#1e40af"
  primary-dark: "#0f2942"
  secondary: "#0284c7"
  bg-main: "#0a0f1d"
  bg-card: "#111a2e"
  bg-card-hover: "#16223d"
  border-subtle: "#1e293b"
  border-card: "#334155"
  text-main: "#f8fafc"
  text-secondary: "#94a3b8"
  text-muted: "#64748b"
  success: "#059669"
  warning: "#d97706"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  full: "9999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  card:
    backgroundColor: "{colors.bg-card}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
---

# Design System

## Overview

The visual design system for **CTU Scheduler** embodies modern academic precision, functional engineering clarity, and student-focused utility. It deliberately rejects noisy AI-generated "slop" (chaotic rotating blur blobs, over-saturated cyan glows, unconstrained glassmorphism) in favor of crisp structural hairline borders, disciplined typographic scales, and high-performance rendered components centered around a living weekly timetable.

## Colors

- **Primary (`#1a56db` / `#0f2942`):** Academic CTU Blue representing institutional authority, trust, and engineering pedigree.
- **Background Ground (`#0a0f1d`):** Deep slate ground providing a distraction-free, high-contrast canvas.
- **Card Surfaces (`#111a2e` / hover `#16223d`):** Solid, purposeful containers with crisp 1px borders (`#1e293b` / `#334155`).
- **Semantic Accents:**
  - Emerald Success (`#059669`): Used for verified zero conflicts, active capacity, and official NCKH acceptance tags.
  - Amber Warning (`#d97706`): Used for portable releases and attention-requiring items.
  - Slate Neutrals (`#f8fafc`, `#94a3b8`, `#64748b`): High-contrast text hierarchy exceeding WCAG AA standards.

## Typography

- **Scale Ratio:** 1.25x – 1.33x distinct typographic step ratio.
  - `h1`: 2.75rem (44px) / Bold 800
  - `h2`: 2.0rem (32px) / Bold 700
  - `h3`: 1.5rem (24px) / Semi-bold 600
  - `h4`: 1.1875rem (19px) / Semi-bold 600
  - `body`: 1.0rem (16px) / Regular 400
  - `mono`: Monospaced data tags and timetable codes
- **Bans:** No gradient text, no fuzzy drop-shadows on text, no flat heading-to-body ratios.

## Layout

- **Long-scroll All-in-One Structure:**
  1. Sticky accessible navigation header with quick CTA.
  2. Hero with value proposition on the left and Living Timetable Simulator on the right.
  3. 3-step sequence ("Cách thức hoạt động").
  4. Core capabilities ("Tính năng hỗ trợ chuyên sâu").
  5. Scientific Research Accreditation ("Nghiệm thu NCKH").
  6. Complementary Ecosystem ("CTU Student's Tools").
  7. GitHub Releases & Verified Download Cards ("Tải xuống & Điều khoản").
  8. FAQ Accordion / List ("Hỏi đáp").
  9. Core Development Team ("Đội ngũ phát triển").
  10. Bug Report / Feedback Banner ("Góp ý & Báo lỗi").
  11. Compact, transparent footer.

## Elevation & Depth

- **Shadows with Offset:** Natural directional lighting `box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4)`.
- **Zero-offset Halo Ban:** No zero-offset fluorescent glows (`drop-shadow(0 0 20px ...)`).
- **Surface Elevation:** Depth is achieved via tonal contrast between `--bg-main` (`#0a0f1d`) and `--bg-card` (`#111a2e`), framed by clean hairline borders.

## Shapes

- **Border Radius:**
  - Cards: `0.75rem` (`rounded-xl`)
  - Buttons: `0.5rem` (`rounded-lg`)
  - Pills / Status Badges: `9999px` (`rounded-full`)
- **Micro-grid Background:** Lightweight 40px x 40px CSS grid lines replacing heavy GPU-bound mesh blobs.

## Components

- **Academic Card (`.academic-card`):** Solid dark card with 1px hairline border, subtle natural elevation, and smooth hover feedback.
- **Button Primary (`.btn-primary`):** Solid blue button with defined offset shadow and accessible contrast.
- **Button Secondary (`.btn-secondary`):** Slate-800 button with subtle border for secondary actions.
- **Interactive Timetable Grid:** Responsive daily/shift schedule matrix showcasing real-time slot optimization, conflict checking, and seat capacity.
- **Release Download Card:** High-information-density cards dynamically populated from GitHub Releases, supporting Velopack auto-updates and portable zips.

## Do's and Don'ts

### Do
- Maintain high contrast ratios (≥4.5:1 for body copy).
- Support `prefers-reduced-motion` across all transitions and entrance reveals.
- Ensure all interactive buttons have descriptive `aria-label` and `aria-expanded` attributes.
- Use explicit semantic tags (`h1`-`h4`, `nav`, `main`, `section`, `footer`).

### Don't
- Do not introduce rotating blur mesh blobs or heavy continuous CSS animations.
- Do not use gradient text (`background-clip: text`) or neon cyan text drops.
- Do not nest bordered cards inside cards.
- Do not use touch targets smaller than 44x44px for primary mobile actions.

