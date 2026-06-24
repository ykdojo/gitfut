"use client";

import { useState } from "react";
import type { Card } from "@/lib/scoring/types";

const TTL = 3 * 60 * 60 * 1000;
const cacheKey = (login: string) => `gitfut:card:${login.toLowerCase()}`;

function readCache(login: string): Card | null {
  try {
    const hit = JSON.parse(localStorage.getItem(cacheKey(login)) ?? "null");
    return hit && Date.now() - hit.t < TTL ? (hit.card as Card) : null;
  } catch {
    return null;
  }
}

export function useScout() {
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scout = async (name: string): Promise<boolean> => {
    if (loading) return false;
    const login = name.trim().replace(/^@/, "");

    const cached = readCache(login);
    if (cached) {
      setCard(cached);
      setError(null);
      return true;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/card/${encodeURIComponent(login)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Couldn't scout that profile.");
      setCard(data as Card);
      try {
        localStorage.setItem(cacheKey(login), JSON.stringify({ t: Date.now(), card: data }));
      } catch {
        /* quota / private mode */
      }
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { card, loading, error, scout };
}
