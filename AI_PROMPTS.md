# AI handoff — concentrated range time-share

## Non-negotiables

1. `inRangeBps(inRangeSec, windowSec) = floor(inRangeSec * 10000 / windowSec)`.
2. `inRangeBps(100, 400)` → **2500**. `inRangeBps(1, 3)` → **3333** (not 3334).
3. `inRangeBps(4, 4)` → **10000**. `inRangeBps(0, 4)` → **0**. `inRangeBps(5, 4)` throws.
4. This is a **time-share floor**, not a fee claim and not full-range IL.
5. Not the backtester product (10000 × 30 bps × 100/400 → 7 tokens).
6. No Alcor v2 or v3 HTTP. The `v2` in the name is historical. Do not half-up and still cite these tests.

## Prompt seeds

- "1 of 3 seconds — 3333 or 3334 bps?"
- "Contrast this time share with the range backtester fee product."
- "Refuse mixing GET /api/v3/market into inRangeBps."

## Do not

- Call this concentrated IL or a live Alcor efficiency score.
- Half-up the floor and keep the locked table.
