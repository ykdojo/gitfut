import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { blobPathFor, verifyLogin } from "@/lib/cardImage";

export const runtime = "nodejs";

// Issues a short-lived client-upload token for the card image, locked to the
// caller's own login (HMAC-verified) and exact Blob path, so the browser can
// upload the rendered card directly to Vercel Blob.
export async function POST(request: Request): Promise<NextResponse> {
  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "bad body" }, { status: 400 });
  }
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const { login, sig } = JSON.parse(clientPayload ?? "{}") as {
          login?: string;
          sig?: string;
        };
        if (!login || !verifyLogin(login, sig ?? "")) throw new Error("unauthorized");
        if (pathname !== blobPathFor(login)) throw new Error("bad path");
        return {
          allowedContentTypes: ["image/webp"],
          maximumSizeInBytes: 3 * 1024 * 1024,
          addRandomSuffix: false, // deterministic URL per login
          allowOverwrite: true, // allow refresh / stale re-generation
          cacheControlMaxAge: 60 * 60 * 24, // 1 day on the Blob CDN
        };
      },
      onUploadCompleted: async () => {
        /* deterministic path → nothing to record */
      },
    });
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "upload failed" },
      { status: 400 },
    );
  }
}
