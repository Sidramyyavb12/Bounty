// src/pages/ResultPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Button from "../components/ui/Button";
import React from "react";

export default function ResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const payload = state?.payload;

  return (
    <PageShell>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Bounty Created Successfully</h2>
        <p className="text-sm text-slate-500">
          This is the final JSON payload that would be sent to the backend.
        </p>

        <div className="rounded-lg border bg-slate-900 p-4 text-xs text-green-200 overflow-auto">
          <pre>{JSON.stringify(payload, null, 2)}</pre>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => navigate("/step-1")}>
            Create Another
          </Button>

          <Button onClick={() => navigate("/published")}>Finish</Button>
        </div>
      </div>
    </PageShell>
  );
}
