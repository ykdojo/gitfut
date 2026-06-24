export type StatKey = "pac" | "sho" | "pas" | "dri" | "def" | "phy";
export type Stats = Record<StatKey, number>;
export type Profile = Record<StatKey, number>;

export type Finish = "bronze" | "silver" | "gold" | "totw" | "toty" | "icon";
export type Position = "ST" | "RW" | "CAM" | "CM" | "CDM" | "CB";
export type Family = "Forward" | "Playmaker" | "Anchor";

export interface Signals {
  login: string;
  name: string;
  avatarUrl: string;
  followers: number;
  account_age_years: number;
  public_repos: number;
  total_stars_owned: number;
  max_repo_stars: number;
  languages: number;
  recent_contributions: number;
  active_days_recent: number;
  active_years: number;
  total_contributions_lifetime: number;
  prs_to_others: number;
  reviews: number;
  issues_closed: number;
  recent_spike: boolean;
}

export interface BreakdownItem {
  abbr: string;
  title: string;
  value: number;
  reason: string;
}

export interface Archetype {
  name: string;
  blurb: string;
}

export interface Card {
  login: string;
  name: string;
  avatarUrl: string;
  // country & club are asset keys (public/badges/...), defaulted now and meant
  // to be user-editable later.
  country: string;
  club: string;
  stats: Stats;
  position: Position;
  family: Family;
  baseOVR: number;
  overall: number;
  finish: Finish;
  finishLabel: string;
  archetype: string;
  archetypeBlurb: string;
  legacy: { L: number };
  breakdown: BreakdownItem[];
}
