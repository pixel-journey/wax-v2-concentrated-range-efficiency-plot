import { describe, expect, it } from "vitest";
import { inRangeBps } from "./span";

describe("in-range share", () => {
  it("truncates instead of rounding", () => {
    expect(inRangeBps(100, 400)).toEqual({ bps: 2500 });
    expect(inRangeBps(1, 3)).toEqual({ bps: 3333 });
    expect(() => inRangeBps(5, 4)).toThrow(/window/);
  });
});
