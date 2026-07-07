"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";

interface Props {
  value: string | null;
  onChange: (name: string) => void;
}

// Center name slot coordinates on the 540x820 PlayerCard
const SLOT = { left: "15%", top: "54%", width: "70%", height: "10%" } as const;

export default function CardNamePicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value || "");

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside(rootRef, open, () => setOpen(false));

  useEffect(() => {
    if (open) {
      setTempValue(value || "");
      // Focus and select the text for quick editing
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 50);
    }
  }, [open, value]);

  const submit = () => {
    onChange(tempValue.trim());
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-20">
      {/* Hotspot overlaying the card's name text */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Edit name on card"
        title="Edit name on card"
        style={SLOT}
        className="group pointer-events-auto absolute flex items-center justify-center outline-none ring-brand/0 transition focus-visible:ring-2 focus-visible:ring-brand/70 rounded-lg"
      >
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/45 group-hover:opacity-100 group-focus-visible:bg-black/45 group-focus-visible:opacity-100 group-aria-expanded:bg-black/45 group-aria-expanded:opacity-100 rounded-lg">
          <Pencil className="h-[42%] w-[42%] max-h-5 max-w-5 text-white drop-shadow" />
        </span>
      </button>

      {open && (
        <div
          role="presentation"
          className="animate-pop pointer-events-auto absolute z-30 w-[240px] max-w-[80vw] overflow-hidden rounded-[14px] border border-line bg-panel/95 shadow-[0_18px_46px_-12px_rgba(0,0,0,.7)] backdrop-blur-[10px] p-[10px]"
          // Anchor below the name slot
          style={{ left: "50%", top: `calc(${SLOT.top} + ${SLOT.height} + 2%)`, transform: "translateX(-50%)" }}
        >
          <div className="flex items-center gap-[6px]">
            <input
              ref={inputRef}
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Card name..."
              maxLength={20}
              className="h-10 w-full rounded-[9px] border border-line bg-bg/60 px-3 text-[14px] text-white outline-none transition focus:border-brand/70"
            />
            <button
              type="button"
              onClick={submit}
              aria-label="Confirm name"
              className="flex h-10 w-10 flex-none items-center justify-center rounded-[9px] bg-brand text-[#04130a] transition hover:bg-brand-hi cursor-pointer"
            >
              <Check size={16} />
            </button>
            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Remove override"
                className="flex h-10 w-10 flex-none items-center justify-center rounded-[9px] border border-line bg-white/[0.02] text-ink-soft transition hover:bg-white/[0.06] hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
