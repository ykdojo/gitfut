import { ImageResponse } from "next/og";
import { getCardImage } from "@/lib/cardImage";
import { loadCardFonts } from "@/lib/og/card";

export const runtime = "nodejs";

const W = 560;
const H = 860;

// Embeddable card image: gitfut.com/<user>.png (via rewrite) -> here.
// If the exact card has been generated (client-side, stored in Blob), redirect
// to it. Otherwise serve a branded "open the page to generate it" hint with a
// short cache, so the embed flips to the real card once someone visits.
export async function GET(_req: Request, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const img = await getCardImage(username);

  if (img) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: img.url,
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  }

  const fonts = await loadCardFonts();
  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1117",
          backgroundImage: "radial-gradient(60% 46% at 50% 32%, rgba(57,211,83,0.16), transparent 72%)",
          color: "#e6edf3",
          fontFamily: "DINPro",
          padding: 56,
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", color: "#39d353", fontSize: 24, fontWeight: 700, letterSpacing: 4 }}>GITFUT</div>
        <div style={{ display: "flex", fontSize: 62, fontWeight: 700, marginTop: 18 }}>@{username}</div>
        <div style={{ display: "flex", fontSize: 28, color: "#a8b3bd", marginTop: 20, lineHeight: 1.35, textAlign: "center" }}>
          Open this card once to generate it:
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 14, fontSize: 30 }}>
          <span style={{ color: "#39d353", fontWeight: 700 }}>gitfut.com</span>
          <span style={{ color: "#e6edf3" }}>/{username}</span>
        </div>
      </div>
    ),
    { width: W, height: H, fonts, headers: { "Cache-Control": "public, max-age=60" } },
  );
}
