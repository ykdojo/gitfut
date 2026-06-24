"use client";

const STAT_KEYS = [
  { abbr: "PAC", title: "PACE", desc: "Commits in the last year" },
  { abbr: "SHO", title: "SHOOTING", desc: "Stars earned across repos" },
  { abbr: "PAS", title: "PASSING", desc: "Pull requests + followers" },
  { abbr: "DRI", title: "DRIBBLING", desc: "Language diversity" },
  { abbr: "DEF", title: "DEFENDING", desc: "Reviews + issues" },
  { abbr: "PHY", title: "PHYSICAL", desc: "Lifetime contributions" },
];

const FINISHES = [
  { label: "BRONZE · ≤64", bg: "#2A1A0C", ink: "#F0CFA8" },
  { label: "SILVER · 65–74", bg: "#262B33", ink: "#D6DCE6" },
  { label: "GOLD · 75–84", bg: "#3A2806", ink: "#F3D679" },
  { label: "IN-FORM · spike", bg: "#4A0A14", ink: "#FFD3D9" },
  { label: "TOTY · 85–89", bg: "#10254F", ink: "#CADBFF" },
  { label: "ICON · 90+", bg: "#2A1A45", ink: "#F3D688" },
];

export default function HowItWorksModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(6,5,12,.74)] p-[22px] backdrop-blur-[6px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] w-[min(560px,100%)] overflow-auto rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,#16121F,#100D17)] p-[clamp(22px,4vw,34px)] shadow-[0_30px_80px_rgba(0,0,0,.6)]"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-[15px] text-ink-faint"
        >
          ✕
        </button>
        <div className="font-display mb-2 text-[12px] font-semibold tracking-[.28em] text-brand">THE MATH</div>
        <h3 className="font-display m-0 mb-[6px] text-[clamp(26px,4vw,34px)] font-extrabold tracking-[-.01em]">
          How it&apos;s calculated
        </h3>
        <p className="m-0 mb-[22px] text-[14.5px] leading-[1.5] text-ink-faint">
          Six signals from a live GitHub profile, each mapped to a football stat and scored out of 99 — all read
          straight from GitHub&apos;s GraphQL API.
        </p>

        <div className="flex flex-col gap-[9px]">
          {STAT_KEYS.map((k) => (
            <div
              key={k.abbr}
              className="flex items-center gap-[14px] rounded-xl border border-white/[0.06] bg-white/[0.025] px-[14px] py-3"
            >
              <div className="font-display w-[50px] flex-none rounded-[7px] bg-brand py-[6px] text-center text-[15px] font-extrabold tracking-[.04em] text-bg">
                {k.abbr}
              </div>
              <div className="min-w-0">
                <div className="font-display text-[13px] font-bold tracking-[.1em] text-ink-dim">{k.title}</div>
                <div className="text-[13.5px] text-ink-faint">{k.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[22px] border-t border-white/[0.08] pt-5">
          <div className="font-display mb-[10px] text-[13px] font-bold tracking-[.12em] text-ink-faint">
            OVERALL &amp; FINISHES
          </div>
          <p className="m-0 mb-[14px] text-[14px] leading-[1.55] text-ink-dim">
            Stats alone cap at 88 — the 90s are earned with years and influence (a legacy gate), so one big year won&apos;t
            make you a legend. Your finish:
          </p>
          <div className="flex flex-wrap gap-2">
            {FINISHES.map((f) => (
              <span
                key={f.label}
                className="font-display rounded-[7px] px-[11px] py-[5px] text-[13px] font-bold tracking-[.06em]"
                style={{ background: f.bg, color: f.ink }}
              >
                {f.label}
              </span>
            ))}
          </div>
          <p className="m-0 mt-4 text-[12.5px] leading-[1.5] text-ink-mute">
            Position and archetype are read from your stat shape — a SHO spike makes a Poacher up top, a DEF/PAS lean
            makes a Regista at the back. Data is pulled live from GitHub&apos;s GraphQL API.
          </p>
        </div>
      </div>
    </div>
  );
}
