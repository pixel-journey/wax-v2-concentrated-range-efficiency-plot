# Sources

| Source | Use |
| --- | --- |
| [range backtester](https://github.com/pixel-journey/wax-alcor-v2-range-efficiency-backtester) | Fee product (different units) |
| [docs.alcor.exchange/api](https://docs.alcor.exchange/api) | v2 market data still hosted; v3 for new clients. This lab calls neither. |
| [SECURITY.md](SECURITY.md) | Locked samples |

## Product facts locked by tests

```text
inRangeBps(inRangeSec, windowSec) = floor(inRangeSec * 10000 / windowSec)
```

| Call | Result |
| --- | --- |
| `inRangeBps(100, 400)` | **2500** |
| `inRangeBps(1, 3)` | **3333** (not 3334) |
| `inRangeBps(4, 4)` | **10000** |
| `inRangeBps(0, 4)` | **0** |
| `inRangeBps(5, 4)` | throws |

## What this is not

- Not "range efficiency" as a fee claim — only a time-share floor in bps.
- Not the truncating fee product in the backtester (10000 × 30 bps × 100/400 → 7 tokens).
- Not an Alcor v2 or v3 HTTP call. The `v2` in the name is historical product naming.

Arguments only. Floor division ports; do not half-up and still cite these tests.
