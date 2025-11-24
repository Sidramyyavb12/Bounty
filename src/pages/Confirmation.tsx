// src/pages/Confirmation.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Button from "../components/ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Confirmation() {
  const bounty = useSelector((state: RootState) => state.bounty);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!bounty.terms_accepted) {
      alert("Please accept the Terms & Conditions before submitting.");
      return;
    }

    setLoading(true);

    const payload = {
      ...bounty.basics,
      reward: bounty.rewards,
      timeline: {
        expiration_date: bounty.rewards.expiration_date,
        estimated_completion: bounty.rewards.estimated_completion,
      },
      hasImpactCertificate: bounty.rewards.hasImpactCertificate,
      impactBriefMessage: bounty.rewards.impactBriefMessage,
      has_backer: bounty.backer.has_backer,
      backer: bounty.backer.has_backer ? bounty.backer : undefined,
      terms_accepted: bounty.terms_accepted,
    };

    console.log("Final Payload:", payload);

    setTimeout(() => {
      setLoading(false);
      navigate("/result", { state: { payload } });
    }, 800);
  };

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold">Confirm Bounty</h2>
        <p className="text-sm text-slate-500">
          Review all information before submitting.
        </p>

        <div
          className="rounded-lg border bg-white p-4 text-sm space-y-5 m-5"
          style={{ borderRadius: "20px" }}
        >
          {/* BASICS */}
          <div>
            <h3 className="font-semibold text-slate-800">Basics</h3>
            <p>
              <strong>Title:</strong> {bounty.basics.title}
            </p>
            <p>
              <strong>Project:</strong> {bounty.basics.projectTitle || "-"}
            </p>
            <p className="text-slate-700">
              {bounty.basics.description.slice(0, 160)}
              {bounty.basics.description.length > 160 && "..."}
            </p>
            <p>
              <strong>Type:</strong> {bounty.basics.type} ·{" "}
              <strong>Core:</strong> {bounty.basics.dominant_core}
            </p>
            <p>
              <strong>Mode:</strong> {bounty.basics.mode}
              {bounty.basics.mode === "physical" &&
                ` · ${bounty.basics.location}`}
            </p>
          </div>

          {/* REWARD */}
          <div>
            <h3 className="font-semibold text-slate-800">Rewards & Timeline</h3>
            <p>
              <strong>Reward:</strong> {bounty.rewards.amount}{" "}
              {bounty.rewards.currency} ·{bounty.rewards.winners} winner(s)
            </p>
            <p>
              <strong>Expires:</strong> {bounty.rewards.expiration_date}
            </p>
            <p>
              <strong>ETA:</strong> {bounty.rewards.estimated_completion.days}d{" "}
              {bounty.rewards.estimated_completion.hours}h{" "}
              {bounty.rewards.estimated_completion.minutes}m
            </p>
            <p>
              <strong>Impact Certificate:</strong>
              {bounty.rewards.hasImpactCertificate ? " Yes" : " No"}
            </p>
            {bounty.rewards.sdgs.length > 0 && (
              <p>
                <strong>SDGs:</strong> {bounty.rewards.sdgs.join(", ")}
              </p>
            )}
          </div>

          {/* BACKER */}
          <div>
            <h3 className="font-semibold text-slate-800">Backer</h3>
            {bounty.backer.has_backer ? (
              <>
                <p>
                  <strong>Name:</strong> {bounty.backer.name}
                </p>
                <p>
                  <strong>Logo:</strong> {bounty.backer.logo}
                </p>
                {bounty.backer.message && (
                  <p>{bounty.backer.message.slice(0, 120)}</p>
                )}
              </>
            ) : (
              <p className="text-slate-600">No backer added.</p>
            )}
          </div>

          <p className="text-xs text-slate-500">
            Terms Accepted: {bounty.terms_accepted ? "Yes" : "No"}
          </p>
        </div>

        <div className="d-flex justify-content-between gap-3">
          <Button
            variant="secondary"
            onClick={() => navigate("/step-3")}
            disabled={loading}
          >
            Back
          </Button>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Create Bounty"}
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
