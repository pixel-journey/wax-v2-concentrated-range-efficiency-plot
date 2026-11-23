import { describe, expect, it } from "vitest";
import { inRangeBps } from "./span";

describe("in-range share", () => {
  it("truncates instead of rounding", () => {
    expect(inRangeBps(100, 400)).toEqual({ bps: 2500 });
    expect(inRangeBps(1, 3)).toEqual({ bps: 3333 });
    expect(inRangeBps(4, 4)).toEqual({ bps: 10000 });
    expect(inRangeBps(0, 4)).toEqual({ bps: 0 });
    expect(() => inRangeBps(5, 4)).toThrow(/window/);
  });

  it("refuses window 0 and over one year", () => {
    expect(() => inRangeBps(0, 0)).toThrow(/windowSec/);
    expect(() => inRangeBps(0, 31_536_001)).toThrow(/windowSec/);
  });
});
