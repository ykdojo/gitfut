"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface Props {
  loading: boolean;
  error: string | null;
  onScout: (name: string) => void;
  onOpenModal: () => void;
}

const exampleClass =
  "cursor-pointer text-ink-soft underline underline-offset-[3px]";

export default function ScoutForm({
  loading,
  error,
  onScout,
  onOpenModal,
}: Props) {
  const [name, setName] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onScout(name);
  };

  return (
    <div className="min-w-0 flex-1">
      <h1 className="font-display m-0 mb-4 text-[clamp(46px,6.6vw,94px)] font-black leading-[.86] tracking-[-.02em]">
        GET SCOUTED<span className="text-brand">.</span>
      </h1>
      <p className="mb-[26px] max-w-[400px] text-[clamp(15px,1.7vw,19px)] font-semibold leading-[1.45] text-ink-dim">
        Your GitHub stats, turned into a FUT-style player card rated out of 99.
      </p>

      <form
        onSubmit={submit}
        className="m-0 flex max-w-[440px] flex-wrap gap-[10px] max-[860px]:mx-auto"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="GitHub username"
          autoComplete="off"
          spellCheck={false}
          className="font-sans h-14 min-w-[190px] flex-1 rounded-[13px] border-[1.5px] border-white/15 bg-[rgba(13,11,20,.66)] px-5 text-[17px] font-semibold text-white outline-none backdrop-blur-[4px] transition focus:border-brand focus:shadow-[0_0_0_4px_rgba(255,77,94,.16),0_0_38px_rgba(255,77,94,.22)]"
        />
        <button
          type="submit"
          disabled={loading}
          className="font-display flex h-14 items-center gap-1 rounded-[13px] bg-brand px-6 text-[18px] font-extrabold tracking-[.08em] text-white shadow-[0_8px_24px_rgba(255,77,94,.34)] transition hover:bg-brand-hi disabled:cursor-wait disabled:opacity-75 cursor-pointer"
        >
          {loading ? "SCOUTING…" : "SCOUT"}
          {!loading && (
            <span className="text-[19px] leading-none">
              <ArrowRight />
            </span>
          )}
        </button>
      </form>

      {error && (
        <div
          role="alert"
          className="mt-[13px] max-w-[440px] rounded-[10px] border border-brand/30 bg-brand/10 px-[13px] py-[10px] text-[13.5px] font-semibold text-[#ffb3bb]"
        >
          {error}
        </div>
      )}

      <div className="mt-[13px] text-[13px] text-ink-mute">
        try{" "}
        <span onClick={() => onScout("torvalds")} className={exampleClass}>
          torvalds
        </span>{" "}
        ·{" "}
        <span onClick={() => onScout("sindresorhus")} className={exampleClass}>
          sindresorhus
        </span>{" "}
        · or your own
      </div>

      <div className="mt-[22px] flex flex-wrap items-center gap-x-[18px] gap-y-2 text-[12.5px] font-medium text-[#7a7488] max-[860px]:justify-center">
        <span className="inline-flex items-center gap-2">
          <span className="h-[7px] w-[7px] rounded-full bg-[#2ec27e] shadow-[0_0_8px_#2ec27e]" />
          <strong className="font-bold text-ink-dim">12,480</strong> cards rated
          this window
        </span>
        <span
          onClick={onOpenModal}
          className="cursor-pointer font-bold text-ink-soft transition hover:text-ink-dim"
        >
          how it works ↗
        </span>
      </div>
    </div>
  );
}
