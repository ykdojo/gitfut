// Rating histogram from a uniform random sample of GitHub accounts,
// scored with this repo's own engine.
export const DIST_MIN = 50;
export const DIST_DATE = "2026-07-04";
// All sampled accounts: DIST_N in total, of which DIST_COUNTS[i] have
// overall rating DIST_MIN + i
export const DIST_N = 18107;
export const DIST_COUNTS: number[] = [0, 9, 6937, 6156, 1505, 1185, 837, 343, 214, 168, 133, 86, 66, 49, 40, 40, 38, 30, 31, 31, 22, 15, 17, 15, 17, 11, 23, 9, 6, 13, 15, 6, 11, 5, 6, 5, 1, 2, 1, 1, 2, 1, 0, 0, 2, 2, 1, 0, 0, 0];
// Same sample, restricted to accounts with >= 1 contribution in the past
// year: DIST_ACTIVE_N in total, of which DIST_ACTIVE_COUNTS[i] have
// overall rating DIST_MIN + i
export const DIST_ACTIVE_N = 2118;
export const DIST_ACTIVE_COUNTS: number[] = [0, 9, 578, 478, 216, 154, 100, 62, 63, 55, 43, 39, 26, 25, 24, 21, 18, 18, 19, 22, 11, 12, 10, 10, 9, 10, 18, 8, 6, 6, 8, 6, 11, 2, 4, 5, 1, 2, 1, 1, 1, 1, 0, 0, 2, 2, 1, 0, 0, 0];
