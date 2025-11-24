// src/pages/Step2Rewards.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PageShell from "../components/layout/PageShell";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Toggle from "../components/ui/Toggle";
import Button from "../components/ui/Button";
import { RootState, AppDispatch } from "../store/store";
import { updateRewards } from "../store/bountySlice";

const CURRENCIES = [
  { value: "USD", label: "$ USD" },
  { value: "INR", label: "₹ INR" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
];

const SDG_LIST = [
  "No Poverty",
  "Zero Hunger",
  "Good Health",
  "Quality Education",
  "Gender Equality",
  "Clean Water",
  "Affordable Energy",
  "Decent Work",
  "Industry Innovation",
  "Reduced Inequalities",
  "Sustainable Cities",
  "Responsible Consumption",
  "Climate Action",
  "Life Below Water",
  "Life on Land",
  "Peace & Justice",
  "Partnerships",
];

export default function Step2Rewards(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // pull rewards slice from redux
  const rewards = useSelector((s: RootState) => s.bounty.rewards);
  const basics = useSelector((s: RootState) => s.bounty.basics);

  // Local state for controlled inputs (initialized from redux)
  const [currency, setCurrency] = useState<string>(rewards.currency ?? "INR");
  const [amount, setAmount] = useState<number>(rewards.amount ?? 0);
  const [winners, setWinners] = useState<number>(rewards.winners ?? 1);
  const [eachWinnerAmount, setEachWinnerAmount] = useState<number>(
    rewards.eachWinnerAmount ?? Math.floor((rewards.amount ?? 0) / Math.max(1, rewards.winners ?? 1))
  );
  const [expirationDate, setExpirationDate] = useState<string>(rewards.expiration_date ?? "");
  const [days, setDays] = useState<string>(rewards.estimated_completion.days ?? "");
  const [hours, setHours] = useState<string>(rewards.estimated_completion.hours ?? "");
  const [minutes, setMinutes] = useState<string>(rewards.estimated_completion.minutes ?? "");
  const [impactCertificate, setImpactCertificate] = useState<boolean>(rewards.hasImpactCertificate ?? false);
  const [impactBrief, setImpactBrief] = useState<string>(rewards.impactBriefMessage ?? "");
  const [selectedSdgs, setSelectedSdgs] = useState<string[]>(rewards.sdgs ?? []);
  const [failureThreshold, setFailureThreshold] = useState<string | number>(rewards.failureThreshold ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPublishing, setIsPublishing] = useState(false);

  // Sync redux -> local if redux changes externally
  useEffect(() => {
    setCurrency(rewards.currency ?? "INR");
    setAmount(rewards.amount ?? 0);
    setWinners(rewards.winners ?? 1);
    setEachWinnerAmount(rewards.eachWinnerAmount ?? Math.floor((rewards.amount ?? 0) / Math.max(1, rewards.winners ?? 1)));
    setExpirationDate(rewards.expiration_date ?? "");
    setDays(rewards.estimated_completion.days ?? "");
    setHours(rewards.estimated_completion.hours ?? "");
    setMinutes(rewards.estimated_completion.minutes ?? "");
    setImpactCertificate(!!rewards.hasImpactCertificate);
    setImpactBrief(rewards.impactBriefMessage ?? "");
    setSelectedSdgs(rewards.sdgs ?? []);
    setFailureThreshold(rewards.failureThreshold ?? "");
  }, [rewards]);

  // persist to redux whenever local changes (debounce could be added)
  useEffect(() => {
    dispatch(
      updateRewards({
        currency,
        amount,
        winners,
        eachWinnerAmount,
        expiration_date: expirationDate,
        estimated_completion: { days, hours, minutes },
        hasImpactCertificate: impactCertificate,
        impactBriefMessage: impactBrief,
        sdgs: selectedSdgs,
        failureThreshold,
      })
    );
  }, [currency, amount, winners, eachWinnerAmount, expirationDate, days, hours, minutes, impactCertificate, impactBrief, selectedSdgs, failureThreshold, dispatch]);

  // Validation
  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!currency) e.currency = "Currency is required";
    if (!amount || Number(amount) <= 0) e.amount = "Amount must be greater than 0";
    if (!winners || Number(winners) < 1) e.winners = "At least 1 winner is required";
    if (!eachWinnerAmount || Number(eachWinnerAmount) <= 0) e.eachWinnerAmount = "Each winner amount must be > 0";
    if (!expirationDate) e.expiration_date = "Expiration date is required";
    if (impactCertificate && !impactBrief) e.impactBrief = "Impact brief is required when certificate is enabled";
    if (selectedSdgs.length > 4) e.sdgs = "Choose up to 4 SDGs";
    // optional: check numeric ranges for days/hours/minutes
    const d = Number(days || 0), h = Number(hours || 0), m = Number(minutes || 0);
    if (Number.isNaN(d) || d < 0) e.days = "Days must be >= 0";
    if (Number.isNaN(h) || h < 0) e.hours = "Hours must be >= 0";
    if (Number.isNaN(m) || m < 0) e.minutes = "Minutes must be >= 0";
    return e;
  };

  useEffect(() => {
    setErrors(validate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, amount, winners, eachWinnerAmount, expirationDate, days, hours, minutes, impactCertificate, impactBrief, selectedSdgs]);

  const toggleSdg = (s: string) => {
    setSelectedSdgs((prev) => {
      if (prev.includes(s)) return prev.filter((x) => x !== s);
      if (prev.length >= 4) return prev;
      return [...prev, s];
    });
  };

  const maxImpactPoints = useMemo(() => {
    const amt = Number(amount || 0);
    return Math.round(amt / 10) + Number(winners || 0) * 10;
  }, [amount, winners]);

  // Build final payload (merge basics + rewards + backer + terms stored in redux)
  const buildPayload = () => {
    const state = (window as any).__CURRENT_REDUX_STATE__ || {}; // fallback; we will construct from basics & local
    const payload = {
      title: basics.title || "",
      description: basics.description || "",
      projectTitle: basics.projectTitle || "",
      type: basics.type || "",
      dominant_core: basics.dominant_core || "",
      mode: basics.mode || "digital",
      location: basics.location || "",
      reward: {
        currency,
        amount: Number(amount),
        winners: Number(winners),
      },
      timeline: {
        expiration_date: expirationDate || null,
        estimated_completion: {
          days: Number(days || 0),
          hours: Number(hours || 0),
          minutes: Number(minutes || 0),
        },
      },
      hasImpactCertificate: impactCertificate,
      impactBriefMessage: impactCertificate ? impactBrief : undefined,
      sdgs: selectedSdgs,
      failureThreshold: failureThreshold,
      // backer + terms will rely on redux state (not duplicated here)
    };
    return payload;
  };

  const handlePublish = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      // scroll to first error or show toast
      const first = Object.keys(e)[0];
      const el = document.querySelector("input, select, textarea");
      if (el) (el as HTMLElement).focus();
      return;
    }

    // persist (already persisted via effect) then simulate server
    setIsPublishing(true);
    const payload = buildPayload();
    setTimeout(() => {
      setIsPublishing(false);
      // log final payload
      console.log("Final payload (simulated):", payload);
      // navigate to confirmation page with payload in state
      navigate("/confirm", { state: { payload } });
    }, 1200);
  };

  // small helpers for input change parse
  const onNumberChange = (setter: (v: any) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    const n = v === "" ? "" : Number(v);
    setter(n);
  };

  return (
    <PageShell>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <div
              className="p-4 p-md-5 mb-4"
              style={{
                background: "#FFFFFF",
                borderRadius: 16,
                border: "1px solid #E5E5E5",
                boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
              }}
            >
              <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>Bounty Reward</h2>
              <p className="text-muted small mb-3">Choose bounty reward token and set the amount</p>

              {/* Budget row */}
              <div className="mb-3">
                <label style={{ fontSize: 20, fontWeight: 700, color: "#444", marginBottom: 6 }}>
                  What is your budget for this bounty?*
                </label>
                <div className="d-flex gap-2">
                  <Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    options={CURRENCIES}
                  />
                  <Input
                    type="text"
                    value={amount}
                    onChange={(e: any) => setAmount(Number(e.target.value || 0))}
                    placeholder="0"
                  />
                </div>
                {errors.amount && <div className="text-danger small mt-2">{errors.amount}</div>}
              </div>

              {/* Winners */}
              <div className="mb-3">
                <label style={{ fontSize: 20, fontWeight: 700, color: "#444", marginBottom: 6 }}>
                  How many winners?*
                </label>
                <Input
                  type="text"
                  value={winners}
                  onChange={(e: any) => setWinners(Number(e.target.value || 1))}
                  placeholder="Number of winners"
                />
                {errors.winners && <div className="text-danger small mt-2">{errors.winners}</div>}
              </div>

              {/* Each winner */}
              <div className="mb-3">
                <label style={{ fontSize: 20, fontWeight: 700, color: "#444", marginBottom: 6 }}>
                  Each winner will be awarded:*
                </label>
                <Input
                  type="text"
                  value={eachWinnerAmount}
                  onChange={(e: any) => setEachWinnerAmount(Number(e.target.value || 0))}
                  placeholder="Amount per winner"
                />
                {errors.eachWinnerAmount && <div className="text-danger small mt-2">{errors.eachWinnerAmount}</div>}
              </div>

              {/* Impact points */}
              <div className="mb-3">
                <div style={{ fontSize: 16 }}>Maximum Impact Points allocated: <strong>{maxImpactPoints}</strong></div>
              </div>

              {/* Failure threshold */}
              <div className="mb-3">
                <label style={{ fontSize: 20, fontWeight: 700, color: "#444", marginBottom: 6 }}>
                  Set Failure Threshold %*
                </label>
                <Input
                  type="text"
                  value={failureThreshold as any}
                  onChange={(e: any) => setFailureThreshold(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="Enter pass %"
                />
              </div>

              {/* Timeline */}
              <div className="mb-3">
                <label style={{ fontSize: 20, fontWeight: 700, color: "#444", marginBottom: 6 }}>
                  Expiration Date (submissions close)*
                </label>
                <Input
                  type="date"
                  value={expirationDate}
                  onChange={(e: any) => setExpirationDate(e.target.value)}
                />
                {errors.expiration_date && <div className="text-danger small mt-2">{errors.expiration_date}</div>}
              </div>

              <div className="mb-3">
                <label style={{ fontSize: 20, fontWeight: 700, color: "#444", marginBottom: 6 }}>
                  Estimated Completion Time
                </label>
                <div className="d-flex gap-2">
                  <Input type="number" value={days} onChange={(e: any) => setDays(e.target.value)} placeholder="Days" />
                  <Input type="number" value={hours} onChange={(e: any) => setHours(e.target.value)} placeholder="Hours" />
                  <Input type="number" value={minutes} onChange={(e: any) => setMinutes(e.target.value)} placeholder="Minutes" />
                </div>
                { (errors.days || errors.hours || errors.minutes) && (
                  <div className="text-danger small mt-2">{errors.days || errors.hours || errors.minutes}</div>
                )}
              </div>

              {/* Impact certificate */}
              <div className="mb-3 d-flex align-items-center gap-3">
                <Toggle checked={impactCertificate} onChange={setImpactCertificate} label="Has Impact Certificate?" />
                <div className="text-muted small">Issue impact certificates to winners</div>
              </div>

              {impactCertificate && (
                <div className="mb-3">
                  <label style={{ fontSize: 20, fontWeight: 700, color: "#444", marginBottom: 6 }}>
                    Impact Brief*
                  </label>
                  <Input
                    value={impactBrief}
                    onChange={(e: any) => setImpactBrief(e.target.value)}
                    placeholder="Brief message for impact certificate"
                  />
                  {errors.impactBrief && <div className="text-danger small mt-2">{errors.impactBrief}</div>}
                </div>
              )}

              {/* SDGs */}
              <div className="mb-3">
                <label style={{ fontSize: 20, fontWeight: 700, color: "#444", marginBottom: 6 }}>
                  SDGs (up to 4)
                </label>

                <div className="d-flex gap-2 mb-2">
                  <Select
                    value=""
                    onChange={(e) => {
                      const v = e.target.value;
                      if (!v) return;
                      if (!selectedSdgs.includes(v) && selectedSdgs.length < 4) {
                        setSelectedSdgs([...selectedSdgs, v]);
                      }
                    }}
                    options={[{ value: "", label: "Choose up to 4 SDGs" }, ...SDG_LIST.map((s) => ({ value: s, label: s }))]}
                  />
                </div>

                <div className="d-flex flex-wrap gap-2">
                  {selectedSdgs.map((s) => (
                    <div key={s} className="d-inline-flex align-items-center border rounded-pill px-3 py-1" style={{ background: "#fff" }}>
                      <span style={{ fontWeight: 600 }}>{s}</span>
                      <button
                        type="button"
                        className="btn btn-sm ms-2"
                        onClick={() => setSelectedSdgs(selectedSdgs.filter((x) => x !== s))}
                        style={{ lineHeight: 1 }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {errors.sdgs && <div className="text-danger small mt-2">{errors.sdgs}</div>}
              </div>

              {/* Actions */}
              <div className="d-flex justify-content-between mt-4">
                <Button variant="ghost" onClick={() => navigate("/step-2")}>Back</Button>
                <Button variant="primary" onClick={handlePublish} disabled={isPublishing || Object.keys(errors).length > 0}>
                  {isPublishing ? "Publishing..." : "Publish Bounty"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
