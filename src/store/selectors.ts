import { RootState } from "./store";

export const isStep1Complete = (state: RootState) => {
  const b = state.bounty.basics;
  return (
    b.title.trim().length > 0 &&
    b.description.trim().length > 0 &&
    b.type &&
    b.dominant_core &&
    (b.mode === "digital" || (b.mode === "physical" && b.location.trim().length > 0))
  );
};

export const isStep2Complete = (state: RootState) => {
  const r = state.bounty.rewards;
  return (
    r.amount > 0 &&
    r.winners >= 1 &&
    r.eachWinnerAmount > 0 &&
    r.expiration_date &&
    r.estimated_completion.days !== "" &&
    r.estimated_completion.hours !== "" &&
    r.estimated_completion.minutes !== ""
  );
};

export const isStep3Complete = (state: RootState) => {
  const b = state.bounty.backer;
  const terms = state.bounty.terms_accepted;

  if (!terms) return false;

  if (b.has_backer) {
    return b.name.trim() !== "" && b.logo.trim() !== "";
  }

  return true;
};
