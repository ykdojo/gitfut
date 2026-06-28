import "server-only";
import { cache } from "react";
import { list } from "@vercel/blob";
import { createHmac } from "node:crypto";

// Shared card-image (Vercel Blob) helpers. The card PNG/WebP is rendered
// client-side (the exact in-app card via html-to-image) and stored here at a
// deterministic path, then served for embeds (/<user>.png) and OG previews.

const STALE_MS = 7 * 24 * 60 * 60 * 1000; // re-generate cards older than a week

export const blobPathFor = (login: string) => `cards/${login.toLowerCase()}.webp`;

// Look up a card image by login. Memoised per request so generateMetadata + the
// page share one Blob call. Returns null when it hasn't been generated yet.
export const getCardImage = cache(
  async (login: string): Promise<{ url: string; stale: boolean } | null> => {
    try {
      const { blobs } = await list({ prefix: blobPathFor(login), limit: 1 });
      const b = blobs[0];
      if (!b) return null;
      const stale = Date.now() - new Date(b.uploadedAt).getTime() > STALE_MS;
      return { url: b.url, stale };
    } catch {
      return null;
    }
  },
);

// Light write-gate for the client upload: the card page hands the browser an
// HMAC of the login, which the upload route verifies. Keyed off the (server-only)
// Blob token so no extra secret is needed. Not bulletproof (the sig is in the
// page), but it stops drive-by writes to arbitrary card paths.
const secret = () => process.env.BLOB_READ_WRITE_TOKEN ?? "gitfut-dev-secret";
export const signLogin = (login: string) =>
  createHmac("sha256", secret()).update(login.toLowerCase()).digest("base64url").slice(0, 24);
export const verifyLogin = (login: string, sig: string) => {
  try {
    return !!login && !!sig && signLogin(login) === sig;
  } catch {
    return false;
  }
};
