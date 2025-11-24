import { useLocation, useNavigate } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Button from "../components/ui/Button";
import React from 'react'

type Props = {
  message?: string
}

export default function ResultPage({ message = 'Submitted' }: Props) {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState };
  const payload = state?.payload;

  return (
    <PageShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Bounty Created</h2>
          <p className="text-sm text-slate-500">
            Here is the final payload that would be sent to the backend.
          </p>
        </div>

        <div className="rounded-lg border bg-slate-900 p-4 text-xs text-green-200 overflow-auto">
          <pre>{JSON.stringify(payload, null, 2)}</pre>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => navigate("/step-1")}>
            Create Another
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
