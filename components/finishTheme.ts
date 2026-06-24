import type { Finish } from "@/lib/scoring/types";

// Each finish maps to a FUT background PNG (public/cards), the text ink the
// Python generator uses for that card, a glow for the card's drop-shadow, and
// avatarTint — a gradient laid over the avatar so any photo/logo/anime blends
// into the card's palette. The tint is matched to the card's BRIGHTNESS: light
// cards (silver, gold, legend-gold icon) tint light so dark photos are lifted
// toward the card; dark cards (toty/totw) tint dark so bright photos are pulled
// down. totw reuses the TOTY art; icon uses the legend art.
export interface CardTheme {
  bg: string;
  ink: string;
  glow: string;
  avatarTint: string;
}

export const CARD_THEME: Record<Finish, CardTheme> = {
  bronze: {
    bg: "/cards/bronze.png",
    ink: "#3a2717",
    glow: "rgba(190,120,60,.45)",
    avatarTint: "linear-gradient(165deg, rgba(150,105,62,.28), rgba(110,74,42,.32))",
  },
  silver: {
    bg: "/cards/silver.png",
    ink: "#303536",
    glow: "rgba(170,188,210,.5)",
    avatarTint: "linear-gradient(165deg, rgba(190,198,210,.30), rgba(150,158,170,.34))",
  },
  gold: {
    bg: "/cards/gold.png",
    ink: "#46390c",
    glow: "rgba(225,185,80,.55)",
    avatarTint: "linear-gradient(165deg, rgba(228,194,104,.28), rgba(186,150,62,.32))",
  },
  totw: {
    bg: "/cards/toty.png",
    ink: "#ebcd5b",
    glow: "rgba(90,140,255,.55)",
    avatarTint: "linear-gradient(165deg, rgba(40,78,155,.28), rgba(12,30,72,.38))",
  },
  toty: {
    bg: "/cards/toty.png",
    ink: "#ebcd5b",
    glow: "rgba(90,140,255,.55)",
    avatarTint: "linear-gradient(165deg, rgba(40,78,155,.28), rgba(12,30,72,.38))",
  },
  icon: {
    bg: "/cards/legend.png",
    ink: "#625217",
    glow: "rgba(243,213,128,.5)",
    avatarTint: "linear-gradient(165deg, rgba(222,188,112,.28), rgba(150,116,46,.34))",
  },
};

export interface ResultTheme {
  glow: string;
  chip: string;
  ink: string;
}

export const RESULT_THEME: Record<Finish, ResultTheme> = {
  bronze: { glow: "rgba(190,120,60,.34)", chip: "#2A1A0C", ink: "#F0CFA8" },
  silver: { glow: "rgba(170,188,210,.34)", chip: "#262B33", ink: "#D6DCE6" },
  gold: { glow: "rgba(225,185,80,.4)", chip: "#3A2806", ink: "#F3D679" },
  totw: { glow: "rgba(90,140,255,.5)", chip: "#10254F", ink: "#CADBFF" },
  toty: { glow: "rgba(90,140,255,.5)", chip: "#10254F", ink: "#CADBFF" },
  icon: { glow: "rgba(243,213,128,.45)", chip: "#2A1A45", ink: "#F3D688" },
};
