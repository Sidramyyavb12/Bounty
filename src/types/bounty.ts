export type BountyMode = "digital" | "physical";
export type BountyType = "Content" | "Design" | "Development" | "Marketing" | "Other";
export type DominantCore = "Water" | "Earth" | "Social" | "Energy";

export type Reward = {
  id?: string;
  title?: string;
  amount?: number;
  winners?: number;
  currency?: string;
  expiration_date?: string;
};

export type Backer = {
  name?: string;
  logo?: string;
  message?: string;
};

export type Timeline = {
  expiration_date?: string;
  estimated_completion?: {
    days?: number;
    hours?: number;
    minutes?: number;
  };
};

export type Bounty = {
  id?: string;
  title: string;
  description: string;
  projectTitle?: string;
  type?: string;
  dominant_core?: string;
  mode?: "digital" | "physical";
  location?: string;
  reward?: Reward;
  rewards?: Reward[]; // optional array form used in UI
  timeline?: Timeline;
  hasImpactCertificate?: boolean;
  impactBriefMessage?: string;
  sdgs?: string[];
  has_backer?: boolean;
  backer?: Backer;
  terms_accepted?: boolean;
  currency?: string;
  contactEmail?: string;
};

export interface Reward {
  currency: string;
  amount: number | null;
  winners: number | null;
}

export interface EstimatedCompletion {
  days: number | null;
  hours: number | null;
  minutes: number | null;
}

export interface Timeline {
  expiration_date: string; // ISO string
  estimated_completion: EstimatedCompletion;
}

export interface BackerInfo {
  name: string;
  logo: string;
  message?: string;
}

export interface BountyFormState {
  title: string;
  projectTitle: string;
  description: string;
  type: BountyType | "";
  dominant_core: DominantCore | "";
  mode: BountyMode;
  location: string;

  reward: Reward;
  timeline: Timeline;

  hasImpactCertificate: boolean;
  impactBriefMessage: string;

  sdgs: string[]; // multi-select

  has_backer: boolean;
  backer: BackerInfo;

  terms_accepted: boolean;
}

export interface BountyContextType {
  data: BountyFormState;
  update: (patch: Partial<BountyFormState>) => void;
  reset: () => void;
}
