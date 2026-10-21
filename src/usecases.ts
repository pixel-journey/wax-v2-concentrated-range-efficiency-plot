import { HISTORY_ORIGIN, historyActions } from "./api";
import { inRangeBps } from "./span";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

const quarter = inRangeBps(100, 400);

export const USE_CASES: UseCase[] = [
  {
    title: "Markets do not contain these seconds",
    detail: `100 of 400 is ${quarter.bps} bps. 1 of 3 truncates to 3333. GET /api/markets is not a time-in-range series.`,
    request: { method: "GET", url: "https://wax.alcor.exchange/api/markets", executed: false },
    transaction: null,
  },
  {
    title: "Swap transfers are not the window",
    detail: "No liquidity position is opened or closed.",
    request: historyActions(HISTORY_ORIGIN, "swap.alcor", "eosio.token:transfer", 20),
    transaction: null,
  },
];

export function assertUseCases(): void {
  if (quarter.bps !== 2500 || inRangeBps(1, 3).bps !== 3333) throw new Error("bps");
}
