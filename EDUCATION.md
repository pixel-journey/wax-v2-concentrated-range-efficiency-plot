# Education — seconds inside a window, floored

> **Rung:** `npm test` passes. Both numbers are seconds you pass. No pool is read. This is **not** range efficiency and **not** a fee.  
> **The test is the rule.** The same floor that drops a basis point is [px-token-dust-truncation-visualizer](https://github.com/pixel-journey/px-token-dust-truncation-visualizer). Fee product that uses a time share: [wax-alcor-v2-range-efficiency-backtester](https://github.com/pixel-journey/wax-alcor-v2-range-efficiency-backtester).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Compute `floor(inRangeSec * 10000 / windowSec)` for the locked cases |
| Intermediate | Enforce window 1..31536000 and inRange ≤ window |
| Masterclass | Separate this time share from fee tokens and from CLMM ticks |

---

## Beginner — one scene

| Call | Locked result |
| --- | --- |
| `inRangeBps(100, 400)` | **2500** |
| `inRangeBps(1, 3)` | **3333** (not 3334) |
| `inRangeBps(4, 4)` | **10000** |
| `inRangeBps(0, 4)` | **0** |
| `inRangeBps(5, 4)` | throws |

```bash
npm test
```

---

## Intermediate — bounds

| Parameter | Valid |
| --- | --- |
| `windowSec` | integer 1 .. 31_536_000 |
| `inRangeSec` | integer 0 .. windowSec |

2500 bps of **time** is not 2500 tokens. The backtester multiplies principal × fee × time share.

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Half-up 3333.33 | still 3333 |
| inRange > window | throws |
| window 0 | throws |
| Call this "efficiency" | refused in docs |

### Exercises

1. 1 of 3 seconds — bps? (**3333**.)  
2. Is 2500 a fee claim? (**No**.)  
3. Does this read a pool? (**No**.)

---

## Masterclass

| Sibling | Role |
| --- | --- |
| [range backtester](https://github.com/pixel-journey/wax-alcor-v2-range-efficiency-backtester) | fee product → 7 tokens sample |
| [range optimizer](https://github.com/pixel-journey/wax-alcor-v2-range-optimizer) | cover width fraction |
| [IL heat map](https://github.com/pixel-journey/wax-lp-impermanent-loss-heat-map) | full-range IL |

`v2` in the name is historical. No Alcor HTTP.

---

## What this course will not teach

- Live range efficiency scoring
- Concentrated-liquidity IL
- Fee APR
