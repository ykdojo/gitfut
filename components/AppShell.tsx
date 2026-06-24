"use client";

import { useState } from "react";
import ScoutForm from "@/components/ScoutForm";
import CardFan from "@/components/CardFan";
import ResultView from "@/components/ResultView";
import HowItWorksModal from "@/components/HowItWorksModal";
import { useScout } from "@/hooks/useScout";
import { SAMPLE_CARDS } from "@/lib/github/samples";
import { Star } from "lucide-react";

export default function AppShell() {
  const { card, loading, error, scout } = useScout();
  const [view, setView] = useState<"home" | "result">("home");
  const [modalOpen, setModalOpen] = useState(false);

  const handleScout = async (name: string) => {
    if (await scout(name)) {
      setView("result");
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      {view === "home" ? (
        <main className="relative z-[2] flex h-screen min-h-[520px] flex-col overflow-hidden max-[860px]:h-auto max-[860px]:min-h-screen max-[860px]:overflow-visible">
          <div className="mx-auto flex w-full max-w-[1180px] flex-1 items-center gap-[clamp(24px,5vw,72px)] px-[clamp(22px,5vw,56px)] max-[860px]:flex-col max-[860px]:gap-[34px] max-[860px]:pb-6 max-[860px]:pt-[clamp(26px,5vh,40px)] max-[860px]:text-center">
            <ScoutForm
              loading={loading}
              error={error}
              onScout={handleScout}
              onOpenModal={() => setModalOpen(true)}
            />
            <CardFan cards={SAMPLE_CARDS} onPick={handleScout} />
          </div>
          <footer className="relative z-[2] flex flex-none items-center justify-center p-[clamp(12px,2.6vh,24px)]">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-[9px] rounded-[10px] px-[15px] py-[9px] text-[13.5px] font-bold text-[#9a94a8] transition hover:bg-white/5 hover:text-ink"
            >
              Support the project
              <div className="flex items-center gap-[5px]">
                <span className="font-semibold text-ink-mute">2.4k</span>
                <Star color="#fca68d" size={13} />
              </div>
            </a>
          </footer>
        </main>
      ) : (
        card && <ResultView card={card} onBack={() => setView("home")} />
      )}

      {modalOpen && <HowItWorksModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
