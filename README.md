# Seconds inside a window

**Trust label:** `educational-reference`  
**Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

100 of 400 seconds is 2500 bps. 1 of 3 truncates to 3333. No pool is read.

The earlier README described a live product. This tree does not ship that.

## What is actually in the repo

| Piece | Role |
| --- | --- |
| `src/span.ts` | The pure rules |
| `src/span.test.ts` | The claims in the verification log |
| `src/usecases.ts` | HTTP requests, built and not sent |
| `src/Demo.tsx` | Offline page |

`npm test` runs the rules. `npm run dev` opens the page.

## Queries

`executed` is false. This repo did not call any host. No transaction is invented.
