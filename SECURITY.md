# Security — seconds inside a window (floor bps)

## Closed in tests

| Issue | Behavior |
| --- | --- |
| `inRangeBps(100, 400)` | **2500** |
| `inRangeBps(1, 3)` | **3333** (not 3334) |
| `inRangeBps(4, 4)` | **10000** |
| `inRangeBps(0, 4)` | **0** |
| `inRangeBps(5, 4)` | throws |
| window 0 or > 31536000 | throws |

Formula: `floor(inRangeSec * 10000 / windowSec)`.

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Range efficiency | **Not** this product — only a time-share floor |
| Live pool | Arguments only |
| Fee product | See [range backtester](https://github.com/pixel-journey/wax-alcor-v2-range-efficiency-backtester) |

## Attack angles

1. Calling 3333 bps "range efficiency."  
2. Rounding half-up in a port and still citing this test.  
3. Claiming a live Alcor position was timed.  
4. Mixing with fee product without noting different units.

## Honesty limits

No network. No wasm. Floor only.

| Sibling | Distinction |
| --- | --- |
| [range backtester](https://github.com/pixel-journey/wax-alcor-v2-range-efficiency-backtester) | Truncating fee product (7 tokens sample) |
| [dust visualizer](https://github.com/pixel-journey/px-token-dust-truncation-visualizer) | Same floor idea on fees |
| [range optimizer](https://github.com/pixel-journey/wax-alcor-v2-range-optimizer) | Cover-width fraction |

[docs.wax.io](https://docs.wax.io/).
