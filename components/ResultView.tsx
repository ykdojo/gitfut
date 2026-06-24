"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import type { Card } from "@/lib/scoring/types";
import { shareUrl } from "@/lib/share";
import PlayerCard from "./PlayerCard";
import { RESULT_THEME } from "./finishTheme";
import { ArrowLeft } from "lucide-react";

interface Props {
  card: Card;
  onBack: () => void;
}

const ctaClass =
  "font-display flex h-[52px] flex-1 items-center justify-center gap-2 rounded-xl text-[17px] font-extrabold tracking-[.04em] transition";

export default function ResultView({ card, onBack }: Props) {
  const [dlLabel, setDlLabel] = useState("DOWNLOAD");
  const captureRef = useRef<HTMLDivElement>(null);
  const theme = RESULT_THEME[card.finish];

  const download = async () => {
    const node = captureRef.current;
    if (!node) return;
    setDlLabel("RENDERING…");
    try {
      await document.fonts.ready; // ensure the local FUT fonts are loaded before capture
      const dataUrl = await toPng(node, { pixelRatio: 3, cacheBust: true });
      const a = document.createElement("a");
      a.download = `${card.login}-scouted.png`;
      a.href = dataUrl;
      a.click();
      setDlLabel("DOWNLOADED");
      setTimeout(() => setDlLabel("DOWNLOAD"), 1800);
    } catch {
      setDlLabel("DOWNLOAD");
    }
  };

  return (
    <main className="relative z-[2] mx-auto max-w-[1140px] px-[22px] pb-[70px] pt-[clamp(10px,3vh,30px)]">
      <button
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-[7px] text-[14px] font-semibold text-ink-faint cursor-pointer"
      >
        <ArrowLeft size={18} />
        back
      </button>

      <div className="grid items-start gap-[clamp(28px,5vw,64px)] [grid-template-columns:minmax(280px,360px)_1fr] max-[860px]:grid-cols-1">
        <div className="flex flex-col items-center gap-6">
          <div
            ref={captureRef}
            className="animate-card-reveal relative w-[min(340px,82vw)]"
          >
            <div
              className="animate-glow absolute -inset-[12%] z-0 rounded-full blur-[18px]"
              style={{
                background: `radial-gradient(closest-side, ${theme.glow}, transparent 72%)`,
              }}
            />
            <div className="relative z-[1]">
              <PlayerCard card={card} />
            </div>
          </div>
          <div className="flex w-[min(340px,82vw)] gap-3">
            <button
              onClick={() =>
                window.open(shareUrl(card), "_blank", "noopener,noreferrer")
              }
              className={`${ctaClass} bg-brand text-white shadow-[0_6px_22px_rgba(255,77,94,.34)] hover:bg-brand-hi`}
            >
              SHARE ON X
            </button>
            <button
              onClick={download}
              className={`${ctaClass} border-[1.5px] border-white/15 bg-white/[0.04] text-ink-dim hover:border-white/40 hover:text-white`}
            >
              {dlLabel}
            </button>
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-[14px] flex flex-wrap items-end gap-[14px]">
            <h2 className="font-display m-0 text-[clamp(34px,5vw,52px)] font-black leading-[.92]">
              {card.name}
            </h2>
            <span
              className="font-display rounded-md px-[11px] py-[5px] text-[14px] font-bold tracking-[.16em]"
              style={{ background: theme.chip, color: theme.ink }}
            >
              {card.finishLabel} · {card.overall} OVR
            </span>
          </div>
          <p className="m-0 mb-[22px] max-w-[480px] text-[16px] leading-[1.55] text-ink-soft">
            Lines up at {card.position} — {card.archetype},{" "}
            {card.archetypeBlurb}.
          </p>

          <div className="flex flex-col gap-[9px]">
            {card.breakdown.map((b) => (
              <div
                key={b.abbr}
                className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-panel px-4 py-[14px]"
              >
                <div className="font-display w-[52px] text-center text-[34px] font-black leading-none text-brand">
                  {b.value}
                </div>
                <div className="self-stretch w-px bg-white/[0.08]" />
                <div className="min-w-0">
                  <div className="font-display text-[13px] font-bold tracking-[.14em] text-ink-faint">
                    {b.abbr} · {b.title}
                  </div>
                  <div className="text-[14px] leading-[1.4] text-ink-dim">
                    {b.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
