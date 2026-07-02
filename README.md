# wax-v2-concentrated-range-efficiency-plot — v2 Concentrated Range Efficiency Plot

> **Status:** 🔒 Private (In Development) | Target Public Release: August 2026  
> **Category:** Alcor & DeFi Visualizers — Tick Range Optimization & Liquidity Density  
> **Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**An interactive high-performance canvas visualization that overlays a user's custom tick ranges directly onto the pool's full active liquidity density curve, with a pulsing live spot price line and real-time efficiency scoring for optimal range management on Alcor v2.**

---

## 1. Overview & Goal

This blueprint gives LPs an intuitive, visual way to understand and optimize their concentrated liquidity positions by seeing exactly where their range sits relative to the current active liquidity distribution and live price action.

**Key features:**
- Live liquidity density curve (histogram or smooth density) across all ticks in a pool.
- Overlay of user's current (or proposed) upper/lower tick range as a highlighted band.
- Pulsing vertical line for current spot price with real-time updates.
- Instant efficiency score ( % of time in-range historically + projected fee capture).
- "What-if" mode: drag to adjust proposed range and instantly see impact.

**Why it matters:**
- Choosing optimal ranges is the #1 skill (and pain point) for concentrated liquidity LPs. Poor ranges = low fees + high IL risk.
- Current Alcor UI shows basic position info but lacks the rich, comparative density context that makes optimization obvious.
- Helps both novice and expert LPs make data-driven range decisions.

**Public infra only:** Alcor pool state APIs for current liquidity distribution + Hyperion for historical price/tick data to compute historical in-range %.

**Target users:** Active Alcor v2 LPs, market makers, yield optimizers, DeFi educators.

**Success metrics:** Sub-2s load for full density + history, smooth 60fps interactions even on mid-range devices, clear actionable insights that improve user LP performance.

---

## 2. Concepts & Inspiration

### Core Concepts
- **Tick Math & Liquidity Density**: In concentrated AMMs, liquidity is not uniform. Density at each tick determines fee share and slippage. Visualizing the full curve reveals "thick" vs "thin" areas.
- **Range Efficiency**: % of historical time (or volume) during which price was inside the user's chosen ticks → directly correlates with fee earnings potential.
- **Live Spot Overlay**: Critical for understanding current positioning vs active market.

### Pain Points & Inspirations
- Many LPs set ranges too wide (low efficiency) or too narrow (high risk of going out-of-range).
- Inspiration: TradingView volume profile + orderbook heatmaps, combined with Figma-style draggable range selectors.
- Pairs beautifully with `wax-alcor-lp-behavioral-profiler` (range management history) and `wax-lp-fee-lifecycle-auditor` (post-harvest behavior).

---

## 3. Design Specifications

### Visual Design
- Clean dark canvas with subtle grid, glowing accents for user's range (emerald) and spot line (indigo pulse).
- Sidebar controls: current position summary, efficiency score ring (animated), quick preset ranges (e.g. ±5%, ±10%, custom).
- Bottom: historical efficiency timeline sparkline + volume-weighted in-range %.
- Micro-interactions: Smooth drag on range handles with live score update, hover tooltips on density curve showing depth/fee share.
- Responsive: Full canvas on desktop; simplified touch-friendly version on mobile with gesture support.

### Key Components
- `LiquidityDensityCanvas.tsx` — High-perf HTML5 Canvas or WebGL rendering of density histogram + overlays.
- `RangeOverlayControls.tsx` — Draggable range selector synced to canvas.
- `EfficiencyScoreRing.tsx` — Animated circular progress with breakdown (historical vs projected).
- `WhatIfSimulator.tsx` — Side-by-side comparison or live morphing when adjusting.

### A11y & Perf
- Canvas includes fallback accessible data table for screen readers.
- Keyboard: Arrow keys nudge range, Enter commits simulation.
- Reduced motion support.
- 60fps target on mid devices; Web Worker offload for density calculations.

---

## 4. Technical Architecture

**Stack:** Next.js + TS + Tailwind + shadcn + HTML5 Canvas (or Three.js/D3 for advanced) + framer-motion for UI + @wharfkit (optional connect) + Alcor/Hyperion clients.

**Data Flow:**
Fetch current pool liquidity distribution (Alcor) → Historical price path (Hyperion) → Compute in-range periods → Render density + overlays → Live updates via polling or websocket if available.

**lib/wax/**: alcor-client.ts (tick math helpers), density-calculator.ts (pure functions), hyperion-price-history.ts.

**Security:** Pure read/view; optional simulation only (no auto tx).

---

## 5. Implementation Examples

```ts
// Example: Compute historical in-range percentage
async function calculateHistoricalEfficiency(pool: string, lowerTick: number, upperTick: number, lookbackBlocks: number) {
  const priceHistory = await hyperionClient.getPriceTicks(pool, lookbackBlocks);
  let inRangeCount = 0;
  for (const point of priceHistory) {
    if (point.tick >= lowerTick && point.tick <= upperTick) inRangeCount++;
  }
  return (inRangeCount / priceHistory.length) * 100;
}
```

Canvas rendering loop with requestAnimationFrame for pulsing spot line and smooth density updates.

---

## 6. Demo & Testing
- Strong demo mode with realistic pool density snapshot + historical playback.
- Live connect shows user's actual positions with one-click "optimize" suggestions.
- Performance tests on canvas rendering with 100k+ tick data points.
- E2E for drag interactions and score accuracy.

---

## 7. Roadmap
**Phase 0-1:** Data fetching (Alcor density + Hyperion history) + pure math utils — 3-4 days
**Phase 2:** Canvas viz + draggable controls + efficiency scoring — 5 days
**Phase 3:** Polish, what-if mode, a11y, mobile, exports — 4 days
**Phase 4:** Full docs + public release — 2 days

Future: Multi-pool comparison, ML-suggested optimal ranges (client-side inference), integration with fee lifecycle auditor for holistic LP cockpit.

---

## 8. Visual References
Main view: Large beautiful canvas showing bell-curve-like liquidity density with user's range as glowing band and pulsing spot line. Sidebar with crisp score and controls. Feels like a professional trading terminal (TradingView volume profile meets clean Web3 dashboard). Subtle animations only where they add clarity.

---

## 9. Related Blueprints
- `wax-alcor-lp-behavioral-profiler` — Historical range management + this live density view = complete LP toolkit.
- `wax-lp-fee-lifecycle-auditor` — Understand what happens after fees are earned in well-placed ranges.
- `wax-impermanent-loss-insulation-calc` — Complements with IL simulation for proposed ranges.

---

## 10. License & Credits
MIT. Pixel Journey Design System. Gratitude to Alcor v2 team and Hyperion indexers for making rich on-chain data publicly accessible.

**Pixel Journey — Beautiful interfaces for public blockchain data.**