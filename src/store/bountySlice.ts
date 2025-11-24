import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BasicsState {
  title: string;
  description: string;
  projectTitle: string;
  type: string;
  dominant_core: string;
  mode: "digital" | "physical";
  location: string;
  locationLat: number | null;
  locationLng: number | null;
}

export interface RewardsState {
  currency: string;
  amount: number;
  winners: number;
  eachWinnerAmount: number;
  expiration_date: string;
  estimated_completion: {
    days: string;
    hours: string;
    minutes: string;
  };
  hasImpactCertificate: boolean;
  impactBriefMessage: string;
  sdgs: string[];
  failureThreshold: string | number;
}

export interface BackerState {
  has_backer: boolean;
  name: string;
  logo: string;
  message: string;
}

export interface BountyState {
  basics: BasicsState;
  rewards: RewardsState;
  backer: BackerState;
  terms_accepted: boolean;
}

const initialState: BountyState = {
  basics: {
    title: "",
    description: "",
    projectTitle: "",
    type: "",
    dominant_core: "",
    mode: "digital",
    location: "",
    locationLat: null,
    locationLng: null,
  },

  rewards: {
    currency: "INR",
    amount: 0,
    winners: 1,
    eachWinnerAmount: 0,
    expiration_date: "",
    estimated_completion: {
      days: "",
      hours: "",
      minutes: "",
    },
    hasImpactCertificate: false,
    impactBriefMessage: "",
    sdgs: [],
    failureThreshold: "",
  },

  backer: {
    has_backer: false,
    name: "",
    logo: "",
    message: "",
  },

  terms_accepted: false,
};

const bountySlice = createSlice({
  name: "bounty",
  initialState,
  reducers: {
    updateBasics(state, action: PayloadAction<Partial<BasicsState>>) {
      state.basics = { ...state.basics, ...action.payload };
    },

    updateRewards(state, action: PayloadAction<Partial<RewardsState>>) {
      state.rewards = { ...state.rewards, ...action.payload };
    },

    updateBacker(state, action: PayloadAction<Partial<BackerState>>) {
      state.backer = { ...state.backer, ...action.payload };
    },

    setTermsAccepted(state, action: PayloadAction<boolean>) {
      state.terms_accepted = action.payload;
    },

    resetBounty() {
      return initialState;
    },
  },
});

export const {
  updateBasics,
  updateRewards,
  updateBacker,
  setTermsAccepted,
  resetBounty,
} = bountySlice.actions;

export default bountySlice.reducer;
