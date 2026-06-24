import { fetchProfile, type GithubError } from "@/lib/github/client";
import { signalsFromPayload } from "@/lib/github/signals";
import { buildCard } from "@/lib/scoring/engine";

export async function GET(_req: Request, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  try {
    const card = buildCard(signalsFromPayload(await fetchProfile(username)));
    return Response.json(card);
  } catch (e) {
    const err = e as GithubError;
    const status =
      err.type === "notfound"
        ? 404
        : err.type === "invalid"
          ? 400
          : err.type === "ratelimit"
            ? 429
            : err.type === "config"
              ? 500
              : 502;
    return Response.json({ error: err.message ?? "Failed to scout that profile." }, { status });
  }
}
