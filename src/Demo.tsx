"use client";

import { inRangeBps } from "./span";

export function Demo() {
  const quarter = inRangeBps(100, 400);
  const awkward = inRangeBps(1, 3);
  return (
    <main className="wrap">
      <p className="kicker">Educational reference</p>
      <h1>Seconds inside, over the window</h1>
      <p className="lede">100 of 400 seconds is 2500 basis points. 1 of 3 truncates to 3333. No range was read from Alcor.</p>
      <p>
        {quarter.bps} bps. The short window is {awkward.bps} bps.
      </p>
    </main>
  );
}
