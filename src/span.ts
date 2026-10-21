/**
 * Share of a window spent inside a range, in basis points.
 * The seconds are arguments. No pool is read.
 */

export function inRangeBps(inRangeSec: number, windowSec: number): { bps: number } {
  if (!Number.isInteger(windowSec) || windowSec < 1 || windowSec > 31_536_000) throw new Error("windowSec must be an integer from 1 to 31536000");
  if (!Number.isInteger(inRangeSec) || inRangeSec < 0 || inRangeSec > windowSec) throw new Error("inRangeSec must be an integer from 0 to the window");
  return { bps: Math.floor((inRangeSec * 10_000) / windowSec) };
}
