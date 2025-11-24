import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Button from "../components/ui/Button";
import { useBounty } from "../context/BountyContext";

export default function Confirmation() {
  const { data } = useBounty();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!data.terms_accepted) {
      alert("Please accept the Terms & Conditions before submitting.");
      return;
    }

    setLoading(true);

    // build final payload format
    const payload = {
      title: data.title,
      description: data.description,
      projectTitle: data.projectTitle,
      type: data.type || "Other",
      dominant_core: data.dominant_core || "Social",
      mode: data.mode,
      location: data.mode === "physical" ? data.location : undefined,
      reward: {
        currency: data.reward.currency,
        amount: data.reward.amount ?? 0,
        winners: data.reward.winners ?? 1,
      },
      timeline: {
        expiration_date: new Date(data.timeline.expiration_date).toISOString(),
        estimated_completion: {
          days: data.timeline.estimated_completion.days ?? 0,
          hours: data.timeline.estimated_completion.hours ?? 0,
          minutes: data.timeline.estimated_completion.minutes ?? 0,
        },
      },
      hasImpactCertificate: data.hasImpactCertificate,
      impactBriefMessage: data.hasImpactCertificate
        ? data.impactBriefMessage
        : undefined,
      has_backer: data.has_backer,
      backer: data.has_backer ? data.backer : undefined,
      terms_accepted: data.terms_accepted,
      sdgs: data.sdgs,
    };

    console.log("Final payload:", payload);

    setTimeout(() => {
      setLoading(false);
      // pass payload via navigation state
      navigate("/result", { state: { payload } });
    }, 1200);
  };

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Confirm Bounty</h2>
          <p className="text-sm text-slate-500">
            Review the details before creating your bounty.
          </p>
        </div>

        {/* Simple summary – you can style this more like the Figma */}
        <div className="space-y-4 rounded-lg border bg-white p-4 text-sm">
          <div>
            <h3 className="font-semibold text-slate-800">Basics</h3>
            <p className="mt-1 text-slate-700">
              <span className="font-medium">Title:</span> {data.title || "-"}
            </p>
            <p className="text-slate-700">
              <span className="font-medium">Project:</span> {data.projectTitle || "-"}
            </p>
            <p className="mt-1 text-slate-600">
              {data.description.slice(0, 160) || "-"}
              {data.description.length > 160 && "..."}
            </p>
            <p className="mt-1 text-slate-700">
              <span className="font-medium">Type:</span> {data.type || "-"} ·{" "}
              <span className="font-medium">Core:</span> {data.dominant_core || "-"}
            </p>
            <p className="text-slate-700">
              <span className="font-medium">Mode:</span> {data.mode}
              {data.mode === "physical" && data.location
                ? ` · ${data.location}`
                : ""}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">Reward & Timeline</h3>
            <p className="mt-1 text-slate-700">
              {data.reward.amount ?? "-"} {data.reward.currency} ·{" "}
              {data.reward.winners ?? "-"} winner(s)
            </p>
            <p className="text-slate-700">
              <span className="font-medium">Expires:</span>{" "}
              {data.timeline.expiration_date || "-"}
            </p>
            <p className="text-slate-700">
              <span className="font-medium">ETA:</span>{" "}
              {data.timeline.estimated_completion.days ?? 0}d{" "}
              {data.timeline.estimated_completion.hours ?? 0}h{" "}
              {data.timeline.estimated_completion.minutes ?? 0}m
            </p>
            <p className="mt-1 text-slate-700">
              <span className="font-medium">Impact Certificate:</span>{" "}
              {data.hasImpactCertificate ? "Yes" : "No"}
            </p>
            {data.sdgs.length > 0 && (
              <p className="text-slate-700">
                <span className="font-medium">SDGs:</span>{" "}
                {data.sdgs.join(", ")}
              </p>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">Backer</h3>
            {data.has_backer ? (
              <>
                <p className="mt-1 text-slate-700">
                  <span className="font-medium">Name:</span> {data.backer.name}
                </p>
                <p className="text-slate-700">
                  <span className="font-medium">Logo:</span> {data.backer.logo}
                </p>
                {data.backer.message && (
                  <p className="mt-1 text-slate-600">
                    {data.backer.message.slice(0, 120)}
                  </p>
                )}
              </>
            ) : (
              <p className="mt-1 text-slate-600">No backer added.</p>
            )}
          </div>

          <p className="text-xs text-slate-500">
            Terms accepted: {data.terms_accepted ? "Yes" : "No"}
          </p>
        </div>

        <div className="flex justify-between gap-3 pt-4">
          <Button variant="secondary" onClick={() => navigate("/step-3")} disabled={loading}>
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Bounty"}
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
