// src/pages/Step2Rewards.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Toggle from "../components/ui/Toggle";
import { useBounty } from "../context/BountyContext";

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

export default function Step2Rewards() {
  const { data, update } = useBounty();
  const navigate = useNavigate();

  const [currency, setCurrency] = useState<string>(data?.reward?.currency ?? "INR");
  const [amount, setAmount] = useState<number>(data?.reward?.amount ?? 0);
  const [winners, setWinners] = useState<number>(data?.reward?.winners ?? 1);
  const [eachWinnerAmount, setEachWinnerAmount] = useState<number>(
    data?.reward?.eachWinnerAmount ?? Math.floor((amount || 0) / winners)
  );
  const [failureThreshold, setFailureThreshold] = useState<number | "">(
    data?.failureThreshold ?? ""
  );
  const [impactCertificate, setImpactCertificate] = useState<boolean>(
    !!data?.hasImpactCertificate
  );
  const [impactBrief, setImpactBrief] = useState<string>(data?.impactBriefMessage ?? "");
  const [selectedSdgs, setSelectedSdgs] = useState<string[]>(data?.sdgs ?? []);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPublishing, setIsPublishing] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!amount || Number(amount) <= 0) e.amount = "Amount must be greater than 0";
    if (!winners || winners < 1) e.winners = "Minimum 1 winner required";
    if (!eachWinnerAmount || Number(eachWinnerAmount) <= 0)
      e.eachWinnerAmount = "Each winner amount must be > 0";
    if (impactCertificate && !impactBrief)
      e.impactBrief = "Impact brief is required when certificate is ON";
    if (selectedSdgs.length > 4) e.sdgs = "Choose up to 4 SDGs only";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: 700,
    color: "#444",
    marginBottom: "6px",
  };

  const placeholderBold = { fontWeight: 600 };

  const toggleSdg = (s: string) => {
    setSelectedSdgs((prev) => {
      if (prev.includes(s)) return prev.filter((x) => x !== s);
      if (prev.length >= 4) return prev;
      return [...prev, s];
    });
  };

  const handlePublish = () => {
    if (!validate()) return;

    update({
      reward: { currency, amount, winners, eachWinnerAmount },
      failureThreshold,
      hasImpactCertificate: impactCertificate,
      impactBriefMessage: impactBrief,
      sdgs: selectedSdgs,
    } as any);

    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      navigate("/confirmation");
    }, 1000);
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
              <h2
                style={{
                  fontSize: "26px",
                  fontWeight: 700,
                  marginBottom: 20,
                }}
              >
                Bounty Reward
              </h2>

              {/* BUDGET */}
              <label style={labelStyle}>
                What is your budget for this bounty?*
                <i className="bi bi-exclamation-circle ms-2 text-secondary"></i>
              </label>

              <div className="d-flex gap-2 mb-4">
                <Select
                  value={currency}
                  options={CURRENCIES}
                  onChange={(e) => setCurrency(e.target.value)}
                />
                <Input
                  type="number"
                  value={amount}
                  onChange={(e: any) => setAmount(Number(e.target.value))}
                  placeholder="Enter amount"
                  style={placeholderBold}
                />
              </div>

              {errors.amount && <div className="text-danger small mb-2">{errors.amount}</div>}

              {/* WINNERS */}
              <label style={labelStyle}>
                How many winners?*
                <i className="bi bi-exclamation-circle ms-2 text-secondary"></i>
              </label>

              <Input
                type="number"
                value={winners}
                onChange={(e: any) => setWinners(Number(e.target.value))}
                placeholder="Enter number of winners"
                style={placeholderBold}
              />

              {errors.winners && <div className="text-danger small mb-2">{errors.winners}</div>}

              {/* PER WINNER */}
              <label style={labelStyle}>
                Each winner will be awarded:*
                <i className="bi bi-exclamation-circle ms-2 text-secondary"></i>
              </label>

              <Input
                type="number"
                value={eachWinnerAmount}
                onChange={(e: any) => setEachWinnerAmount(Number(e.target.value))}
                placeholder="Enter award amount"
                style={placeholderBold}
              />

              {errors.eachWinnerAmount && (
                <div className="text-danger small mb-2">{errors.eachWinnerAmount}</div>
              )}

              <div className="mt-4 mb-4">
                <span style={{ fontSize: 18 }}>
                  Maximum Impact Points allocated:{" "}
                  <strong>{Math.round(amount / 10 + winners * 10)}</strong>
                </span>
              </div>

              {/* FAILURE THRESHOLD */}
              <label style={labelStyle}>
                Set Failure Threshold %*
                <i className="bi bi-exclamation-circle ms-2 text-secondary"></i>
              </label>

              <Input
                type="number"
                value={failureThreshold}
                onChange={(e: any) => setFailureThreshold(e.target.value || "")}
                placeholder="Enter pass %"
                style={placeholderBold}
              />

              {/* IMPACT CERTIFICATE */}
              <div className="mt-4 mb-3 d-flex align-items-center gap-3">
                <Toggle
                  checked={impactCertificate}
                  onChange={setImpactCertificate}
                  label="Impact Certificate"
                />
                <i className="bi bi-exclamation-circle text-secondary"></i>
              </div>

              {impactCertificate && (
                <div className="mb-3">
                  <label style={labelStyle}>
                    Impact Certificate Brief*
                    <i className="bi bi-exclamation-circle ms-2 text-secondary"></i>
                  </label>
                  <Input
                    value={impactBrief}
                    onChange={(e) => setImpactBrief(e.target.value)}
                    placeholder="Creating digital assets for guild members"
                    style={placeholderBold}
                  />
                  {errors.impactBrief && (
                    <div className="text-danger small mt-1">{errors.impactBrief}</div>
                  )}
                </div>
              )}

              {/* SDGs */}
              <label style={labelStyle}>
                SDGs*
                <i className="bi bi-exclamation-circle ms-2 text-secondary"></i>
              </label>

              <Select
                value=""
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val) return;
                  if (!selectedSdgs.includes(val) && selectedSdgs.length < 4) {
                    setSelectedSdgs([...selectedSdgs, val]);
                  }
                }}
                options={[
                  { value: "", label: "Choose up to 4 secondary SDGs (optional)" },
                  ...SDG_LIST.map((s) => ({ value: s, label: s })),
                ]}
                style={{ fontWeight: 600 }}
              />

              <div className="d-flex flex-wrap gap-2 mt-3">
                {selectedSdgs.map((s) => (
                  <span
                    key={s}
                    className="badge bg-light text-dark border"
                    style={{
                      padding: "8px 12px",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    {s}
                    <button
                      type="button"
                      className="btn-close ms-2"
                      style={{ fontSize: "10px" }}
                      onClick={() => setSelectedSdgs(selectedSdgs.filter((x) => x !== s))}
                    ></button>
                  </span>
                ))}
              </div>

              {errors.sdgs && <div className="text-danger small mt-1">{errors.sdgs}</div>}

              {/* BUTTONS */}
              <div className="d-flex justify-content-between mt-5">
                <Button variant="ghost" onClick={() => navigate(-1)}>
                  Back
                </Button>
                <Button variant="primary" onClick={handlePublish}>
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
