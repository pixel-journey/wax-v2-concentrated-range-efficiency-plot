# Education — seconds inside a window, floored

> **Rung:** `npm test` passes. Both numbers are seconds you pass. No pool is read. This is not range efficiency.  
> **The test is the rule.** The same floor that drops a basis point is [px-token-dust-truncation-visualizer](https://github.com/pixel-journey/px-token-dust-truncation-visualizer). Where a price sits against a band is [wax-lp-predictive-rebalance-advisor](https://github.com/pixel-journey/wax-lp-predictive-rebalance-advisor).

## Predict, then run

`floor(inRangeSec * 10000 / windowSec)`.

| Call | Locked result |
| --- | --- |
| `inRangeBps(100, 400)` | `2500` |
| `inRangeBps(1, 3)` | `3333`. `10000 / 3` is not `3334`. The remainder is dropped. |
| `inRangeBps(4, 4)` | `10000` |
| `inRangeBps(0, 4)` | `0` |
| `inRangeBps(5, 4)` | throws. Inside-seconds cannot exceed the window. |

The HTTP examples include an Atomic Packs `unboxassets` row. That request is unsent, and it is not this floor.
