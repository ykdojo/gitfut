import type { Card } from "@/lib/scoring/types";

const lines = (c: Card) => [
  `apparently i'm a ${c.overall}-rated ${c.position}. my commits do numbers, my cardio does not.`,
  `${c.finishLabel.toLowerCase()} finish, ${c.overall} overall. peaked, and it was on github.`,
  `pulled a ${c.overall} overall off my github. open source national team, where you at.`,
  `${c.overall} overall ${c.position}, ${c.archetype}. built different, deployed different.`,
  `got carded at ${c.overall} overall. the scouts (nobody) are calling.`,
  `turns out shipping code makes you a ${c.overall}-rated baller. who knew.`,
];

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

export function shareUrl(card: Card): string {
  const pool = lines(card);
  const text = pool[hash(card.login) % pool.length];
  return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text + "\n\nget scouted →");
}
